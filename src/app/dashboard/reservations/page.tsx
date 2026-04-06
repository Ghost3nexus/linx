"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getReservations, createReservation, cancelReservation, updateReservation,
    getStaff,
    type Reservation, type Staff,
} from "@/lib/apiClient";
import { Plus, X, User, ChevronLeft, ChevronRight, CheckCircle2, CalendarDays } from "lucide-react";
import { todayJST, formatDateShort, getWeekDatesJST, getHoliday, DAY_LABELS } from "@/lib/jstCalendar";

const HOURS = Array.from({ length: 14 }, (_, i) => i + 9); // 9:00 - 22:00

function timeToRow(time: string): number {
    const [h, m] = time.split(":").map(Number);
    return (h - 9) * 2 + (m >= 30 ? 1 : 0);
}

function timeSpan(start: string, end: string): number {
    const s = timeToRow(start);
    const e = timeToRow(end);
    return Math.max(e - s, 1);
}

const STATUS_COLORS: Record<string, { bg: string; border: string; text: string }> = {
    confirmed: { bg: "bg-[#E8F5E9]", border: "border-l-[#06C755]", text: "text-[#06C755]" },
    completed: { bg: "bg-[#E3F2FD]", border: "border-l-[#1976D2]", text: "text-[#1976D2]" },
    cancelled: { bg: "bg-[#FFEBEE]", border: "border-l-[#E53935]", text: "text-[#E53935]" },
};

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
    const [showNewForm, setShowNewForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // New reservation form
    const [newName, setNewName] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newEndTime, setNewEndTime] = useState("");
    const [newService, setNewService] = useState("");
    const [newNote, setNewNote] = useState("");

    const weekDates = getWeekDatesJST(weekOffset);
    const todayStr = todayJST();

    const load = useCallback(() => {
        setLoading(true);
        const from = weekDates[0];
        const to = weekDates[6];
        Promise.all([
            getReservations(from, to).catch(() => []),
            getStaff().catch(() => []),
        ])
            .then(([res, staff]) => {
                setStaffList(Array.isArray(staff) ? staff : []);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const normalized = (Array.isArray(res) ? res : []).map((r: any) => ({
                    id: r.id,
                    customerName: r.customerName || r.customer_name,
                    customerLineUserId: r.customerLineUserId || r.customer_line_user_id,
                    date: r.date?.split("T")[0] || r.date,
                    startTime: (r.startTime || r.start_time || "").slice(0, 5),
                    endTime: (r.endTime || r.end_time || "").slice(0, 5),
                    service: r.service,
                    staffId: r.staffId || r.staff_id,
                    staffName: r.staffName || r.staff_name,
                    note: r.note,
                    status: r.status,
                    createdAt: r.createdAt || r.created_at,
                    updatedAt: r.updatedAt || r.updated_at,
                } as Reservation));
                setReservations(normalized);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekOffset]);

    useEffect(() => { load(); }, [load]);

    function getStaffName(res: Reservation): string | undefined {
        if (res.staffName) return res.staffName;
        if (res.staffId) return staffList.find(s => s.id === res.staffId)?.name;
        return undefined;
    }

    async function handleCreate() {
        if (!newName || !newDate || !newTime) return;
        setSaving(true);
        setError("");
        try {
            const endTime = newEndTime || (() => {
                const [h, m] = newTime.split(":").map(Number);
                const end = new Date(2000, 0, 1, h, m + 60);
                return `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
            })();
            await createReservation({ customerName: newName, date: newDate, startTime: newTime, endTime, service: newService || undefined, note: newNote || undefined });
            setShowNewForm(false);
            setNewName(""); setNewDate(""); setNewTime(""); setNewEndTime(""); setNewService(""); setNewNote("");
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "予約の作成に失敗しました");
        } finally { setSaving(false); }
    }

    async function handleCancel(id: string) {
        if (!confirm("この予約をキャンセルしますか？")) return;
        try { await cancelReservation(id); setSelectedRes(null); load(); }
        catch (e: unknown) { setError(e instanceof Error ? e.message : "キャンセルに失敗しました"); }
    }

    async function handleComplete(id: string) {
        setUpdatingId(id);
        try { await updateReservation(id, { status: "completed" }); setSelectedRes(null); load(); }
        catch (e: unknown) { setError(e instanceof Error ? e.message : "ステータス更新に失敗しました"); }
        finally { setUpdatingId(null); }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">予約管理</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">週間カレンダーで予約を確認・管理</p>
                </div>
                <button
                    onClick={() => { setShowNewForm(true); setNewDate(todayStr); }}
                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                >
                    <Plus size={16} /> 予約を追加
                </button>
            </div>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error} <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* New Reservation Form */}
            {showNewForm && (
                <div className="mt-4 bg-white border border-[#06C755]/30 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A]">新しい予約</h2>
                        <button onClick={() => setShowNewForm(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-[12px] text-[#666] mb-1">お客様名 *</label>
                            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="田中 太郎"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666] mb-1">日付 *</label>
                            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666] mb-1">開始 *</label>
                            <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666] mb-1">終了</label>
                            <input type="time" value={newEndTime} onChange={e => setNewEndTime(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666] mb-1">サービス</label>
                            <input type="text" value={newService} onChange={e => setNewService(e.target.value)} placeholder="体験レッスン"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666] mb-1">メモ</label>
                            <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="備考"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4 justify-end">
                        <button onClick={() => setShowNewForm(false)} className="px-4 py-2 text-[14px] text-[#999]">キャンセル</button>
                        <button onClick={handleCreate} disabled={saving || !newName || !newDate || !newTime}
                            className="bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-[14px] transition-colors">
                            {saving ? "作成中..." : "予約を作成"}
                        </button>
                    </div>
                </div>
            )}

            {/* Week Navigation */}
            <div className="mt-5 flex items-center justify-between">
                <button onClick={() => setWeekOffset(w => w - 1)} className="flex items-center gap-1 text-[14px] text-[#666] hover:text-[#06C755] transition-colors">
                    <ChevronLeft size={18} /> 前の週
                </button>
                <div className="flex items-center gap-3">
                    {weekOffset !== 0 && (
                        <button onClick={() => setWeekOffset(0)} className="text-[12px] text-[#06C755] border border-[#06C755] px-3 py-1 rounded-full hover:bg-[#E8F5E9] transition-colors">
                            今週
                        </button>
                    )}
                    <span className="text-[14px] font-bold text-[#1A1A1A]">
                        {formatDateShort(weekDates[0])} 〜 {formatDateShort(weekDates[6])}
                    </span>
                </div>
                <button onClick={() => setWeekOffset(w => w + 1)} className="flex items-center gap-1 text-[14px] text-[#666] hover:text-[#06C755] transition-colors">
                    次の週 <ChevronRight size={18} />
                </button>
            </div>

            {/* Calendar Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="mt-4 bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <div className="min-w-[700px]">
                            {/* Day Headers */}
                            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[#E8E8E8]">
                                <div className="p-2" />
                                {weekDates.map((date) => {
                                    const [, m, dd] = date.split("-");
                                    const dayIdx = new Date(date + "T00:00:00").getDay();
                                    const isToday = date === todayStr;
                                    const holiday = getHoliday(date);
                                    const isHolidayOrSun = !!holiday || dayIdx === 0;
                                    return (
                                        <div key={date} className={`text-center py-2 border-l border-[#E8E8E8] ${isToday ? "bg-[#E8F5E9]" : holiday ? "bg-[#FFF5F5]" : ""}`}>
                                            <p className={`text-[11px] font-bold ${isHolidayOrSun ? "text-[#E53935]" : dayIdx === 6 ? "text-[#2196F3]" : "text-[#999]"}`}>
                                                {DAY_LABELS[dayIdx]}
                                            </p>
                                            <p className={`text-[18px] font-bold ${isToday ? "text-[#06C755]" : isHolidayOrSun ? "text-[#E53935]" : "text-[#1A1A1A]"}`}>
                                                {Number(dd)}
                                            </p>
                                            <p className="text-[10px] text-[#999]">{Number(m)}月</p>
                                            {holiday && <p className="text-[9px] text-[#E53935] font-bold mt-0.5">{holiday.shortName}</p>}
                                            {isToday && !holiday && <div className="w-1.5 h-1.5 bg-[#06C755] rounded-full mx-auto mt-0.5" />}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Time Grid */}
                            <div className="relative">
                                {HOURS.map((hour) => (
                                    <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-[#F0F0F0]" style={{ height: 60 }}>
                                        <div className="text-[11px] text-[#999] text-right pr-2 pt-1 border-r border-[#E8E8E8]">
                                            {hour}:00
                                        </div>
                                        {weekDates.map((date) => (
                                            <div key={`${date}-${hour}`} className="border-l border-[#F0F0F0] relative">
                                                <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-[#F5F5F5]" />
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                {/* Reservation Blocks — absolute positioned over the grid */}
                                {reservations.filter(r => r.status !== "cancelled").map((res) => {
                                    const dateIdx = weekDates.indexOf(res.date);
                                    if (dateIdx < 0) return null;
                                    const row = timeToRow(res.startTime);
                                    const span = timeSpan(res.startTime, res.endTime);
                                    const top = row * 30;
                                    const height = span * 30;
                                    const colors = STATUS_COLORS[res.status] || STATUS_COLORS.confirmed;
                                    const staffName = getStaffName(res);

                                    // 60px = time column, remaining 7 equal columns
                                    const colWidthPercent = `calc((100% - 60px) / 7)`;
                                    const leftOffset = `calc(60px + ${dateIdx} * ${colWidthPercent} + 2px)`;
                                    const blockWidth = `calc(${colWidthPercent} - 4px)`;

                                    return (
                                        <div
                                            key={res.id}
                                            onClick={() => setSelectedRes(res)}
                                            className={`absolute ${colors.bg} ${colors.border} border-l-[3px] rounded-r-lg px-2 py-1 cursor-pointer hover:shadow-md transition-shadow overflow-hidden z-10`}
                                            style={{
                                                top: `${top}px`,
                                                height: `${Math.max(height - 2, 28)}px`,
                                                left: leftOffset,
                                                width: blockWidth,
                                            }}
                                        >
                                            <p className={`text-[11px] font-bold ${colors.text} truncate`}>
                                                {res.startTime}〜{res.endTime}
                                            </p>
                                            <p className="text-[12px] font-bold text-[#1A1A1A] truncate">{res.customerName}</p>
                                            {height > 40 && res.service && <p className="text-[10px] text-[#666] truncate">{res.service}</p>}
                                            {height > 55 && staffName && <p className="text-[10px] text-[#06C755] truncate">{staffName}</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* No reservations message */}
            {!loading && reservations.filter(r => r.status !== "cancelled").length === 0 && (
                <div className="text-center py-10">
                    <CalendarDays size={40} className="text-[#E0E0E0] mx-auto mb-3" />
                    <p className="text-[#999] text-[14px]">この週の予約はありません</p>
                    <p className="text-[#CCC] text-[12px] mt-1">LINEからAIが自動で予約を受け付けます</p>
                </div>
            )}

            {/* Reservation Detail Modal */}
            {selectedRes && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setSelectedRes(null)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">予約詳細</h2>
                            <button onClick={() => setSelectedRes(null)} className="text-[#999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <User size={18} className="text-[#06C755]" />
                                <div>
                                    <p className="text-[16px] font-bold text-[#1A1A1A]">{selectedRes.customerName}</p>
                                    {getStaffName(selectedRes) && <p className="text-[12px] text-[#06C755]">担当: {getStaffName(selectedRes)}</p>}
                                </div>
                            </div>

                            <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-2">
                                <div className="flex justify-between text-[14px]">
                                    <span className="text-[#999]">日付</span>
                                    <span className="font-bold text-[#1A1A1A]">{selectedRes.date} ({DAY_LABELS[new Date(selectedRes.date + "T00:00:00").getDay()]})</span>
                                </div>
                                <div className="flex justify-between text-[14px]">
                                    <span className="text-[#999]">時間</span>
                                    <span className="font-bold text-[#1A1A1A]">{selectedRes.startTime} 〜 {selectedRes.endTime}</span>
                                </div>
                                {selectedRes.service && (
                                    <div className="flex justify-between text-[14px]">
                                        <span className="text-[#999]">サービス</span>
                                        <span className="font-bold text-[#1A1A1A]">{selectedRes.service}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-[14px]">
                                    <span className="text-[#999]">ステータス</span>
                                    <span className={`font-bold ${(STATUS_COLORS[selectedRes.status] || STATUS_COLORS.confirmed).text}`}>
                                        {selectedRes.status === "confirmed" ? "確定" : selectedRes.status === "completed" ? "完了" : "キャンセル"}
                                    </span>
                                </div>
                            </div>

                            {selectedRes.note && (
                                <div className="bg-[#FFFBEB] rounded-xl p-3">
                                    <p className="text-[12px] text-[#F59E0B] font-bold mb-1">メモ</p>
                                    <p className="text-[13px] text-[#1A1A1A]">{selectedRes.note}</p>
                                </div>
                            )}
                        </div>

                        {selectedRes.status === "confirmed" && (
                            <div className="flex gap-3 mt-5">
                                <button
                                    onClick={() => handleCancel(selectedRes.id)}
                                    className="flex-1 border border-[#E53935] text-[#E53935] font-bold py-2.5 rounded-xl text-[14px] hover:bg-[#FFEBEE] transition-colors"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={() => handleComplete(selectedRes.id)}
                                    disabled={updatingId === selectedRes.id}
                                    className="flex-1 bg-[#1976D2] hover:bg-[#1565C0] disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-[14px] transition-colors flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={16} />
                                    {updatingId === selectedRes.id ? "更新中..." : "完了にする"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
