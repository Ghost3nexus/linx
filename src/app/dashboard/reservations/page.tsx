"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getReservations, createReservation, cancelReservation,
    getBusinessHours, setBusinessHours,
    type Reservation, type BusinessHour,
} from "@/lib/apiClient";
import { CalendarDays, Plus, X, Clock, User, ChevronLeft, ChevronRight, Save } from "lucide-react";

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

function formatDate(dateStr: string) {
    const d = new Date(dateStr + "T00:00:00");
    return `${d.getMonth() + 1}/${d.getDate()}（${DAY_LABELS[d.getDay()]}）`;
}

function getWeekDates(offset: number) {
    const today = new Date();
    today.setDate(today.getDate() + offset * 7);
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        dates.push(d.toISOString().split("T")[0]);
    }
    return dates;
}

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [businessHours, setBusinessHoursState] = useState<BusinessHour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [weekOffset, setWeekOffset] = useState(0);
    const [showNewForm, setShowNewForm] = useState(false);
    const [showHoursEditor, setShowHoursEditor] = useState(false);
    const [saving, setSaving] = useState(false);

    // New reservation form
    const [newName, setNewName] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [newEndTime, setNewEndTime] = useState("");
    const [newService, setNewService] = useState("");
    const [newNote, setNewNote] = useState("");

    // Business hours editor
    const [editHours, setEditHours] = useState<BusinessHour[]>([]);

    const weekDates = getWeekDates(weekOffset);

    const load = useCallback(() => {
        setLoading(true);
        const from = weekDates[0];
        const to = weekDates[6];
        Promise.all([
            getReservations(from, to),
            getBusinessHours(),
        ])
            .then(([res, hours]) => {
                setReservations(res);
                setBusinessHoursState(hours);
                setEditHours(hours);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [weekOffset]);

    useEffect(() => { load(); }, [load]);

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
            await createReservation({
                customerName: newName,
                date: newDate,
                startTime: newTime,
                endTime: endTime,
                service: newService || undefined,
                note: newNote || undefined,
            });
            setShowNewForm(false);
            setNewName(""); setNewDate(""); setNewTime(""); setNewEndTime(""); setNewService(""); setNewNote("");
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "予約の作成に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleCancel(id: string) {
        if (!confirm("この予約をキャンセルしますか？")) return;
        try {
            await cancelReservation(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "キャンセルに失敗しました");
        }
    }

    async function handleSaveHours() {
        setSaving(true);
        setError("");
        try {
            await setBusinessHours(editHours);
            setBusinessHoursState(editHours);
            setShowHoursEditor(false);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "営業時間の保存に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    function updateEditHour(dayOfWeek: number, field: string, value: string | boolean) {
        setEditHours(prev => prev.map(h =>
            h.dayOfWeek === dayOfWeek ? { ...h, [field]: value } : h
        ));
    }

    const todayStr = new Date().toISOString().split("T")[0];

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">予約管理</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">お客様の予約を確認・管理できます</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowHoursEditor(!showHoursEditor)}
                        className="flex items-center gap-2 text-[14px] text-[#666666] border border-[#E8E8E8] hover:border-[#06C755] hover:text-[#06C755] px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <Clock size={16} />
                        営業時間
                    </button>
                    <button
                        onClick={() => { setShowNewForm(true); setNewDate(todayStr); }}
                        className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                    >
                        <Plus size={16} />
                        予約を追加
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error}
                    <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* Business Hours Editor */}
            {showHoursEditor && (
                <div className="mt-6 bg-white border border-[#E8E8E8] rounded-xl p-6 shadow-sm">
                    <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-4">営業時間の設定</h2>
                    <div className="space-y-3">
                        {editHours.map((h) => (
                            <div key={h.dayOfWeek} className="flex items-center gap-3 flex-wrap">
                                <span className={`w-8 text-[14px] font-bold ${h.dayOfWeek === 0 ? "text-[#E53935]" : h.dayOfWeek === 6 ? "text-[#2196F3]" : "text-[#1A1A1A]"}`}>
                                    {DAY_LABELS[h.dayOfWeek]}
                                </span>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={h.isClosed}
                                        onChange={(e) => updateEditHour(h.dayOfWeek, "isClosed", e.target.checked)}
                                        className="w-4 h-4 accent-[#06C755]"
                                    />
                                    <span className="text-[13px] text-[#999999]">休み</span>
                                </label>
                                {!h.isClosed && (
                                    <>
                                        <input
                                            type="time"
                                            value={h.openTime}
                                            onChange={(e) => updateEditHour(h.dayOfWeek, "openTime", e.target.value)}
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none"
                                        />
                                        <span className="text-[#999999]">〜</span>
                                        <input
                                            type="time"
                                            value={h.closeTime}
                                            onChange={(e) => updateEditHour(h.dayOfWeek, "closeTime", e.target.value)}
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none"
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-5">
                        <button onClick={() => setShowHoursEditor(false)} className="px-4 py-2 text-[14px] text-[#999999] hover:text-[#1A1A1A] transition-colors">キャンセル</button>
                        <button
                            onClick={handleSaveHours}
                            disabled={saving}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-[14px] transition-colors"
                        >
                            <Save size={14} />
                            {saving ? "保存中..." : "営業時間を保存"}
                        </button>
                    </div>
                </div>
            )}

            {/* New Reservation Form */}
            {showNewForm && (
                <div className="mt-6 bg-white border border-[#06C755]/30 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A]">新しい予約</h2>
                        <button onClick={() => setShowNewForm(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">お客様名 *</label>
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="田中 太郎"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">日付 *</label>
                            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">開始時間 *</label>
                            <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">終了時間</label>
                            <input type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} placeholder="自動（1時間後）"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">サービス</label>
                            <input type="text" value={newService} onChange={(e) => setNewService(e.target.value)} placeholder="カット、カラー等"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">メモ</label>
                            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="備考"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5 justify-end">
                        <button onClick={() => setShowNewForm(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">キャンセル</button>
                        <button
                            onClick={handleCreate}
                            disabled={saving || !newName || !newDate || !newTime}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors"
                        >
                            <Plus size={14} />
                            {saving ? "作成中..." : "予約を作成"}
                        </button>
                    </div>
                </div>
            )}

            {/* Week Navigation */}
            <div className="mt-6 flex items-center justify-between">
                <button onClick={() => setWeekOffset(w => w - 1)} className="flex items-center gap-1 text-[14px] text-[#666666] hover:text-[#06C755] transition-colors">
                    <ChevronLeft size={18} /> 前の週
                </button>
                <span className="text-[14px] font-bold text-[#1A1A1A]">
                    {formatDate(weekDates[0])} 〜 {formatDate(weekDates[6])}
                </span>
                <button onClick={() => setWeekOffset(w => w + 1)} className="flex items-center gap-1 text-[14px] text-[#666666] hover:text-[#06C755] transition-colors">
                    次の週 <ChevronRight size={18} />
                </button>
            </div>

            {/* Reservations List */}
            <div className="mt-6 space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : reservations.filter(r => r.status !== "cancelled").length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E8E8E8] rounded-xl">
                        <CalendarDays size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                        <p className="text-[#999999] text-[15px]">この週の予約はありません</p>
                        <p className="text-[#CCCCCC] text-[13px] mt-1">LINEからAIが自動で予約を受け付けます</p>
                    </div>
                ) : (
                    weekDates.map((date) => {
                        const dayReservations = reservations.filter(r => r.date === date && r.status !== "cancelled");
                        if (dayReservations.length === 0) return null;
                        return (
                            <div key={date}>
                                <h3 className={`text-[14px] font-bold mb-2 ${date === todayStr ? "text-[#06C755]" : "text-[#1A1A1A]"}`}>
                                    {date === todayStr && "📍 "}{formatDate(date)}
                                    <span className="text-[12px] text-[#999999] font-normal ml-2">{dayReservations.length}件</span>
                                </h3>
                                <div className="space-y-2">
                                    {dayReservations
                                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                        .map((res) => (
                                        <div key={res.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                                            <div className="w-[70px] shrink-0 text-center">
                                                <p className="text-[18px] font-bold text-[#06C755]">{res.startTime.slice(0, 5)}</p>
                                                <p className="text-[11px] text-[#999999]">〜{res.endTime.slice(0, 5)}</p>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-[#999999]" />
                                                    <p className="text-[15px] font-bold text-[#1A1A1A] truncate">{res.customerName}</p>
                                                </div>
                                                {res.service && <p className="text-[13px] text-[#666666] mt-0.5">{res.service}</p>}
                                                {res.note && <p className="text-[12px] text-[#999999] mt-0.5">{res.note}</p>}
                                            </div>
                                            <div className="shrink-0 flex items-center gap-2">
                                                <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                                                    res.status === "confirmed" ? "bg-[#E8F5E9] text-[#06C755]" :
                                                    res.status === "completed" ? "bg-[#F5F5F5] text-[#999999]" :
                                                    "bg-[#FFF3E0] text-[#F9A825]"
                                                }`}>
                                                    {res.status === "confirmed" ? "確定" : res.status === "completed" ? "完了" : "キャンセル"}
                                                </span>
                                                {res.status === "confirmed" && (
                                                    <button
                                                        onClick={() => handleCancel(res.id)}
                                                        className="text-[#CCCCCC] hover:text-[#E53935] transition-colors p-1"
                                                        title="キャンセル"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
