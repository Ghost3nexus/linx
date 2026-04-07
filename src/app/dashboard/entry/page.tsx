"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getCustomers, getAttendanceList, checkinCustomer,
    type Customer, type Attendance,
} from "@/lib/apiClient";
import { DoorOpen, CheckCircle, X, Search, Clock, User, TrendingUp, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import * as jstCal from "@/lib/jstCalendar";

export default function EntryPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [dateOffset, setDateOffset] = useState(0);

    const todayStr = jstCal.todayJST();
    const viewDate = (() => {
        const d = jstCal.nowJST();
        d.setDate(d.getDate() + dateOffset);
        return jstCal.toDateStr(d);
    })();
    const viewDateLabel = (() => {
        const [, m, d] = viewDate.split("-");
        const dow = new Date(viewDate + "T00:00:00").getDay();
        const holiday = jstCal.getHoliday(viewDate);
        return `${Number(m)}月${Number(d)}日（${jstCal.DAY_LABELS[dow]}）${holiday ? ` ${holiday.name}` : ""}`;
    })();
    const isToday = viewDate === todayStr;

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [cust, att] = await Promise.all([
                getCustomers().catch(() => []),
                getAttendanceList(viewDate, viewDate).catch(() => []),
            ]);
            setCustomers(Array.isArray(cust) ? cust : []);
            setAttendance(Array.isArray(att) ? att : []);
        } catch { /* ignore */ }
        finally { setLoading(false); }
    }, [viewDate]);

    useEffect(() => { load(); }, [load]);

    // Today's attendance
    const todayCheckins = attendance.filter(a => (a.check_in_at || "").startsWith(viewDate));
    const checkedInIds = new Set(todayCheckins.map(a => a.customer_id));

    // Stats
    const activeMembers = customers.filter(c => c.status === "active").length;
    const todayCount = todayCheckins.length;

    // Filtered for quick checkin
    const activeCustomers = customers.filter(c => {
        if (c.status !== "active") return false;
        if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    async function handleCheckin(c: Customer) {
        setError("");
        try {
            await checkinCustomer(c.id, {
                service: c.plan === "semi_personal" ? "セミパーソナル" : c.plan === "mantoMan" ? "マンツーマン" : undefined,
            });
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "チェックインに失敗");
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">入退館管理</h1>
                    <p className="text-[#999] mt-1 text-[14px]">会員のチェックイン記録・来館状況</p>
                </div>
            </div>

            {error && (
                <div className="mt-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px] flex items-center justify-between">
                    {error} <button onClick={() => setError("")}><X size={14} /></button>
                </div>
            )}

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 text-center">
                    <p className="text-[32px] font-bold text-[#06C755]">{todayCount}</p>
                    <p className="text-[12px] text-[#999]">{isToday ? "本日の来館" : `${viewDateLabel}の来館`}</p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 text-center">
                    <p className="text-[32px] font-bold text-[#1A1A1A]">{activeMembers}</p>
                    <p className="text-[12px] text-[#999]">アクティブ会員</p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-4 text-center">
                    <p className="text-[32px] font-bold text-[#2196F3]">
                        {activeMembers > 0 ? Math.round((todayCount / activeMembers) * 100) : 0}%
                    </p>
                    <p className="text-[12px] text-[#999]">来館率</p>
                </div>
            </div>

            {/* Date Navigation */}
            <div className="mt-5 flex items-center justify-between">
                <button onClick={() => setDateOffset(d => d - 1)} className="flex items-center gap-1 text-[14px] text-[#666] hover:text-[#06C755]">
                    <ChevronLeft size={18} /> 前日
                </button>
                <div className="flex items-center gap-3">
                    {dateOffset !== 0 && (
                        <button onClick={() => setDateOffset(0)} className="text-[12px] text-[#06C755] border border-[#06C755] px-3 py-1 rounded-full hover:bg-[#E8F5E9]">
                            今日
                        </button>
                    )}
                    <span className={`text-[15px] font-bold ${isToday ? "text-[#06C755]" : "text-[#1A1A1A]"}`}>
                        {isToday && "📍 "}{viewDateLabel}
                    </span>
                </div>
                <button onClick={() => setDateOffset(d => d + 1)} className="flex items-center gap-1 text-[14px] text-[#666] hover:text-[#06C755]">
                    翌日 <ChevronRight size={18} />
                </button>
            </div>

            {/* Two columns: Quick Checkin + Today's Log */}
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">

                {/* Left: Quick Checkin */}
                {isToday && (
                    <div>
                        <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <DoorOpen size={15} className="text-[#06C755]" />
                            クイックチェックイン
                        </h3>
                        <div className="relative mb-3">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CCC]" />
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="会員名で検索"
                                className="w-full bg-white border border-[#E8E8E8] rounded-lg pl-9 pr-4 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {loading ? (
                                <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" /></div>
                            ) : activeCustomers.length === 0 ? (
                                <p className="text-[#999] text-center py-8 text-[14px]">アクティブ会員がいません</p>
                            ) : activeCustomers.map(c => {
                                const alreadyCheckedIn = checkedInIds.has(c.id);
                                const planLabel = c.plan === "semi_personal" ? "セミパーソナル" : c.plan === "mantoMan" ? "マンツーマン" : c.plan || "";
                                return (
                                    <div key={c.id} className={`flex items-center gap-3 bg-white border rounded-xl p-3 transition-all ${
                                        alreadyCheckedIn ? "border-[#06C755]/30 bg-[#E8F5E9]/30" : "border-[#E8E8E8] hover:border-[#06C755]/50"
                                    }`}>
                                        <div className="w-10 h-10 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[14px] font-bold text-[#06C755] shrink-0">
                                            {c.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[14px] font-bold text-[#1A1A1A] truncate">{c.name}</p>
                                            <div className="flex gap-2 text-[11px] text-[#999]">
                                                {planLabel && <span>{planLabel}</span>}
                                                <span>来店{c.visitCount || 0}回</span>
                                            </div>
                                        </div>
                                        {alreadyCheckedIn ? (
                                            <span className="flex items-center gap-1 text-[12px] text-[#06C755] font-bold bg-[#E8F5E9] px-3 py-1.5 rounded-full">
                                                <CheckCircle size={14} /> 来館済み
                                            </span>
                                        ) : (
                                            <button onClick={() => handleCheckin(c)}
                                                className="flex items-center gap-1.5 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-4 py-2 rounded-full text-[13px] transition-colors shrink-0">
                                                <DoorOpen size={14} /> チェックイン
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Right (or full): Today's Log */}
                <div className={isToday ? "" : "lg:col-span-2"}>
                    <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                        <Clock size={15} className="text-[#2196F3]" />
                        {isToday ? "本日の来館ログ" : `${viewDateLabel}の来館ログ`}
                        <span className="text-[12px] text-[#999] font-normal ml-1">{todayCheckins.length}件</span>
                    </h3>
                    {todayCheckins.length === 0 ? (
                        <div className="text-center py-12 bg-white border border-[#E8E8E8] rounded-xl">
                            <CalendarDays size={36} className="text-[#E0E0E0] mx-auto mb-3" />
                            <p className="text-[#999] text-[14px]">{isToday ? "まだ来館がありません" : "この日の来館記録はありません"}</p>
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {todayCheckins
                                .sort((a, b) => (b.check_in_at || "").localeCompare(a.check_in_at || ""))
                                .map((att, i) => {
                                const time = (att.check_in_at || "").split("T")[1]?.slice(0, 5) || "--:--";
                                const customer = customers.find(c => c.id === att.customer_id);
                                return (
                                    <div key={att.id || i} className="flex items-center gap-3 bg-white border border-[#E8E8E8] rounded-xl p-3">
                                        <div className="w-8 h-8 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[12px] font-bold text-[#06C755] shrink-0">
                                            {(att.customer_name || customer?.name || "?")[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-[#1A1A1A] truncate">
                                                {att.customer_name || customer?.name || "不明"}
                                            </p>
                                            {att.service && <p className="text-[11px] text-[#999]">{att.service}</p>}
                                            {att.note && <p className="text-[11px] text-[#06C755]">{att.note}</p>}
                                        </div>
                                        <span className="text-[14px] font-bold text-[#2196F3] shrink-0">{time}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
