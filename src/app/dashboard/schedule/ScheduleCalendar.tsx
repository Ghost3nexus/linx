"use client";

import { useMemo } from "react";
import type { ScheduleTemplate, Service, Staff, BusinessHour } from "@/lib/apiClient";
import { Users, Plus, Clock, MessageSquare } from "lucide-react";

// ── Color mapping by service name keyword ──
const SERVICE_COLORS: { keyword: string; bg: string; border: string; text: string; label: string }[] = [
    { keyword: "体験", bg: "#06C75515", border: "#06C755", text: "#06C755", label: "Trial" },
    { keyword: "セミ", bg: "#2196F315", border: "#2196F3", text: "#2196F3", label: "Semi-Personal" },
    { keyword: "マンツーマン", bg: "#9C27B015", border: "#9C27B0", text: "#9C27B0", label: "1-on-1" },
    { keyword: "パーソナル", bg: "#9C27B015", border: "#9C27B0", text: "#9C27B0", label: "Personal" },
    { keyword: "グループ", bg: "#F59E0B15", border: "#F59E0B", text: "#F59E0B", label: "Group" },
];

function getServiceStyle(serviceName?: string) {
    if (!serviceName) return { bg: "#06C75510", border: "#06C755", text: "#06C755" };
    const name = serviceName.toLowerCase();
    // Check マンツーマン before パーソナル
    if (name.includes("マンツーマン")) return SERVICE_COLORS[2];
    for (const sc of SERVICE_COLORS) {
        if (name.includes(sc.keyword)) return sc;
    }
    return { bg: "#06C75510", border: "#06C755", text: "#06C755" };
}

