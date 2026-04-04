"use client";

import { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import type { ScheduleTemplate, Service, Staff } from "@/lib/apiClient";
import { Users } from "lucide-react";

// DayPilot must be loaded client-side only
const DayPilotCalendarImport = dynamic(
    () => import("@daypilot/daypilot-lite-react").then((mod) => mod.DayPilotCalendar),
    { ssr: false }
);

// ── Color mapping by service name keyword ──
function getServiceColor(serviceName?: string): string {
    if (!serviceName) return "#999999";
    const name = serviceName.toLowerCase();
    if (name.includes("体験")) return "#22C55E";       // green
    if (name.includes("セミ")) return "#3B82F6";       // blue
    if (name.includes("マンツーマン")) return "#8B5CF6"; // purple
    if (name.includes("パーソナル") && !name.includes("セミ")) return "#8B5CF6";
    if (name.includes("グループ")) return "#F59E0B";   // amber
    if (name.includes("レッスン")) return "#06B6D4";   // cyan
    return "#06C755"; // default green (LINX brand)
}

function getServiceColorDark(serviceName?: string): string {
    if (!serviceName) return "#666666";
    const name = serviceName.toLowerCase();
    if (name.includes("体験")) return "#16A34A";
    if (name.includes("セミ")) return "#2563EB";
    if (name.includes("マンツーマン")) return "#7C3AED";
    if (name.includes("パーソナル") && !name.includes("セミ")) return "#7C3AED";
    if (name.includes("グループ")) return "#D97706";
    if (name.includes("レッスン")) return "#0891B2";
    return "#05B04A";
}

interface ScheduleCalendarProps {
    selectedDay: number; // 0=Sun, 1=Mon, ...
    templates: ScheduleTemplate[];
    staffList: Staff[];
    services: Service[];
    onAddTemplate: (day: number, staffId?: string) => void;
    onDeleteTemplate: (id: string) => void;
}

export default function ScheduleCalendar({
    selectedDay,
    templates,
    staffList,
    services,
    onAddTemplate,
    onDeleteTemplate,
}: ScheduleCalendarProps) {
    const calendarRef = useRef<unknown>(null);

    // Build columns from staff list
    const columns = useMemo(() => {
        if (staffList.length === 0) return [];
        return staffList
            .filter((s) => s.isActive !== false)
            .map((s) => ({
                name: s.name,
                id: s.id,
            }));
    }, [staffList]);

    // Build events from templates for the selected day
    const events = useMemo(() => {
        const dayTemplates = templates.filter((t) => t.dayOfWeek === selectedDay);
        return dayTemplates
            .filter((t) => t.staffId) // Only show templates with assigned staff
            .map((t) => {
                const svcName = t.serviceName || "予約枠";
                const color = getServiceColor(t.serviceName);
                const colorDark = getServiceColorDark(t.serviceName);
                return {
                    id: t.id,
                    text: `${svcName}\n${t.startTime}〜${t.endTime}`,
                    start: `2026-01-05T${t.startTime}:00`, // Use a fixed Monday date as base
                    end: `2026-01-05T${t.endTime}:00`,
                    resource: t.staffId,
                    backColor: color + "20",
                    borderColor: color,
                    barColor: colorDark,
                    fontColor: colorDark,
                    // Store template data for click handler
                    tags: {
                        templateId: t.id,
                        serviceName: svcName,
                        staffName: t.staffName,
                    },
                };
            });
    }, [templates, selectedDay]);

    // Unassigned templates (no staff)
    const unassignedTemplates = useMemo(() => {
        return templates
            .filter((t) => t.dayOfWeek === selectedDay && !t.staffId);
    }, [templates, selectedDay]);

    if (staffList.length === 0) {
        return (
            <div className="text-center py-16 bg-white border border-[#E8E8E8] rounded-xl mt-6">
                <Users size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                <p className="text-[#999999] text-[15px]">スタッフを追加してください</p>
                <p className="text-[#CCCCCC] text-[13px] mt-1">
                    「スタッフ」タブからスタッフを登録すると、<br />
                    カレンダービューが使えるようになります
                </p>
            </div>
        );
    }

    const DAY_LABELS_FULL = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

    return (
        <div className="mt-6 space-y-4">
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-[12px]">
                <span className="text-[#666666] font-medium">凡例:</span>
                {[
                    { label: "体験", color: "#22C55E" },
                    { label: "セミパーソナル", color: "#3B82F6" },
                    { label: "マンツーマン", color: "#8B5CF6" },
                    { label: "その他", color: "#06C755" },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[#666666]">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* DayPilot Calendar */}
            <div className="bg-white border border-[#E8E8E8] rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-[#F9FAFB] border-b border-[#E8E8E8]">
                    <h3 className="text-[14px] font-bold text-[#1A1A1A]">
                        {DAY_LABELS_FULL[selectedDay]} - スタッフ別スケジュール
                    </h3>
                </div>
                <div className="p-2" style={{ minHeight: 500 }}>
                    {/* @ts-expect-error DayPilot dynamic import type */}
                    <DayPilotCalendarImport
                        ref={calendarRef}
                        viewType="Resources"
                        columns={columns}
                        events={events}
                        startDate="2026-01-05"
                        dayBeginsHour={9}
                        dayEndsHour={22}
                        cellHeight={30}
                        headerHeight={40}
                        eventHeight={40}
                        timeHeaderCellDuration={30}
                        eventMoveHandling="Disabled"
                        eventResizeHandling="Disabled"
                        heightSpec="BusinessHoursNoScroll"
                        onTimeRangeSelected={(args: {
                            resource: string;
                            start: { toString: (f: string) => string };
                            end: { toString: (f: string) => string };
                        }) => {
                            onAddTemplate(selectedDay, args.resource);
                        }}
                        onEventClick={(args: {
                            e: { id: () => string; text: () => string };
                        }) => {
                            const templateId = args.e.id();
                            const text = args.e.text();
                            if (confirm(`この枠を削除しますか？\n\n${text.replace("\n", " ")}`)) {
                                onDeleteTemplate(templateId);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Unassigned templates warning */}
            {unassignedTemplates.length > 0 && (
                <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-4">
                    <p className="text-[13px] text-[#F57F17] font-medium mb-2">
                        スタッフ未割当の枠が {unassignedTemplates.length} 件あります
                    </p>
                    <div className="space-y-1">
                        {unassignedTemplates.map((t) => (
                            <div key={t.id} className="text-[12px] text-[#795548]">
                                {t.startTime}〜{t.endTime}
                                {t.serviceName && ` - ${t.serviceName}`}
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] text-[#A1887F] mt-2">
                        スケジュールタブで担当スタッフを設定するとカレンダーに表示されます
                    </p>
                </div>
            )}
        </div>
    );
}
