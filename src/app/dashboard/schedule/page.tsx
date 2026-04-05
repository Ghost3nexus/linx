"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getScheduleTemplates,
    createScheduleTemplate,
    updateScheduleTemplate,
    deleteScheduleTemplate,
    copyDaySchedule,
    getServices,
    getStaff,
    getResources,
    createStaff,
    deleteStaff,
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
    type StaffDayOff,
} from "@/lib/apiClient";
import {
    Plus, X, Trash2, Copy, Save, Users, Clock, Calendar,
    AlertTriangle, Settings, ChevronRight, MessageSquare, Edit3,
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

// ── Service color helper ──
function getServiceColor(serviceName?: string): string {
    if (!serviceName) return "#06C755";
    const name = serviceName.toLowerCase();
    if (name.includes("体験")) return "#06C755";
    if (name.includes("セミ")) return "#2196F3";
    if (name.includes("マンツーマン") || (name.includes("パーソナル") && !name.includes("セミ"))) return "#9C27B0";
    if (name.includes("グループ")) return "#F59E0B";
    return "#06C755";
}

export default function SchedulePage() {
    // ── State ──
    const [templates, setTemplates] = useState<ScheduleTemplate[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [resourceList, setResourceList] = useState<Resource[]>([]);
    const [businessHours, setBusinessHoursState] = useState<BusinessHour[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // Day selection (calendar)
    const [selectedDay, setSelectedDay] = useState(() => {
        const today = new Date().getDay();
        return today === 0 ? 0 : today; // Use today's day of week
    });

    // Panels
    const [showStaffPanel, setShowStaffPanel] = useState(false);
    const [showHoursPanel, setShowHoursPanel] = useState(false);

    // Add/Edit template modal
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<ScheduleTemplate | null>(null);
    const [formDay, setFormDay] = useState(1);
    const [formStartTime, setFormStartTime] = useState("10:00");
    const [formEndTime, setFormEndTime] = useState("11:00");
    const [formServiceId, setFormServiceId] = useState("");
    const [formStaffId, setFormStaffId] = useState("");
    const [formResourceId, setFormResourceId] = useState("");
    const [formMaxParticipants, setFormMaxParticipants] = useState(1);
    const [formBufferBefore, setFormBufferBefore] = useState(0);
    const [formBufferAfter, setFormBufferAfter] = useState(0);

    // Copy day modal
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [copyFrom, setCopyFrom] = useState(1);
    const [copyTo, setCopyTo] = useState(2);

    // Staff form
    const [showStaffForm, setShowStaffForm] = useState(false);
    const [staffFormName, setStaffFormName] = useState("");
    const [staffFormRole, setStaffFormRole] = useState("");
    const [staffFormEmail, setStaffFormEmail] = useState("");
    const [staffFormLineId, setStaffFormLineId] = useState("");

    // Business hours editor
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

    // ── Data loading ──
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
                closeTime: h.closeTime || h.close_time || "22:00",
                isClosed: h.isClosed ?? h.is_closed ?? false,
                slotDuration: h.slotDuration ?? h.slot_duration ?? 30,
            } as BusinessHour));
            if (normalizedHours.length > 0) {
                setBusinessHoursState(normalizedHours);
            }
            initEditHoursFromBH(normalizedHours.length > 0 ? normalizedHours : defaultBusinessHours());
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to load data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    function defaultBusinessHours(): BusinessHour[] {
        return DAY_LABELS.map((_, i) => ({
            dayOfWeek: i,
            openTime: "09:00",
            closeTime: "22:00",
            isClosed: false,
            slotDuration: 30,
        }));
    }

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
                closed[d] = false;
                map[d] = [{ openTime: "09:00", closeTime: "22:00" }];
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
            setEditHoursMap(prev => ({ ...prev, [day]: [{ openTime: "09:00", closeTime: "22:00" }] }));
        }
    }

    async function handleSaveBusinessHours() {
        setSaving(true);
        setError("");
        try {
            const hours: BusinessHour[] = [];
            for (let d = 0; d < 7; d++) {
                const slots = editHoursMap[d] || [];
                const isClosed = editClosedDays[d] || false;
                if (isClosed || slots.length === 0) {
                    hours.push({ dayOfWeek: d, openTime: "09:00", closeTime: "22:00", isClosed: true });
                } else {
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
            setShowHoursPanel(false);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to save business hours");
        } finally {
            setSaving(false);
        }
    }

    // ── Staff availability ──
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
            setError(e instanceof Error ? e.message : "Failed to save availability");
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
            setError(e instanceof Error ? e.message : "Failed to add day off");
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
            setError(e instanceof Error ? e.message : "Failed to delete day off");
        }
    }

    // ── Template actions ──
    function openAddTemplateModal(day: number, staffId?: string) {
        setEditingTemplate(null);
        setFormDay(day);
        setFormStartTime("10:00");
        setFormEndTime("11:00");
        setFormServiceId("");
        setFormStaffId(staffId || "");
        setFormResourceId("");
        setFormMaxParticipants(1);
        setFormBufferBefore(0);
        setFormBufferAfter(0);
        setShowTemplateModal(true);
    }

    function openEditTemplateModal(template: ScheduleTemplate) {
        setEditingTemplate(template);
        setFormDay(template.dayOfWeek);
        setFormStartTime(template.startTime);
        setFormEndTime(template.endTime);
        setFormServiceId(template.serviceId || "");
        setFormStaffId(template.staffId || "");
        setFormResourceId(template.resourceId || "");
        setFormMaxParticipants(template.maxParticipants);
        setFormBufferBefore(0);
        setFormBufferAfter(0);
        setShowTemplateModal(true);
    }

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

    async function handleSaveTemplate() {
        if (!formStartTime || !formEndTime) return;
        setSaving(true);
        setError("");
        try {
            if (editingTemplate) {
                await updateScheduleTemplate(editingTemplate.id, {
                    dayOfWeek: formDay,
                    startTime: formStartTime,
                    endTime: formEndTime,
                    serviceId: formServiceId || undefined,
                    staffId: formStaffId || undefined,
                    resourceId: formResourceId || undefined,
                    maxParticipants: formMaxParticipants,
                });
            } else {
                await createScheduleTemplate({
                    dayOfWeek: formDay,
                    startTime: formStartTime,
                    endTime: formEndTime,
                    serviceId: formServiceId || undefined,
                    staffId: formStaffId || undefined,
                    resourceId: formResourceId || undefined,
                    maxParticipants: formMaxParticipants,
                });
            }
            setShowTemplateModal(false);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to save template");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteTemplate(id: string) {
        try {
            await deleteScheduleTemplate(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to delete template");
        }
    }

    async function handleCopyDay() {
        if (copyFrom === copyTo) { setError("Same day selected"); return; }
        setSaving(true);
        setError("");
        try {
            await copyDaySchedule(copyFrom, copyTo);
            setShowCopyModal(false);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to copy schedule");
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
            await createStaff({
                name: staffFormName,
                role: staffFormRole || undefined,
                email: staffFormEmail || undefined,
                lineUserId: staffFormLineId || undefined,
            });
            setShowStaffForm(false);
            setStaffFormName("");
            setStaffFormRole("");
            setStaffFormEmail("");
            setStaffFormLineId("");
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to add staff");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteStaff(id: string) {
        if (!confirm("Delete this staff?")) return;
        try {
            await deleteStaff(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Failed to delete staff");
        }
    }

    // ── Helpers ──
    function getBusinessHoursForDay(day: number): BusinessHour | undefined {
        return businessHours.find(h => h.dayOfWeek === day);
    }

    const dayTemplateCount = (day: number) => templates.filter(t => t.dayOfWeek === day).length;

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
            {/* ── Header ── */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">Schedule</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">
                        Staff x Time calendar for weekly schedule templates
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowCopyModal(true)}
                        className="flex items-center gap-2 border border-[#E8E8E8] hover:border-[#06C755] text-[#666666] hover:text-[#06C755] px-3 py-2 rounded-xl text-[13px] transition-colors"
                    >
                        <Copy size={14} />
                        Copy Day
                    </button>
                    <button
                        onClick={() => setShowHoursPanel(!showHoursPanel)}
                        className={`flex items-center gap-2 border px-3 py-2 rounded-xl text-[13px] transition-colors ${
                            showHoursPanel
                                ? "border-[#06C755] text-[#06C755] bg-[#06C755]/5"
                                : "border-[#E8E8E8] text-[#666666] hover:border-[#06C755] hover:text-[#06C755]"
                        }`}
                    >
                        <Clock size={14} />
                        Hours
                    </button>
                    <button
                        onClick={() => setShowStaffPanel(!showStaffPanel)}
                        className={`flex items-center gap-2 border px-3 py-2 rounded-xl text-[13px] transition-colors ${
                            showStaffPanel
                                ? "border-[#06C755] text-[#06C755] bg-[#06C755]/5"
                                : "border-[#E8E8E8] text-[#666666] hover:border-[#06C755] hover:text-[#06C755]"
                        }`}
                    >
                        <Users size={14} />
                        Staff
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-xl p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error}
                    <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* ── Business Hours Panel (collapsible) ── */}
            {showHoursPanel && (
                <div className="mt-4 bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] flex items-center gap-2">
                            <Clock size={16} className="text-[#06C755]" />
                            Business Hours
                        </h2>
                        <button onClick={() => setShowHoursPanel(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                            const isClosed = editClosedDays[d] || false;
                            const slots = editHoursMap[d] || [];
                            return (
                                <div key={d} className={`border rounded-xl p-3 ${isClosed ? "border-[#FFE0E0] bg-[#FFF8F8]" : "border-[#F0F0F0]"}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[13px] font-bold ${d === 0 ? "text-[#E53935]" : d === 6 ? "text-[#2196F3]" : "text-[#1A1A1A]"}`}>
                                            {DAY_LABELS[d]}
                                        </span>
                                        <label className="flex items-center gap-1.5 cursor-pointer">
                                            <input type="checkbox" checked={isClosed} onChange={(e) => toggleClosed(d, e.target.checked)} className="w-3.5 h-3.5 accent-[#E53935]" />
                                            <span className="text-[11px] text-[#999999]">Off</span>
                                        </label>
                                    </div>
                                    {!isClosed && (
                                        <div className="space-y-1.5">
                                            {slots.map((slot, idx) => (
                                                <div key={idx} className="flex items-center gap-1">
                                                    <input type="time" value={slot.openTime} onChange={(e) => updateSlot(d, idx, "openTime", e.target.value)}
                                                        className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-2 py-1 text-[12px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none w-[90px]" />
                                                    <span className="text-[#CCCCCC] text-[11px]">-</span>
                                                    <input type="time" value={slot.closeTime} onChange={(e) => updateSlot(d, idx, "closeTime", e.target.value)}
                                                        className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-2 py-1 text-[12px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none w-[90px]" />
                                                    <button onClick={() => removeSlotFromDay(d, idx)} className="text-[#CCCCCC] hover:text-[#E53935] p-0.5"><Trash2 size={11} /></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addSlotToDay(d)} className="flex items-center gap-1 text-[11px] text-[#06C755] hover:text-[#05B04A] py-0.5">
                                                <Plus size={10} /> Add
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={handleSaveBusinessHours} disabled={saving}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-[13px] transition-colors">
                            <Save size={13} /> {saving ? "Saving..." : "Save Hours"}
                        </button>
                    </div>
                </div>
            )}

            {/* ── Staff Panel (collapsible) ── */}
            {showStaffPanel && (
                <div className="mt-4 bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-sm animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A] flex items-center gap-2">
                            <Users size={16} className="text-[#06C755]" />
                            Staff Management
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowStaffForm(!showStaffForm)}
                                className="flex items-center gap-1.5 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-3 py-1.5 rounded-lg text-[12px] transition-colors"
                            >
                                <Plus size={12} /> Add Staff
                            </button>
                            <button onClick={() => setShowStaffPanel(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                        </div>
                    </div>

                    {showStaffForm && (
                        <div className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl p-4 mb-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input type="text" value={staffFormName} onChange={(e) => setStaffFormName(e.target.value)}
                                    placeholder="名前 *" className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                <input type="text" value={staffFormRole} onChange={(e) => setStaffFormRole(e.target.value)}
                                    placeholder="役職（任意）" className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                <input type="email" value={staffFormEmail} onChange={(e) => setStaffFormEmail(e.target.value)}
                                    placeholder="メールアドレス（任意）" className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                <input type="text" value={staffFormLineId} onChange={(e) => setStaffFormLineId(e.target.value)}
                                    placeholder="LINE User ID（通知用）" className="bg-white border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button onClick={handleAddStaff} disabled={saving || !staffFormName.trim()}
                                    className="bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-[12px] transition-colors">
                                    {saving ? "..." : "追加"}
                                </button>
                                <button onClick={() => setShowStaffForm(false)} className="text-[#999999] hover:text-[#1A1A1A] px-2">
                                    <X size={14} />
                                </button>
                            </div>
                            <p className="text-[11px] text-[#999999] mt-2">※ LINE User IDを設定すると、予約が入った時にスタッフへ自動通知されます</p>
                        </div>
                    )}

                    {staffList.length === 0 ? (
                        <div className="text-center py-8 text-[#999999]">
                            <MessageSquare size={32} className="mx-auto mb-2 text-[#E0E0E0]" />
                            <p className="text-[14px]">No staff registered</p>
                            <p className="text-[12px] text-[#CCCCCC] mt-1">LINE: Send &quot;Staff Registration&quot; to add staff</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {staffList.map((s) => (
                                <div key={s.id} className="border border-[#E8E8E8] rounded-xl p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                                    <div className="w-8 h-8 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[12px] font-bold text-[#06C755] shrink-0">
                                        {s.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-bold text-[#1A1A1A] truncate">{s.name}</p>
                                        {s.role && <p className="text-[11px] text-[#999999]">{s.role}</p>}
                                        {s.lineUserId && <p className="text-[10px] text-[#06C755]">LINE通知ON</p>}
                                    </div>
                                    <button onClick={() => openAvailabilityModal(s)}
                                        className="text-[#06C755] hover:bg-[#06C755]/5 p-1.5 rounded-lg transition-colors" title="Availability">
                                        <Settings size={14} />
                                    </button>
                                    <button onClick={() => handleDeleteStaff(s.id)}
                                        className="text-[#CCCCCC] hover:text-[#E53935] p-1.5 transition-colors" title="Delete">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── Day Selector ── */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 0].map((day) => {
                    const bh = getBusinessHoursForDay(day);
                    const isClosed = bh?.isClosed;
                    const count = dayTemplateCount(day);
                    return (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`relative flex flex-col items-center min-w-[48px] px-2 py-2 rounded-xl text-[13px] font-medium transition-all ${
                                selectedDay === day
                                    ? "bg-[#06C755] text-white shadow-md shadow-[#06C755]/20"
                                    : isClosed
                                        ? "text-[#CCCCCC] bg-[#F9FAFB] hover:bg-[#F0F0F0]"
                                        : (day === 0 || day === 6)
                                            ? "text-[#E53935] hover:bg-[#FFF5F5]"
                                            : "text-[#666666] hover:bg-[#F5F5F5]"
                            }`}
                        >
                            <span className="text-[14px] font-bold">{DAY_LABELS[day]}</span>
                            {count > 0 && (
                                <span className={`text-[10px] mt-0.5 ${selectedDay === day ? "text-white/80" : "text-[#999999]"}`}>
                                    {count}
                                </span>
                            )}
                            {isClosed && selectedDay !== day && (
                                <span className="text-[9px] text-[#CCCCCC]">OFF</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── Calendar View (Main Content) ── */}
            <ScheduleCalendar
                selectedDay={selectedDay}
                templates={templates}
                staffList={staffList}
                services={services}
                businessHours={businessHours}
                onAddTemplate={(day, staffId) => openAddTemplateModal(day, staffId)}
                onEditTemplate={openEditTemplateModal}
                onDeleteTemplate={handleDeleteTemplate}
            />

            {/* ── Add/Edit Template Modal ── */}
            {showTemplateModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowTemplateModal(false)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                                {editingTemplate ? "Edit Slot" : "Add Slot"} - {DAY_LABELS_FULL[formDay]}
                            </h2>
                            <button onClick={() => setShowTemplateModal(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">Start</label>
                                    <input type="time" value={formStartTime} onChange={(e) => setFormStartTime(e.target.value)}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">End</label>
                                    <input type="time" value={formEndTime} onChange={(e) => setFormEndTime(e.target.value)}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">Service</label>
                                <select value={formServiceId} onChange={(e) => handleServiceChange(e.target.value)}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    <option value="">None</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({s.duration}min / {s.price > 0 ? `${s.price.toLocaleString()}` : "Free"})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">Staff</label>
                                <select value={formStaffId} onChange={(e) => setFormStaffId(e.target.value)}
                                    className={`w-full bg-[#F9FAFB] border rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none ${!formStaffId ? "border-[#FFB800]" : "border-[#E8E8E8]"}`}>
                                    <option value="">Unassigned</option>
                                    {staffList.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}{s.role ? ` (${s.role})` : ""}</option>
                                    ))}
                                </select>
                                {!formStaffId && (
                                    <p className="text-[11px] text-[#FFB800] mt-1 flex items-center gap-1">
                                        <AlertTriangle size={11} /> Assign a staff member for better management
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">Resource</label>
                                <select value={formResourceId} onChange={(e) => setFormResourceId(e.target.value)}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    <option value="">None</option>
                                    {resourceList.map((r) => (
                                        <option key={r.id} value={r.id}>{r.name}{r.type ? ` (${r.type})` : ""}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">Max Participants</label>
                                    <input type="number" value={formMaxParticipants}
                                        onChange={(e) => setFormMaxParticipants(Number(e.target.value))} min={1} max={100}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">Buffer Before</label>
                                    <input type="number" value={formBufferBefore}
                                        onChange={(e) => setFormBufferBefore(Number(e.target.value))} min={0} max={120}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5">Buffer After</label>
                                    <input type="number" value={formBufferAfter}
                                        onChange={(e) => setFormBufferAfter(Number(e.target.value))} min={0} max={120}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                </div>
                            </div>
                            {formServiceId && (
                                <div className="flex items-center gap-2 p-3 bg-[#F0FFF4] border border-[#06C755]/20 rounded-xl">
                                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: getServiceColor(services.find(s => s.id === formServiceId)?.name) }} />
                                    <span className="text-[12px] text-[#1A1A1A] font-medium">
                                        {services.find(s => s.id === formServiceId)?.name}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 mt-6 justify-end">
                            {editingTemplate && (
                                <button
                                    onClick={() => {
                                        if (confirm("Delete this slot?")) {
                                            handleDeleteTemplate(editingTemplate.id);
                                            setShowTemplateModal(false);
                                        }
                                    }}
                                    className="flex items-center gap-1.5 text-[#E53935] hover:bg-[#E53935]/5 px-4 py-2.5 rounded-xl text-[13px] transition-colors mr-auto"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            )}
                            <button onClick={() => setShowTemplateModal(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">Cancel</button>
                            <button onClick={handleSaveTemplate} disabled={saving}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-[14px] transition-colors">
                                <Save size={14} /> {saving ? "Saving..." : editingTemplate ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Copy Day Modal ── */}
            {showCopyModal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setShowCopyModal(false)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">Copy Schedule</h2>
                            <button onClick={() => setShowCopyModal(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">From</label>
                                <select value={copyFrom} onChange={(e) => setCopyFrom(Number(e.target.value))}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                                        <option key={d} value={d}>{DAY_LABELS_FULL[d]} ({dayTemplateCount(d)} slots)</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-center"><ChevronRight size={20} className="text-[#CCCCCC] rotate-90" /></div>
                            <div>
                                <label className="block text-[13px] text-[#666666] mb-1.5">To</label>
                                <select value={copyTo} onChange={(e) => setCopyTo(Number(e.target.value))}
                                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                    {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                                        <option key={d} value={d}>{DAY_LABELS_FULL[d]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6 justify-end">
                            <button onClick={() => setShowCopyModal(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">Cancel</button>
                            <button onClick={handleCopyDay} disabled={saving || copyFrom === copyTo}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-[14px] transition-colors">
                                <Copy size={14} /> {saving ? "Copying..." : "Copy"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Staff Availability Modal ── */}
            {showAvailabilityModal && availabilityStaff && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowAvailabilityModal(false)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl my-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">
                                {availabilityStaff.name} - Availability
                            </h2>
                            <button onClick={() => setShowAvailabilityModal(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>

                        {/* Weekly availability */}
                        <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                            <Clock size={14} className="text-[#06C755]" />
                            Weekly Schedule
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
                                            {slots.length === 0 && <span className="text-[12px] text-[#CCCCCC] py-2 block">Day off</span>}
                                            {slots.map((slot, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <input type="time" value={slot.startTime} onChange={(e) => updateAvailSlot(d, idx, "startTime", e.target.value)}
                                                        className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-2 py-1.5 text-[13px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none w-[100px]" />
                                                    <span className="text-[#999999] text-[13px]">-</span>
                                                    <input type="time" value={slot.endTime} onChange={(e) => updateAvailSlot(d, idx, "endTime", e.target.value)}
                                                        className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-2 py-1.5 text-[13px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none w-[100px]" />
                                                    <button onClick={() => removeAvailSlot(d, idx)} className="text-[#CCCCCC] hover:text-[#E53935] p-0.5"><Trash2 size={12} /></button>
                                                </div>
                                            ))}
                                            <button onClick={() => addAvailSlot(d)} className="flex items-center gap-1 text-[11px] text-[#06C755] hover:text-[#05B04A] py-0.5">
                                                <Plus size={10} /> Add
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end mb-6">
                            <button onClick={handleSaveAvailability} disabled={availSaving}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-[13px] transition-colors">
                                <Save size={13} /> {availSaving ? "Saving..." : "Save Schedule"}
                            </button>
                        </div>

                        {/* Day offs */}
                        <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2 border-t border-[#F0F0F0] pt-5">
                            <Calendar size={14} className="text-[#E53935]" />
                            Day Offs
                        </h3>
                        <div className="flex items-end gap-2 mb-4 flex-wrap">
                            <div>
                                <label className="block text-[12px] text-[#666666] mb-1">Date</label>
                                <input type="date" value={newDayOffDate} onChange={(e) => setNewDayOffDate(e.target.value)}
                                    className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-[12px] text-[#666666] mb-1">Reason</label>
                                <input type="text" value={newDayOffReason} onChange={(e) => setNewDayOffReason(e.target.value)}
                                    placeholder="Optional" className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none w-[160px]" />
                            </div>
                            <button onClick={handleAddDayOff} disabled={availSaving || !newDayOffDate}
                                className="flex items-center gap-1 bg-[#E53935] hover:bg-[#D32F2F] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-[13px] transition-colors">
                                <Plus size={13} /> Add
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
                            <button onClick={() => setShowAvailabilityModal(false)}
                                className="px-4 py-2 text-[14px] text-[#999999] hover:text-[#1A1A1A] transition-colors">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
// rebuild 1775361707
