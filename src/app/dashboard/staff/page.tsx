"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getStaff, createStaff, deleteStaff,
    getStaffAvailability, setStaffAvailability,
    getStaffDayOffs, addStaffDayOff, deleteStaffDayOff,
    type Staff, type StaffDayOff,
} from "@/lib/apiClient";
import { Users, Plus, X, Trash2, Save, Clock, Calendar, Settings, Mail, MessageSquare } from "lucide-react";
import * as jstCal from "@/lib/jstCalendar";

interface AvailSlot { startTime: string; endTime: string }

export default function StaffPage() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // Add staff form
    const [showForm, setShowForm] = useState(false);
    const [formName, setFormName] = useState("");
    const [formRole, setFormRole] = useState("");
    const [formEmail, setFormEmail] = useState("");
    const [formLineId, setFormLineId] = useState("");

    // Selected staff for shift editing
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [availSlots, setAvailSlots] = useState<Record<number, AvailSlot[]>>({});
    const [dayOffs, setDayOffs] = useState<StaffDayOff[]>([]);
    const [availSaving, setAvailSaving] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getStaff();
            setStaffList(Array.isArray(data) ? data : []);
        } catch { /* ignore */ }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    async function handleAdd() {
        if (!formName.trim()) return;
        setSaving(true);
        try {
            await createStaff({ name: formName.trim(), role: formRole.trim() || undefined, email: formEmail.trim() || undefined, lineUserId: formLineId.trim() || undefined });
            setShowForm(false); setFormName(""); setFormRole(""); setFormEmail(""); setFormLineId("");
            load();
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "追加に失敗"); }
        finally { setSaving(false); }
    }

    async function handleDelete(id: string) {
        if (!confirm("このスタッフを削除しますか？")) return;
        try { await deleteStaff(id); if (selectedStaff?.id === id) setSelectedStaff(null); load(); }
        catch (e: unknown) { setError(e instanceof Error ? e.message : "削除に失敗"); }
    }

    // Load staff availability + day offs
    async function selectStaff(staff: Staff) {
        setSelectedStaff(staff);
        try {
            const [avail, offs] = await Promise.all([
                getStaffAvailability(staff.id).catch(() => []),
                getStaffDayOffs(staff.id).catch(() => []),
            ]);
            const slots: Record<number, AvailSlot[]> = {};
            for (let d = 0; d < 7; d++) slots[d] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (const a of (Array.isArray(avail) ? avail : [])) { const item = a as any; const dow = item.dayOfWeek ?? item.day_of_week; if (dow !== undefined && slots[dow]) { slots[dow].push({ startTime: item.startTime || item.start_time || "09:00", endTime: item.endTime || item.end_time || "18:00" }); } }
            setAvailSlots(slots);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setDayOffs((Array.isArray(offs) ? offs : []).map((o: any) => ({ id: o.id, staffId: o.staffId || o.staff_id, date: (o.date || "").split("T")[0], reason: o.reason })));
        } catch { /* ignore */ }
    }

    function addSlot(day: number) {
        setAvailSlots(prev => ({ ...prev, [day]: [...(prev[day] || []), { startTime: "09:00", endTime: "18:00" }] }));
    }
    function removeSlot(day: number, idx: number) {
        setAvailSlots(prev => ({ ...prev, [day]: (prev[day] || []).filter((_, i) => i !== idx) }));
    }
    function updateSlot(day: number, idx: number, field: string, val: string) {
        setAvailSlots(prev => ({ ...prev, [day]: (prev[day] || []).map((s, i) => i === idx ? { ...s, [field]: val } : s) }));
    }

    async function handleSaveAvail() {
        if (!selectedStaff) return;
        setAvailSaving(true);
        try {
            const slots: { dayOfWeek: number; startTime: string; endTime: string }[] = [];
            for (const [d, ss] of Object.entries(availSlots)) { for (const s of ss) { slots.push({ dayOfWeek: Number(d), startTime: s.startTime, endTime: s.endTime }); } }
            await setStaffAvailability(selectedStaff.id, slots);
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "保存に失敗"); }
        finally { setAvailSaving(false); }
    }

    async function handleAddDayOff(dateStr: string) {
        if (!selectedStaff) return;
        try {
            const off = await addStaffDayOff(selectedStaff.id, dateStr);
            setDayOffs(prev => [...prev, { ...off, date: (off.date || "").split("T")[0] }]);
        } catch { /* duplicate ignore */ }
    }

    async function handleDeleteDayOff(offId: string) {
        if (!selectedStaff) return;
        try { await deleteStaffDayOff(selectedStaff.id, offId); setDayOffs(prev => prev.filter(o => o.id !== offId)); }
        catch { /* ignore */ }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">スタッフ管理</h1>
                    <p className="text-[#999] mt-1 text-[14px]">スタッフの追加・シフト・休み設定</p>
                </div>
                <button onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors">
                    <Plus size={16} /> スタッフ追加
                </button>
            </div>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error} <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* Add Form */}
            {showForm && (
                <div className="mt-4 bg-white border border-[#06C755]/30 rounded-xl p-5 shadow-sm">
                    <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-3">新しいスタッフ</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={formName} onChange={e => setFormName(e.target.value)} placeholder="名前 *"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        <input type="text" value={formRole} onChange={e => setFormRole(e.target.value)} placeholder="役職（任意）"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        <input type="email" value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="メールアドレス（任意）"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        <input type="text" value={formLineId} onChange={e => setFormLineId(e.target.value)} placeholder="LINE User ID（通知用）"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleAdd} disabled={saving || !formName.trim()}
                            className="bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-[13px]">
                            {saving ? "追加中..." : "追加"}
                        </button>
                        <button onClick={() => setShowForm(false)} className="text-[#999] px-3">キャンセル</button>
                    </div>
                    <p className="text-[11px] text-[#999] mt-2">※ LINE User IDを設定すると予約時にLINE通知が届きます</p>
                </div>
            )}

            {/* Staff List + Shift Editor */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
                {/* Left: Staff List */}
                <div>
                    <h3 className="text-[13px] font-bold text-[#999] mb-3 uppercase tracking-wider">スタッフ一覧</h3>
                    {loading ? (
                        <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" /></div>
                    ) : staffList.length === 0 ? (
                        <div className="text-center py-10 bg-white border border-[#E8E8E8] rounded-xl">
                            <MessageSquare size={32} className="text-[#E0E0E0] mx-auto mb-2" />
                            <p className="text-[14px] text-[#999]">スタッフ未登録</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {staffList.map(s => (
                                <div key={s.id}
                                    onClick={() => selectStaff(s)}
                                    className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${
                                        selectedStaff?.id === s.id
                                            ? "border-[#06C755] bg-[#E8F5E9] shadow-sm"
                                            : "border-[#E8E8E8] bg-white hover:border-[#06C755]/50"
                                    }`}>
                                    <div className="w-10 h-10 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[14px] font-bold text-[#06C755] shrink-0">
                                        {s.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[14px] font-bold text-[#1A1A1A] truncate">{s.name}</p>
                                        {s.role && <p className="text-[12px] text-[#999]">{s.role}</p>}
                                        <div className="flex gap-2 mt-0.5">
                                            {s.email && <span className="text-[10px] text-[#2196F3] flex items-center gap-0.5"><Mail size={9} />メール</span>}
                                            {s.lineUserId && <span className="text-[10px] text-[#06C755] flex items-center gap-0.5"><MessageSquare size={9} />LINE</span>}
                                        </div>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(s.id); }}
                                        className="text-[#CCC] hover:text-[#E53935] p-1.5 shrink-0"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Shift Editor */}
                <div>
                    {!selectedStaff ? (
                        <div className="text-center py-20 bg-white border border-[#E8E8E8] rounded-xl">
                            <Settings size={40} className="text-[#E0E0E0] mx-auto mb-3" />
                            <p className="text-[15px] text-[#999]">左のスタッフを選択してシフトを編集</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
                            {/* Staff Header */}
                            <div className="bg-[#06C755] px-5 py-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[14px] font-bold text-white">
                                    {selectedStaff.name[0]}
                                </div>
                                <div>
                                    <p className="text-[16px] font-bold text-white">{selectedStaff.name}</p>
                                    {selectedStaff.role && <p className="text-[12px] text-white/80">{selectedStaff.role}</p>}
                                </div>
                            </div>

                            <div className="p-5">
                                {/* Weekly Shift Grid */}
                                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                                    <Clock size={14} className="text-[#06C755]" />
                                    基本シフト（毎週繰り返し）
                                </h3>
                                <div className="border border-[#E8E8E8] rounded-xl overflow-hidden mb-4">
                                    {[1, 2, 3, 4, 5, 6, 0].map(d => {
                                        const slots = availSlots[d] || [];
                                        const wd = jstCal.getThisWeekDate(d);
                                        const holiday = jstCal.getHoliday(wd.dateStr);
                                        const isRed = !!holiday || d === 0;
                                        return (
                                            <div key={d} className="grid grid-cols-[80px_1fr] border-b border-[#F0F0F0] last:border-b-0">
                                                <div className={`p-3 text-center border-r border-[#F0F0F0] ${wd.isToday ? "bg-[#E8F5E9]" : ""}`}>
                                                    <p className={`text-[15px] font-bold ${isRed ? "text-[#E53935]" : d === 6 ? "text-[#2196F3]" : "text-[#1A1A1A]"}`}>
                                                        {jstCal.DAY_LABELS[d]}
                                                    </p>
                                                    <p className={`text-[11px] ${wd.isToday ? "text-[#06C755] font-bold" : "text-[#999]"}`}>{wd.month}/{wd.date}</p>
                                                    {holiday && <p className="text-[8px] text-[#E53935] font-bold">{holiday.shortName}</p>}
                                                </div>
                                                <div className="p-2 flex items-center gap-2 flex-wrap min-h-[48px]">
                                                    {slots.length === 0 && <span className="text-[12px] text-[#CCC] italic">休み</span>}
                                                    {slots.map((slot, idx) => (
                                                        <div key={idx} className="flex items-center gap-1 bg-[#E8F5E9] border border-[#06C755]/20 rounded-lg px-2 py-1">
                                                            <input type="time" value={slot.startTime} onChange={e => updateSlot(d, idx, "startTime", e.target.value)}
                                                                className="bg-transparent text-[13px] font-bold w-[72px] focus:outline-none" />
                                                            <span className="text-[#06C755] text-[12px]">〜</span>
                                                            <input type="time" value={slot.endTime} onChange={e => updateSlot(d, idx, "endTime", e.target.value)}
                                                                className="bg-transparent text-[13px] font-bold w-[72px] focus:outline-none" />
                                                            <button onClick={() => removeSlot(d, idx)} className="text-[#CCC] hover:text-[#E53935]"><X size={12} /></button>
                                                        </div>
                                                    ))}
                                                    <button onClick={() => addSlot(d)}
                                                        className="flex items-center gap-1 text-[11px] text-[#06C755] border border-dashed border-[#06C755]/30 rounded-lg px-2 py-1.5 hover:bg-[#E8F5E9]">
                                                        <Plus size={10} /> 追加
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end mb-6">
                                    <button onClick={handleSaveAvail} disabled={availSaving}
                                        className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-[13px]">
                                        <Save size={14} /> {availSaving ? "保存中..." : "シフトを保存"}
                                    </button>
                                </div>

                                {/* Day Off Calendar */}
                                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2 border-t border-[#F0F0F0] pt-5">
                                    <Calendar size={14} className="text-[#E53935]" />
                                    休み設定（日付タップでON/OFF）
                                </h3>
                                {(() => {
                                    const now = jstCal.nowJST();
                                    const months: { year: number; month: number }[] = [];
                                    for (let i = 0; i < 2; i++) { const d = new Date(now); d.setMonth(d.getMonth() + i); months.push({ year: d.getFullYear(), month: d.getMonth() }); }
                                    const offSet = new Set(dayOffs.map(o => o.date));
                                    return (
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            {months.map(({ year, month }) => {
                                                const firstDay = new Date(year, month, 1).getDay();
                                                const daysInMonth = new Date(year, month + 1, 0).getDate();
                                                const cells: (number | null)[] = Array(firstDay).fill(null);
                                                for (let dd = 1; dd <= daysInMonth; dd++) cells.push(dd);
                                                return (
                                                    <div key={`${year}-${month}`} className="bg-[#F9FAFB] rounded-xl p-3">
                                                        <p className="text-[13px] font-bold text-center mb-2">{year}年{month + 1}月</p>
                                                        <div className="grid grid-cols-7 gap-1 text-center">
                                                            {jstCal.DAY_LABELS.map((dl, di) => (
                                                                <span key={dl} className={`text-[10px] font-bold ${di === 0 ? "text-[#E53935]" : di === 6 ? "text-[#2196F3]" : "text-[#999]"}`}>{dl}</span>
                                                            ))}
                                                            {cells.map((day, i) => {
                                                                if (!day) return <span key={i} />;
                                                                const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                                                const isOff = offSet.has(ds);
                                                                const hol = jstCal.getHoliday(ds);
                                                                const isPast = ds < jstCal.todayJST();
                                                                return (
                                                                    <button key={i} disabled={isPast}
                                                                        onClick={async () => {
                                                                            if (isOff) { const o = dayOffs.find(x => x.date === ds); if (o) await handleDeleteDayOff(o.id); }
                                                                            else await handleAddDayOff(ds);
                                                                        }}
                                                                        className={`w-8 h-8 rounded-full text-[12px] mx-auto flex items-center justify-center transition-colors ${
                                                                            isOff ? "bg-[#E53935] text-white font-bold" : isPast ? "text-[#DDD]" : hol ? "text-[#E53935] hover:bg-[#FFCDD2]" : "text-[#1A1A1A] hover:bg-[#E8E8E8]"
                                                                        }`}
                                                                        title={hol ? hol.name : isOff ? "解除" : "休み追加"}>
                                                                        {day}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })()}
                                <p className="text-[11px] text-[#999]">🔴 = 休み（タップで解除）</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