// ── Time helpers ──
function timeToMinutes(time: string): number {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function minutesToPx(minutes: number, cellHeight: number): number {
    return (minutes / 30) * cellHeight;
}

interface ScheduleCalendarProps {
    selectedDay: number;
    templates: ScheduleTemplate[];
    staffList: Staff[];
    services: Service[];
    businessHours: BusinessHour[];
    onAddTemplate: (day: number, staffId?: string) => void;
    onEditTemplate: (template: ScheduleTemplate) => void;
    onDeleteTemplate: (id: string) => void;
    onUpdateStaff?: (templateId: string, staffId: string | null) => void;
}

export default function ScheduleCalendar({
    selectedDay,
    templates,
    staffList,
    services,
    businessHours,
    onAddTemplate,
    onEditTemplate,
    onDeleteTemplate,
    onUpdateStaff,
}: ScheduleCalendarProps) {
    const CELL_HEIGHT = 48; // px per 30min
    const START_HOUR = 6;
    const END_HOUR = 23;
    const TOTAL_HOURS = END_HOUR - START_HOUR;

    // Get business hours for selected day
    const dayBusinessHours = useMemo(() => {
        return businessHours.find(h => h.dayOfWeek === selectedDay);
    }, [businessHours, selectedDay]);

    // Active staff + "Unassigned" column
    const columns = useMemo(() => {
        const activeStaff = staffList.filter(s => s.isActive !== false);
        return [
            ...activeStaff.map(s => ({ id: s.id, name: s.name, role: s.role, isUnassigned: false })),
            { id: "__unassigned__", name: "Unassigned", role: undefined, isUnassigned: true },
        ];
    }, [staffList]);

    // Templates for selected day grouped by column
    const columnEvents = useMemo(() => {
        const dayTemplates = templates.filter(t => t.dayOfWeek === selectedDay);
        const map: Record<string, ScheduleTemplate[]> = {};
        for (const col of columns) {
            if (col.isUnassigned) {
                map[col.id] = dayTemplates.filter(t => !t.staffId);
            } else {
                map[col.id] = dayTemplates.filter(t => t.staffId === col.id);
            }
        }
        return map;
    }, [templates, selectedDay, columns]);

    // Check if any column has events
    const hasAnyEvents = useMemo(() => {
        return Object.values(columnEvents).some(events => events.length > 0);
    }, [columnEvents]);

    // Business hours range for graying out
    const bhOpenMin = dayBusinessHours && !dayBusinessHours.isClosed ? timeToMinutes(dayBusinessHours.openTime) : null;
    const bhCloseMin = dayBusinessHours && !dayBusinessHours.isClosed ? timeToMinutes(dayBusinessHours.closeTime) : null;
    const isDayClosed = dayBusinessHours?.isClosed;

    // Time labels
    const timeSlots = useMemo(() => {
        const slots = [];
        for (let h = START_HOUR; h < END_HOUR; h++) {
            slots.push({ hour: h, label: `${String(h).padStart(2, "0")}:00` });
        }
        return slots;
    }, []);

    // No staff at all
    if (staffList.length === 0) {
        return (
            <div className="mt-6 text-center py-16 bg-white border border-[#E8E8E8] rounded-xl">
                <MessageSquare size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                <p className="text-[#999999] text-[15px] font-medium">No staff registered</p>
                <p className="text-[#CCCCCC] text-[13px] mt-2 leading-relaxed">
                    Add staff from the Staff panel above<br />
                    to start building your schedule
                </p>
            </div>
        );
    }

    // Day is closed
    if (isDayClosed) {
        return (
            <div className="mt-6 text-center py-16 bg-[#FFF8F8] border border-[#FFE0E0] rounded-xl">
                <Clock size={40} className="text-[#FFCDD2] mx-auto mb-4" />
                <p className="text-[#E53935] text-[15px] font-medium">Closed Day</p>
                <p className="text-[#999999] text-[13px] mt-2">
                    Business hours are set to closed for this day.
                    <br />Edit in the Hours panel above.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-4">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-[12px]">
                <span className="text-[#666666] font-medium">Colors:</span>
                {[
                    { label: "Trial", color: "#06C755" },
                    { label: "Semi-Personal", color: "#2196F3" },
                    { label: "1-on-1", color: "#9C27B0" },
                    { label: "Group", color: "#F59E0B" },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                        <span className="text-[#666666]">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden shadow-sm">
                {/* Scrollable wrapper for mobile */}
                <div className="overflow-x-auto">
                    <div style={{ minWidth: Math.max(columns.length * 140 + 60, 600) }}>
                        {/* Column Headers */}
                        <div className="flex border-b border-[#E8E8E8] bg-[#F9FAFB] sticky top-0 z-10">
                            {/* Time column header */}
                            <div className="w-[60px] shrink-0 px-2 py-3 text-center">
                                <Clock size={14} className="text-[#CCCCCC] mx-auto" />
                            </div>
                            {/* Staff columns */}
                            {columns.map((col) => {
                                const eventCount = (columnEvents[col.id] || []).length;
                                return (
                                    <div key={col.id}
                                        className={`flex-1 min-w-[120px] px-2 py-3 text-center border-l border-[#F0F0F0] ${
                                            col.isUnassigned ? "bg-[#FFF8E1]" : ""
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-1.5">
                                            {!col.isUnassigned && (
                                                <div className="w-6 h-6 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[10px] font-bold text-[#06C755]">
                                                    {col.name[0]}
                                                </div>
                                            )}
                                            <span className={`text-[13px] font-bold truncate ${col.isUnassigned ? "text-[#F59E0B]" : "text-[#1A1A1A]"}`}>
                                                {col.name}
                                            </span>
                                        </div>
                                        {col.role && !col.isUnassigned && (
                                            <p className="text-[10px] text-[#999999] mt-0.5">{col.role}</p>
                                        )}
                                        {eventCount > 0 && (
                                            <p className="text-[10px] text-[#999999] mt-0.5">{eventCount} slots</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Time Grid Body */}
                        <div className="flex relative" style={{ height: TOTAL_HOURS * CELL_HEIGHT * 2 }}>
                            {/* Time labels column */}
                            <div className="w-[60px] shrink-0 relative">
                                {timeSlots.map((slot) => {
                                    const top = (slot.hour - START_HOUR) * CELL_HEIGHT * 2;
                                    return (
                                        <div key={slot.hour} className="absolute w-full text-right pr-2" style={{ top }}>
                                            <span className="text-[11px] text-[#999999] leading-none">{slot.label}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Staff columns with events */}
                            {columns.map((col) => {
                                const events = columnEvents[col.id] || [];
                                return (
                                    <div key={col.id}
                                        className={`flex-1 min-w-[120px] relative border-l border-[#F0F0F0] cursor-pointer ${
                                            col.isUnassigned ? "bg-[#FFFDF5]" : ""
                                        }`}
                                        onClick={() => {
                                            onAddTemplate(selectedDay, col.isUnassigned ? undefined : col.id);
                                        }}
                                    >
                                        {/* Hour grid lines */}
                                        {timeSlots.map((slot) => {
                                            const top = (slot.hour - START_HOUR) * CELL_HEIGHT * 2;
                                            const isOutsideHours = bhOpenMin !== null && bhCloseMin !== null &&
                                                (slot.hour * 60 < bhOpenMin || slot.hour * 60 >= bhCloseMin);
                                            return (
                                                <div key={slot.hour}>
                                                    <div
                                                        className={`absolute w-full border-t ${isOutsideHours ? "bg-[#F5F5F5] border-[#EEEEEE]" : "border-[#F0F0F0]"}`}
                                                        style={{ top, height: CELL_HEIGHT }}
                                                    />
                                                    <div
                                                        className={`absolute w-full border-t border-dashed ${isOutsideHours ? "bg-[#F5F5F5] border-[#EEEEEE]" : "border-[#F8F8F8]"}`}
                                                        style={{ top: top + CELL_HEIGHT, height: CELL_HEIGHT }}
                                                    />
                                                </div>
                                            );
                                        })}

                                        {/* Gray overlay for outside business hours */}
                                        {bhOpenMin !== null && (
                                            <div
                                                className="absolute w-full bg-[#F5F5F5]/60 z-[1] pointer-events-none"
                                                style={{
                                                    top: 0,
                                                    height: minutesToPx(bhOpenMin - START_HOUR * 60, CELL_HEIGHT),
                                                }}
                                            />
                                        )}
                                        {bhCloseMin !== null && (
                                            <div
                                                className="absolute w-full bg-[#F5F5F5]/60 z-[1] pointer-events-none"
                                                style={{
                                                    top: minutesToPx(bhCloseMin - START_HOUR * 60, CELL_HEIGHT),
                                                    bottom: 0,
                                                }}
                                            />
                                        )}

                                        {/* Event blocks */}
                                        {events.map((t) => {
                                            const startMin = timeToMinutes(t.startTime);
                                            const endMin = timeToMinutes(t.endTime);
                                            const top = minutesToPx(startMin - START_HOUR * 60, CELL_HEIGHT);
                                            const height = minutesToPx(endMin - startMin, CELL_HEIGHT);
                                            const style = getServiceStyle(t.serviceName);
                                            const svcName = t.serviceName || "Slot";
                                            const durationMin = endMin - startMin;

                                            const staffName = t.staffId ? staffList.find(s => s.id === t.staffId)?.name : null;
                                            return (
                                                <div
                                                    key={t.id}
                                                    className="absolute left-1 right-1 rounded-lg px-2 py-1 z-[5] cursor-pointer hover:shadow-md transition-shadow overflow-hidden group"
                                                    style={{
                                                        top,
                                                        height: Math.max(height, 24),
                                                        backgroundColor: style.bg,
                                                        borderLeft: `3px solid ${style.border}`,
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onEditTemplate(t);
                                                    }}
                                                    title={`${svcName}\n${t.startTime} - ${t.endTime}\n担当: ${staffName || '未定'}`}
                                                >
                                                    <p className="text-[11px] font-bold truncate" style={{ color: style.text }}>
                                                        {svcName}
                                                    </p>
                                                    {height >= 36 && (
                                                        <p className="text-[10px] text-[#999999] truncate">
                                                            {t.startTime}〜{t.endTime}
                                                        </p>
                                                    )}
                                                    {/* Staff quick-assign dropdown */}
                                                    {height >= 50 && onUpdateStaff && (
                                                        <select
                                                            value={t.staffId || ""}
                                                            onClick={(e) => e.stopPropagation()}
                                                            onChange={(e) => {
                                                                e.stopPropagation();
                                                                onUpdateStaff(t.id, e.target.value || null);
                                                            }}
                                                            className="mt-0.5 w-full bg-white/80 border border-[#E8E8E8] rounded text-[10px] text-[#1A1A1A] py-0.5 px-1 focus:outline-none focus:border-[#06C755] cursor-pointer"
                                                        >
                                                            <option value="">担当を選択</option>
                                                            {staffList.filter(s => s.isActive !== false).map(s => (
                                                                <option key={s.id} value={s.id}>{s.name}</option>
                                                            ))}
                                                        </select>
                                                    )}
                                                    {height < 50 && staffName && (
                                                        <p className="text-[9px] text-[#06C755] truncate flex items-center gap-0.5">
                                                            <Users size={8} />{staffName}
                                                        </p>
                                                    )}
                                                    {/* Hover tooltip */}
                                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-[9px] bg-white/80 text-[#999] px-1 py-0.5 rounded">編集</span>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Click hint when empty */}
                                        {events.length === 0 && !col.isUnassigned && (
                                            <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
                                                <div className="flex flex-col items-center gap-1 opacity-30 hover:opacity-60 transition-opacity">
                                                    <Plus size={20} className="text-[#06C755]" />
                                                    <span className="text-[10px] text-[#999999]">Click to add</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-3 text-center">
                    <p className="text-[22px] font-bold text-[#06C755]">
                        {templates.filter(t => t.dayOfWeek === selectedDay).length}
                    </p>
                    <p className="text-[11px] text-[#999999]">Total Slots</p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-3 text-center">
                    <p className="text-[22px] font-bold text-[#2196F3]">
                        {staffList.filter(s => s.isActive !== false).length}
                    </p>
                    <p className="text-[11px] text-[#999999]">Active Staff</p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-3 text-center">
                    <p className="text-[22px] font-bold text-[#F59E0B]">
                        {templates.filter(t => t.dayOfWeek === selectedDay && !t.staffId).length}
                    </p>
                    <p className="text-[11px] text-[#999999]">Unassigned</p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-3 text-center">
                    <p className="text-[22px] font-bold text-[#9C27B0]">
                        {templates.filter(t => t.dayOfWeek === selectedDay).reduce((sum, t) => sum + t.maxParticipants, 0)}
                    </p>
                    <p className="text-[11px] text-[#999999]">Max Capacity</p>
                </div>
            </div>
        </div>
    );
}
