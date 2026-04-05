"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getScheduleTemplates,
    createScheduleTemplate,
    deleteScheduleTemplate,
    copyDaySchedule,
    getServices,
    getStaff,
    getResources,
    createStaff,
    deleteStaff,
    createResource,
    deleteResource,
    getBusinessHours,
    setBusinessHours,
    getStaffAvailability,
    setStaffAvailability,
    getStaffDayOffs,
    addStaffDayOff,
    deleteStaffDayOff,
    type ScheduleTemplate,
    type Service,
    type Staff,
    type Resource,
    type BusinessHour,
    type StaffAvailability,
    type StaffDayOff,
} from "@/lib/apiClient";
import {
    Plus, X, Trash2, Copy, CalendarClock, Save, Users, MapPin,
    ChevronLeft, ChevronRight, CalendarDays, Clock, Calendar, AlertTriangle,
} from "lucide-react";
import ScheduleCalendar from "./ScheduleCalendar";

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
const DAY_LABELS_FULL = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

// ── Normalize snake_case from API to camelCase ──

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeTemplate(t: any): ScheduleTemplate {
    return {
        id: t.id,
        accountId: t.accountId || t.account_id,
        dayOfWeek: t.dayOfWeek ?? t.day_of_week,
        startTime: formatTime(t.startTime || t.start_time),
        endTime: formatTime(t.endTime || t.end_time),
        serviceId: t.serviceId || t.service_id || undefined,
        staffId: t.staffId || t.staff_id || undefined,
        resourceId: t.resourceId || t.resource_id || undefined,
        maxParticipants: t.maxParticipants ?? t.max_participants ?? 1,
        isActive: t.isActive ?? t.is_active ?? true,
        createdAt: t.createdAt || t.created_at,
        serviceName: t.serviceName || t.service_name,
        serviceDuration: t.serviceDuration || t.service_duration,
        servicePrice: t.servicePrice || t.service_price,
        staffName: t.staffName || t.staff_name,
        resourceName: t.resourceName || t.resource_name,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeStaff(s: any): Staff {
    return {
        id: s.id,
        accountId: s.accountId || s.account_id,
        name: s.name,
        role: s.role,
        isActive: s.isActive ?? s.is_active ?? true,
        createdAt: s.createdAt || s.created_at,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeResource(r: any): Resource {
    return {
        id: r.id,
        accountId: r.accountId || r.account_id,
        name: r.name,
        type: r.type,
        capacity: r.capacity ?? 1,
        isActive: r.isActive ?? r.is_active ?? true,
        createdAt: r.createdAt || r.created_at,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeService(s: any): Service {
    return {
        id: s.id,
        accountId: s.accountId || s.account_id,
        name: s.name,
        duration: s.duration,
        price: s.price,
        maxParticipants: s.maxParticipants ?? s.max_participants ?? 1,
        description: s.description,
        isActive: s.isActive ?? s.is_active ?? true,
        sortOrder: s.sortOrder ?? s.sort_order ?? 0,
        createdAt: s.createdAt || s.created_at,
    };
}

function formatTime(t: string): string {
    if (!t) return "";
    const parts = t.split(":");
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
}

// ── Tab type ──

type Tab = "schedule" | "staff" | "resources" | "calendar" | "hours";

export default function SchedulePage() {
    const [tab, setTab] = useState<Tab>("schedule");
    const [templates, setTemplates] = useState<ScheduleTemplate[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [resourceList, setResourceList] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // Selected day for mobile view
    const [selectedDay, setSelectedDay] = useState(1); // Monday

    // Add template form
    const [showForm, setShowForm] = useState(false);
    const [formDay, setFormDay] = useState(1);
    const [formStartTime, setFormStartTime] = useState("10:00");
    const [formEndTime, setFormEndTime] = useState("11:00");
    const [formServiceId, setFormServiceId] = useState("");
    const [formStaffId, setFormStaffId] = useState("");
    const [formResourceId, setFormResourceId] = useState("");
    const [formMaxParticipants, setFormMaxParticipants] = useState(1);

    // Copy day
    const [showCopy, setShowCopy] = useState(false);
    const [copyFrom, setCopyFrom] = useState(1);
    const [copyTo, setCopyTo] = useState(2);

    // Staff form
    const [showStaffForm, setShowStaffForm] = useState(false);
    const [staffFormName, setStaffFormName] = useState("");
    const [staffFormRole, setStaffFormRole] = useState("");

    // Resource form
    const [showResourceForm, setShowResourceForm] = useState(false);
    const [resourceFormName, setResourceFormName] = useState("");
    const [resourceFormType, setResourceFormType] = useState("");
    const [resourceFormCapacity, setResourceFormCapacity] = useState(1);

    // Business hours
    const [businessHours, setBusinessHoursState] = useState<BusinessHour[]>(
        DAY_LABELS.map((_, i) => ({
            dayOfWeek: i,
            openTime: "09:00",
            closeTime: "18:00",
            isClosed: i === 0,
            slotDuration: 30,
        }))
    );
    // Multi-slot business hours: each day can have multiple time slots
    const [editHoursMap, setEditHoursMap] = useState<Record<number, { openTime: string; closeTime: string }[]>>({});
    const [editClosedDays, setEditClosedDays] = useState<Record<number, boolean>>({});

    // Staff availability modal
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
    const [availabilityStaff, setAvailabilityStaff] = useState<Staff | null>(null);
    const [staffAvailSlots, setStaffAvailSlots] = useState<Record<number, { startTime: string; endTime: string }[]>>({});
    const [staffDayOffs, setStaffDayOffs] = useState<StaffDayOff[]>([]);
    const [newDayOffDate, setNewDayOffDate] = useState("");
    const [newDayOffReason, setNewDayOffReason] = useState("");
    const [availSaving, setAvailSaving] = useState(false);

    // Buffer time for template form
    const [formBufferBefore, setFormBufferBefore] = useState(0);
    const [formBufferAfter, setFormBufferAfter] = useState(0);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [tmpl, svc, stf, rsc, bh] = await Promise.all([
                getScheduleTemplates(),
                getServices(),
                getStaff(),
                getResources(),
                getBusinessHours().catch(() => []),
            ]);
            setTemplates((Array.isArray(tmpl) ? tmpl : []).map(normalizeTemplate));
            setServices((Array.isArray(svc) ? svc : []).map(normalizeService));
            setStaffList((Array.isArray(stf) ? stf : []).map(normalizeStaff));
            setResourceList((Array.isArray(rsc) ? rsc : []).map(normalizeResource));

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const normalizedHours = (Array.isArray(bh) ? bh : []).map((h: any) => ({
                dayOfWeek: h.dayOfWeek ?? h.day_of_week,
                openTime: h.openTime || h.open_time || "09:00",
                closeTime: h.closeTime || h.close_time || "18:00",
                isClosed: h.isClosed ?? h.is_closed ?? false,
                slotDuration: h.slotDuration ?? h.slot_duration ?? 30,
            } as BusinessHour));
            if (normalizedHours.length > 0) {
                setBusinessHoursState(normalizedHours);
            }
            // Initialize editHoursMap from business hours
            initEditHoursFromBH(normalizedHours.length > 0 ? normalizedHours : businessHours);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "読み込みに失敗しました");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    // ── Business hours helpers ──

    function initEditHoursFromBH(hours: BusinessHour[]) {
        const map: Record<number, { openTime: string; closeTime: string }[]> = {};
        const closed: Record<number, boolean> = {};
        for (let d = 0; d < 7; d++) {
            const h = hours.find(bh => bh.dayOfWeek === d);
            if (h) {
                closed[d] = h.isClosed;
                map[d] = h.isClosed ? [] : [{ openTime: h.openTime, closeTime: h.closeTime }];
            } else {
                closed[d] = d === 0;
                map[d] = d === 0 ? [] : [{ openTime: "09:00", closeTime: "18:00" }];
            }
        }
        setEditHoursMap(map);
        setEditClosedDays(closed);
    }

    function addSlotToDay(day: number) {
        setEditHoursMap(prev => ({
            ...prev,
            [day]: [...(prev[day] || []), { openTime: "10:00", closeTime: "18:00" }],
        }));
    }

    function removeSlotFromDay(day: number, index: number) {
        setEditHoursMap(prev => ({
            ...prev,
            [day]: (prev[day] || []).filter((_, i) => i !== index),
        }));
    }

    function updateSlot(day: number, index: number, field: "openTime" | "closeTime", value: string) {
        setEditHoursMap(prev => ({
            ...prev,
            [day]: (prev[day] || []).map((s, i) => i === index ? { ...s, [field]: value } : s),
        }));
    }

    function toggleClosed(day: number, isClosed: boolean) {
        setEditClosedDays(prev => ({ ...prev, [day]: isClosed }));
        if (isClosed) {
            setEditHoursMap(prev => ({ ...prev, [day]: [] }));
        } else if (!editHoursMap[day] || editHoursMap[day].length === 0) {
            setEditHoursMap(prev => ({ ...prev, [day]: [{ openTime: "09:00", closeTime: "18:00" }] }));
        }
    }

    async function handleSaveBusinessHours() {
        setSaving(true);
        setError("");
        try {
            // Build hours array: for multi-slot days, use the first slot as primary
            const hours: BusinessHour[] = [];
            for (let d = 0; d < 7; d++) {
                const slots = editHoursMap[d] || [];
                const isClosed = editClosedDays[d] || false;
                if (isClosed || slots.length === 0) {
                    hours.push({ dayOfWeek: d, openTime: "09:00", closeTime: "18:00", isClosed: true });
                } else {
                    // Use earliest open to latest close as the main range
                    const earliest = slots.reduce((a, b) => a.openTime < b.openTime ? a : b);
                    const latest = slots.reduce((a, b) => a.closeTime > b.closeTime ? a : b);
                    hours.push({
                        dayOfWeek: d,
                        openTime: earliest.openTime,
                        closeTime: latest.closeTime,
                        isClosed: false,
                    });
                }
            }
            await setBusinessHours(hours);
            setBusinessHoursState(hours);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "営業時間の保存に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    // ── Staff availability helpers ──

    async function openAvailabilityModal(staff: Staff) {
        setAvailabilityStaff(staff);
        setShowAvailabilityModal(true);
        setAvailSaving(false);
        setNewDayOffDate("");
        setNewDayOffReason("");
        try {
            const [avail, offs] = await Promise.all([
                getStaffAvailability(staff.id).catch(() => []),
                getStaffDayOffs(staff.id).catch(() => []),
            ]);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const normalizedAvail = (Array.isArray(avail) ? avail : []).map((a: any) => ({
                dayOfWeek: a.dayOfWeek ?? a.day_of_week,
                startTime: a.startTime || a.start_time || "09:00",
                endTime: a.endTime || a.end_time || "18:00",
            }));
            const map: Record<number, { startTime: string; endTime: string }[]> = {};
            for (let d = 0; d < 7; d++) {
                map[d] = normalizedAvail.filter((a: { dayOfWeek: number }) => a.dayOfWeek === d).map((a: { startTime: string; endTime: string }) => ({
                    startTime: a.startTime,
                    endTime: a.endTime,
                }));
            }
            setStaffAvailSlots(map);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setStaffDayOffs((Array.isArray(offs) ? offs : []).map((o: any) => ({
                id: o.id,
                staffId: o.staffId || o.staff_id,
                date: o.date,
                reason: o.reason,
                createdAt: o.createdAt || o.created_at,
            })));
        } catch {
            // Initialize empty
            const map: Record<number, { startTime: string; endTime: string }[]> = {};
            for (let d = 0; d < 7; d++) map[d] = [];
            setStaffAvailSlots(map);
            setStaffDayOffs([]);
        }
    }

    function updateAvailSlot(day: number, index: number, field: "startTime" | "endTime", value: string) {
        setStaffAvailSlots(prev => ({
            ...prev,
            [day]: (prev[day] || []).map((s, i) => i === index ? { ...s, [field]: value } : s),
        }));
    }

    function addAvailSlot(day: number) {
        setStaffAvailSlots(prev => ({
            ...prev,
            [day]: [...(prev[day] || []), { startTime: "09:00", endTime: "18:00" }],
        }));
    }

    function removeAvailSlot(day: number, index: number) {
        setStaffAvailSlots(prev => ({
            ...prev,
            [day]: (prev[day] || []).filter((_, i) => i !== index),
        }));
    }

    async function handleSaveAvailability() {
        if (!availabilityStaff) return;
        setAvailSaving(true);
        setError("");
        try {
            const slots: { dayOfWeek: number; startTime: string; endTime: string }[] = [];
            for (let d = 0; d < 7; d++) {
                for (const s of (staffAvailSlots[d] || [])) {
                    slots.push({ dayOfWeek: d, startTime: s.startTime, endTime: s.endTime });
                }
            }
            await setStaffAvailability(availabilityStaff.id, slots);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "出勤設定の保存に失敗しました");
        } finally {
            setAvailSaving(false);
        }
    }

    async function handleAddDayOff() {
        if (!availabilityStaff || !newDayOffDate) return;
        setAvailSaving(true);
        try {
            const off = await addStaffDayOff(availabilityStaff.id, newDayOffDate, newDayOffReason || undefined);
            setStaffDayOffs(prev => [...prev, off]);
            setNewDayOffDate("");
            setNewDayOffReason("");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "休み登録に失敗しました");
        } finally {
            setAvailSaving(false);
        }
    }

    async function handleDeleteDayOff(dayOffId: string) {
        if (!availabilityStaff) return;
        try {
            await deleteStaffDayOff(availabilityStaff.id, dayOffId);
            setStaffDayOffs(prev => prev.filter(o => o.id !== dayOffId));
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "休み削除に失敗しました");
        }
    }

    // ── Schedule Template actions ──

    function openAddForm(day: number) {
        setFormDay(day);
        setFormStartTime("10:00");
        setFormEndTime("11:00");
        setFormServiceId("");
        setFormStaffId("");
        setFormResourceId("");
        setFormMaxParticipants(1);
        setShowForm(true);
    }

    // When service changes, auto-set duration-based end time & max participants
    function handleServiceChange(serviceId: string) {
        setFormServiceId(serviceId);
        if (serviceId) {
            const svc = services.find((s) => s.id === serviceId);
            if (svc) {
                const [h, m] = formStartTime.split(":").map(Number);
                const endMin = h * 60 + m + svc.duration;
                const endH = String(Math.floor(endMin / 60)).padStart(2, "0");
                const endM = String(endMin % 60).padStart(2, "0");
                setFormEndTime(`${endH}:${endM}`);
                setFormMaxParticipants(svc.maxParticipants);
            }
        }
    }

    async function handleAddTemplate() {
        if (!formStartTime || !formEndTime) return;
        setSaving(true);
        setError("");
        try {
            await createScheduleTemplate({
                dayOfWeek: formDay,
                startTime: formStartTime,
                endTime: formEndTime,
                serviceId: formServiceId || undefined,
                staffId: formStaffId || undefined,
                resourceId: formResourceId || undefined,
                maxParticipants: formMaxParticipants,
            });
            setShowForm(false);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "追加に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteTemplate(id: string) {
        if (!confirm("この枠を削除しますか？")) return;
        try {
            await deleteScheduleTemplate(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "削除に失敗しました");
        }
    }

    async function handleCopyDay() {
        if (copyFrom === copyTo) {
            setError("同じ曜日にはコピーできません");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await copyDaySchedule(copyFrom, copyTo);
            setShowCopy(false);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "コピーに失敗しました");
        } finally {
            setSaving(false);
        }
    }

    // ── Staff actions ──

    async function handleAddStaff() {
        if (!staffFormName.trim()) return;
        setSaving(true);
        setError("");
        try {
            await createStaff({ name: staffFormName, role: staffFormRole || undefined });
            setShowStaffForm(false);
            setStaffFormName("");
            setStaffFormRole("");
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "追加に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteStaff(id: string) {
        if (!confirm("このスタッフを削除しますか？")) return;
        try {
            await deleteStaff(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "削除に失敗しました");
        }
    }

    // ── Resource actions ──

    async function handleAddResource() {
        if (!resourceFormName.trim()) return;
        setSaving(true);
        setError("");
        try {
            await createResource({
                name: resourceFormName,
                type: resourceFormType || undefined,
                capacity: resourceFormCapacity,
            });
            setShowResourceForm(false);
            setResourceFormName("");
            setResourceFormType("");
            setResourceFormCapacity(1);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "追加に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteResource(id: string) {
        if (!confirm("このリソースを削除しますか？")) return;
        try {
            await deleteResource(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "削除に失敗しました");
        }
    }

    // ── Group templates by day ──

    function templatesForDay(day: number) {
        return templates.filter((t) => t.dayOfWeek === day);
    }

    // ── Render ──

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">スケジュール管理</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">
                        週間スケジュールテンプレートを設定して、予約枠を管理します
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowCopy(true)}
                        className="flex items-center gap-2 border border-[#E8E8E8] hover:border-[#06C755] text-[#666666] hover:text-[#06C755] px-4 py-2.5 rounded-lg text-[14px] transition-colors"
                    >
                        <Copy size={14} />
                        曜日コピー
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mt-6 bg-[#F5F5F5] rounded-lg p-1 w-fit">
                {([
                    { key: "schedule" as Tab, label: "週間スケジュール", icon: CalendarClock },
                    { key: "calendar" as Tab, label: "カレンダー", icon: CalendarDays },
                    { key: "hours" as Tab, label: "営業時間", icon: Clock },
                    { key: "staff" as Tab, label: "スタッフ", icon: Users },
                    { key: "resources" as Tab, label: "リソース", icon: MapPin },
                ]).map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors ${
                            tab === t.key
                                ? "bg-white text-[#06C755] shadow-sm"
                                : "text-[#999999] hover:text-[#666666]"
                        }`}
                    >
                        <t.icon size={14} />
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Error */}
            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error}
                    <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* ═══ Schedule Tab ═══ */}
            {tab === "schedule" && (
                <>
                    {/* Mobile day selector */}
                    <div className="flex items-center justify-between mt-6 lg:hidden">
                        <button
                            onClick={() => setSelectedDay((selectedDay + 6) % 7)}
                            className="p-2 text-[#666666] hover:text-[#1A1A1A]"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-[16px] font-bold text-[#1A1A1A]">
                            {DAY_LABELS_FULL[selectedDay]}
                        </span>
                        <button
                            onClick={() => setSelectedDay((selectedDay + 1) % 7)}
                            className="p-2 text-[#666666] hover:text-[#1A1A1A]"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Mobile: single day */}
                    <div className="mt-4 lg:hidden">
                        <DayColumn
                            day={selectedDay}
                            templates={templatesForDay(selectedDay)}
                            onAdd={() => openAddForm(selectedDay)}
                            onDelete={handleDeleteTemplate}
                        />
                    </div>

                    {/* Desktop: 7-column grid */}
                    <div className="hidden lg:grid lg:grid-cols-7 gap-3 mt-6">
                        {[1, 2, 3, 4, 5, 6, 0].map((day) => (
                            <DayColumn
                                key={day}
                                day={day}
                                templates={templatesForDay(day)}
                                onAdd={() => openAddForm(day)}
                                onDelete={handleDeleteTemplate}
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {templates.length === 0 && (
                        <div className="text-center py-16 bg-white border border-[#E8E8E8] rounded-xl mt-6 lg:hidden">
                            <CalendarClock size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                            <p className="text-[#999999] text-[15px]">スケジュールテンプレートが未設定です</p>
                            <p className="text-[#CCCCCC] text-[13px] mt-1">
                                まず「メニュー管理」でサービスを登録してから、<br />各曜日に予約枠を追加してください
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* ═══ Calendar Tab ═══ */}
            {tab === "calendar" && (
                <>
                    {/* Day selector */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={() => setSelectedDay((selectedDay + 6) % 7)}
                            className="p-2 text-[#666666] hover:text-[#1A1A1A]"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5, 6, 0].map((day) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`w-10 h-10 rounded-lg text-[13px] font-medium transition-colors ${
                                        selectedDay === day
                                            ? "bg-[#06C755] text-white"
                                            : (day === 0 || day === 6)
                                                ? "text-[#E53935] hover:bg-[#FFF5F5]"
                                                : "text-[#666666] hover:bg-[#F5F5F5]"
                                    }`}
                                >
                                    {DAY_LABELS[day]}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setSelectedDay((selectedDay + 1) % 7)}
                            className="p-2 text-[#666666] hover:text-[#1A1A1A]"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <ScheduleCalendar
                        selectedDay={selectedDay}
                        templates={templates}
                        staffList={staffList}
                        services={services}
                        onAddTemplate={(day, staffId) => {
                            openAddForm(day);
                            if (staffId) setFormStaffId(staffId);
                        }}
                        onDeleteTemplate={handleDeleteTemplate}
                    />
                </>
            )}

            {/* ═══ Business Hours Tab ═══ */}
            {tab === "hours" && (
                <div className="mt-6">
                    <div className="bg-white border border-[#E8E8E8] rounded-xl p-6 shadow-sm">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] mb-1">営業時間の設定</h2>
                        <p className="text-[12px] text-[#999999] mb-5">各曜日の営業時間を設定します。1曜日に複数の時間帯を追加できます。</p>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                                const isClosed = editClosedDays[d] || false;
                                const slots = editHoursMap[d] || [];
                                return (
                                    <div key={d} className="border border-[#F0F0F0] rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`w-10 text-[14px] font-bold ${d === 0 ? "text-[#E53935]" : d === 6 ? "text-[#2196F3]" : "text-[#1A1A1A]"}`}>
                                                {DAY_LABELS_FULL[d]}
                                            </span>
                                            <label className="flex items-center gap-2 cursor-pointer ml-auto">
                                                <input
                                                    type="checkbox"
                                                    checked={isClosed}
                                                    onChange={(e) => toggleClosed(d, e.target.checked)}
                                                    className="w-4 h-4 accent-[#E53935]"
                                                />
                                                <span className="text-[13px] text-[#999999]">定休日</span>
                                            </label>
                                        </div>
                                        {!isClosed && (
                                            <div className="space-y-2 ml-0 sm:ml-12">
                                                {slots.map((slot, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 flex-wrap">
                                                        <input
                                                            type="time"
                                                            value={slot.openTime}
                                                            onChange={(e) => updateSlot(d, idx, "openTime", e.target.value)}
                                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none"
                                                        />
                                                        <span className="text-[#999999] text-[14px]">〜</span>
                                                        <input
                                                            type="time"
                                                            value={slot.closeTime}
                                                            onChange={(e) => updateSlot(d, idx, "closeTime", e.target.value)}
                                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => removeSlotFromDay(d, idx)}
                                                            className="text-[#CCCCCC] hover:text-[#E53935] transition-colors p-1"
                                                            title="この枠を削除"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => addSlotToDay(d)}
                                                    className="flex items-center gap-1 text-[12px] text-[#06C755] hover:text-[#05B04A] transition-colors py-1"
                                                >
                                                    <Plus size={12} />
                                                    枠を追加
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-3 mt-6 justify-end">
                            <button
                                onClick={handleSaveBusinessHours}
                                disabled={saving}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors"
                            >
                                <Save size={14} />
                                {saving ? "保存中..." : "営業時間を保存"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ Staff Tab ═══ */}
            {tab === "staff" && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[14px] text-[#666666]">予約枠に紐づけるスタッフを管理します</p>
                        <button
                            onClick={() => setShowStaffForm(true)}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                        >
                            <Plus size={16} />
                            スタッフ追加
                        </button>
                    </div>

                    {showStaffForm && (
                        <div className="bg-white border border-[#06C755]/30 rounded-xl p-6 shadow-sm mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[16px] font-bold text-[#1A1A1A]">新しいスタッフ</h2>
                                <button onClick={() => setShowStaffForm(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">名前 *</label>
                                    <input type="text" value={staffFormName} onChange={(e) => setStaffFormName(e.target.value)}
                                        placeholder="山田 太郎"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">役割</label>
                                    <input type="text" value={staffFormRole} onChange={(e) => setStaffFormRole(e.target.value)}
                                        placeholder="スタイリスト、講師 等"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-5 justify-end">
                                <button onClick={() => setShowStaffForm(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">キャンセル</button>
                                <button onClick={handleAddStaff} disabled={saving || !staffFormName.trim()}
                                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors">
                                    <Save size={14} /> {saving ? "保存中..." : "追加"}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {staffList.length === 0 ? (
                            <div className="text-center py-16 bg-white border border-[#E8E8E8] rounded-xl">
                                <Users size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                                <p className="text-[#999999] text-[15px]">スタッフが登録されていません</p>
                            </div>
                        ) : staffList.map((s) => (
                            <div key={s.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                                <div className="w-9 h-9 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[13px] font-bold text-[#06C755]">
                                    {s.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-bold text-[#1A1A1A]">{s.name}</p>
                                    {s.role && <p className="text-[13px] text-[#999999]">{s.role}</p>}
                                </div>
                                <button
                                    onClick={() => openAvailabilityModal(s)}
                                    className="flex items-center gap-1.5 text-[13px] text-[#06C755] border border-[#06C755]/30 hover:bg-[#06C755]/5 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    <Calendar size={13} />
                                    出勤設定
                                </button>
                                <button onClick={() => handleDeleteStaff(s.id)}
                                    className="text-[#CCCCCC] hover:text-[#E53935] transition-colors p-1.5" title="削除">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ Resources Tab ═══ */}
            {tab === "resources" && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[14px] text-[#666666]">部屋、席、機材などのリソースを管理します</p>
                        <button
                            onClick={() => setShowResourceForm(true)}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                        >
                            <Plus size={16} />
                            リソース追加
                        </button>
                    </div>

                    {showResourceForm && (
                        <div className="bg-white border border-[#06C755]/30 rounded-xl p-6 shadow-sm mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[16px] font-bold text-[#1A1A1A]">新しいリソース</h2>
                                <button onClick={() => setShowResourceForm(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">名前 *</label>
                                    <input type="text" value={resourceFormName} onChange={(e) => setResourceFormName(e.target.value)}
                                        placeholder="テーブルA、個室1 等"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">タイプ</label>
                                    <input type="text" value={resourceFormType} onChange={(e) => setResourceFormType(e.target.value)}
                                        placeholder="テーブル、個室、カウンター 等"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">収容人数</label>
                                    <input type="number" value={resourceFormCapacity} onChange={(e) => setResourceFormCapacity(Number(e.target.value))} min={1} max={100}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-5 justify-end">
                                <button onClick={() => setShowResourceForm(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">キャンセル</button>
                                <button onClick={handleAddResource} disabled={saving || !resourceFormName.trim()}
                                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors">
                                    <Save size={14} /> {saving ? "保存中..." : "追加"}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        {resourceList.length === 0 ? (
                            <div className="text-center py-16 bg-white border border-[#E8E8E8] rounded-xl">
                                <MapPin size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                                <p className="text-[#999999] text-[15px]">リソースが登録されていません</p>
                            </div>
                        ) : resourceList.map((r) => (
                            <div key={r.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                                <div className="w-9 h-9 rounded-lg bg-[#F0F0F0] flex items-center justify-center">
                                    <MapPin size={16} className="text-[#999999]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-bold text-[#1A1A1A]">{r.name}</p>
                                    <div className="flex items-center gap-3 text-[13px] text-[#666666] mt-0.5">
                                        {r.type && <span>{r.type}</span>}
                                        <span>収容 {r.capacity}名</span>
                                    </div>
                                </div>
                                <button onClick={() => handleDeleteResource(r.id)}
                                    className="text-[#CCCCCC] hover:text-[#E53935] transition-colors p-1.5" title="削除">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ Add Template Modal ═══ */}
            {showForm && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                                予約枠を追加 — {DAY_LABELS_FULL[formDay]}
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">開始時刻</label>
                                    <input type="time" value={formStartTime}
                                        onChange={(e) => setFormStartTime(e.target.value)}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">終了時刻</label>
                                    <input type="time" value={formEndTime}
                                        onChange={(e) => setFormEndTime(e.target.value)}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">メニュー</label>
                                <select value={formServiceId} onChange={(e) => handleServiceChange(e.target.value)}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    <option value="">指定なし</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}（{s.duration}分 / {s.price > 0 ? `¥${s.price.toLocaleString()}` : "無料"}）</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">担当スタッフ（推奨）</label>
                                <select value={formStaffId} onChange={(e) => setFormStaffId(e.target.value)}
                                    className={`w-full bg-[#F9FAFB] border rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none ${!formStaffId ? "border-[#FFB800]" : "border-[#E8E8E8]"}`}>
                                    <option value="">指定なし</option>
                                    {staffList.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}{s.role ? ` (${s.role})` : ""}</option>
                                    ))}
                                </select>
                                {!formStaffId && (
                                    <p className="text-[11px] text-[#FFB800] mt-1 flex items-center gap-1">
                                        <AlertTriangle size={11} />
                                        スタッフを指定すると予約管理がしやすくなります
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">リソース</label>
                                <select value={formResourceId} onChange={(e) => setFormResourceId(e.target.value)}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    <option value="">指定なし</option>
                                    {resourceList.map((r) => (
                                        <option key={r.id} value={r.id}>{r.name}{r.type ? ` (${r.type})` : ""}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">同時受付人数</label>
                                <input type="number" value={formMaxParticipants}
                                    onChange={(e) => setFormMaxParticipants(Number(e.target.value))} min={1} max={100}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">前バッファ（分）</label>
                                    <input type="number" value={formBufferBefore}
                                        onChange={(e) => setFormBufferBefore(Number(e.target.value))} min={0} max={120}
                                        placeholder="0"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">後バッファ（分）</label>
                                    <input type="number" value={formBufferAfter}
                                        onChange={(e) => setFormBufferAfter(Number(e.target.value))} min={0} max={120}
                                        placeholder="0"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                            </div>
                            {(formBufferBefore > 0 || formBufferAfter > 0) && (
                                <p className="text-[11px] text-[#999999]">
                                    準備・片付け時間として前後にバッファを設けます
                                </p>
                            )}
                        </div>
                        <div className="flex gap-3 mt-6 justify-end">
                            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">
                                キャンセル
                            </button>
                            <button onClick={handleAddTemplate} disabled={saving}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors">
                                <Save size={14} /> {saving ? "保存中..." : "追加"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ Copy Day Modal ═══ */}
            {showCopy && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">曜日スケジュールをコピー</h2>
                            <button onClick={() => setShowCopy(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">コピー元</label>
                                <select value={copyFrom} onChange={(e) => setCopyFrom(Number(e.target.value))}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                                        <option key={d} value={d}>{DAY_LABELS_FULL[d]}（{templatesForDay(d).length}枠）</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">コピー先</label>
                                <select value={copyTo} onChange={(e) => setCopyTo(Number(e.target.value))}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                                        <option key={d} value={d}>{DAY_LABELS_FULL[d]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6 justify-end">
                            <button onClick={() => setShowCopy(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">
                                キャンセル
                            </button>
                            <button onClick={handleCopyDay} disabled={saving || copyFrom === copyTo}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors">
                                <Copy size={14} /> {saving ? "コピー中..." : "コピー"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ Staff Availability Modal ═══ */}
            {showAvailabilityModal && availabilityStaff && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl my-8">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                                出勤設定 — {availabilityStaff.name}
                            </h2>
                            <button onClick={() => setShowAvailabilityModal(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>

                        {/* Weekly availability */}
                        <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <Clock size={14} className="text-[#06C755]" />
                            曜日別出勤時間
                        </h3>
                        <div className="space-y-3 mb-6">
                            {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                                const slots = staffAvailSlots[d] || [];
                                return (
                                    <div key={d} className="flex items-start gap-3">
                                        <span className={`w-8 pt-2 text-[13px] font-bold shrink-0 ${d === 0 ? "text-[#E53935]" : d === 6 ? "text-[#2196F3]" : "text-[#1A1A1A]"}`}>
                                            {DAY_LABELS[d]}
                                        </span>
                                        <div className="flex-1 space-y-1.5">
                                            {slots.length === 0 && (
                                                <span className="text-[12px] text-[#CCCCCC] py-2 block">休み</span>
                                            )}
                                            {slots.map((slot, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <input
                                                        type="time"
                                                        value={slot.startTime}
                                                        onChange={(e) => updateAvailSlot(d, idx, "startTime", e.target.value)}
                                                        className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-2 py-1.5 text-[13px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none w-[100px]"
                                                    />
                                                    <span className="text-[#999999] text-[13px]">〜</span>
                                                    <input
                                                        type="time"
                                                        value={slot.endTime}
                                                        onChange={(e) => updateAvailSlot(d, idx, "endTime", e.target.value)}
                                                        className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-2 py-1.5 text-[13px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none w-[100px]"
                                                    />
                                                    <button onClick={() => removeAvailSlot(d, idx)} className="text-[#CCCCCC] hover:text-[#E53935] p-0.5">
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button onClick={() => addAvailSlot(d)} className="flex items-center gap-1 text-[11px] text-[#06C755] hover:text-[#05B04A] py-0.5">
                                                <Plus size={10} /> 追加
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleSaveAvailability}
                                disabled={availSaving}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-[13px] transition-colors"
                            >
                                <Save size={13} /> {availSaving ? "保存中..." : "出勤時間を保存"}
                            </button>
                        </div>

                        {/* Day offs */}
                        <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2 border-t border-[#F0F0F0] pt-5">
                            <Calendar size={14} className="text-[#E53935]" />
                            休み登録
                        </h3>
                        <div className="flex items-end gap-2 mb-4 flex-wrap">
                            <div>
                                <label className="block text-[12px] text-[#666666] mb-1">日付</label>
                                <input
                                    type="date"
                                    value={newDayOffDate}
                                    onChange={(e) => setNewDayOffDate(e.target.value)}
                                    className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[12px] text-[#666666] mb-1">理由（任意）</label>
                                <input
                                    type="text"
                                    value={newDayOffReason}
                                    onChange={(e) => setNewDayOffReason(e.target.value)}
                                    placeholder="体調不良 等"
                                    className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none w-[160px]"
                                />
                            </div>
                            <button
                                onClick={handleAddDayOff}
                                disabled={availSaving || !newDayOffDate}
                                className="flex items-center gap-1 bg-[#E53935] hover:bg-[#D32F2F] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-[13px] transition-colors"
                            >
                                <Plus size={13} /> 休み追加
                            </button>
                        </div>

                        {staffDayOffs.length > 0 && (
                            <div className="space-y-2">
                                {staffDayOffs.sort((a, b) => a.date.localeCompare(b.date)).map((off) => (
                                    <div key={off.id} className="flex items-center gap-3 bg-[#FFF5F5] border border-[#FFCDD2] rounded-lg px-3 py-2">
                                        <span className="text-[13px] font-bold text-[#E53935]">{off.date}</span>
                                        {off.reason && <span className="text-[12px] text-[#999999]">{off.reason}</span>}
                                        <button onClick={() => handleDeleteDayOff(off.id)} className="ml-auto text-[#CCCCCC] hover:text-[#E53935] p-0.5">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end mt-5">
                            <button
                                onClick={() => setShowAvailabilityModal(false)}
                                className="px-4 py-2 text-[14px] text-[#999999] hover:text-[#1A1A1A] transition-colors"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Day Column Component ──

function DayColumn({ day, templates, onAdd, onDelete }: {
    day: number;
    templates: ScheduleTemplate[];
    onAdd: () => void;
    onDelete: (id: string) => void;
}) {
    const isWeekend = day === 0 || day === 6;

    return (
        <div className={`bg-white border rounded-xl overflow-hidden ${isWeekend ? "border-[#FFE0E0]" : "border-[#E8E8E8]"}`}>
            {/* Day header */}
            <div className={`px-3 py-2.5 text-center text-[13px] font-bold border-b ${
                isWeekend
                    ? "bg-[#FFF5F5] text-[#E53935] border-[#FFE0E0]"
                    : "bg-[#F9FAFB] text-[#1A1A1A] border-[#E8E8E8]"
            }`}>
                {DAY_LABELS[day]}
                {templates.length > 0 && (
                    <span className="ml-1.5 text-[11px] text-[#999999] font-normal">
                        {templates.length}枠
                    </span>
                )}
            </div>

            {/* Slots */}
            <div className="p-2 space-y-1.5 min-h-[120px]">
                {templates.length === 0 ? (
                    <p className="text-[12px] text-[#CCCCCC] text-center py-6">枠なし</p>
                ) : (
                    templates.map((t) => (
                        <div key={t.id} className="group bg-[#F9FAFB] hover:bg-[#06C755]/5 rounded-lg p-2 text-[12px] transition-colors relative">
                            <div className="font-bold text-[#1A1A1A]">
                                {t.startTime}〜{t.endTime}
                            </div>
                            {t.serviceName && t.serviceName !== "予約枠" && (
                                <div className="text-[#06C755] font-medium mt-0.5 truncate">{t.serviceName}</div>
                            )}
                            {t.staffName && (
                                <div className="text-[#999999] truncate">{t.staffName}</div>
                            )}
                            {t.resourceName && (
                                <div className="text-[#999999] truncate">{t.resourceName}</div>
                            )}
                            <div className="text-[#AAAAAA] mt-0.5">
                                定員 {t.maxParticipants}名
                            </div>
                            <button
                                onClick={() => onDelete(t.id)}
                                className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 text-[#CCCCCC] hover:text-[#E53935] transition-all p-0.5"
                                title="削除"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add button */}
            <div className="px-2 pb-2">
                <button
                    onClick={onAdd}
                    className="w-full flex items-center justify-center gap-1 text-[12px] text-[#06C755] hover:bg-[#06C755]/5 rounded-lg py-2 transition-colors"
                >
                    <Plus size={12} />
                    追加
                </button>
            </div>
        </div>
    );
}
