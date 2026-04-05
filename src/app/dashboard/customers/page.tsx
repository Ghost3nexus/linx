"use client";

import { useEffect, useState, useCallback } from "react";
import { getCustomers, createCustomer, updateCustomer, createMembershipCheckout, type Customer } from "@/lib/apiClient";
import { Users, Plus, X, Search, User, Mail, Phone, Edit2, Save, CreditCard } from "lucide-react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showNewForm, setShowNewForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // New customer form
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newPlan, setNewPlan] = useState("");
    const [newNotes, setNewNotes] = useState("");

    // Edit form
    const [editNotes, setEditNotes] = useState("");
    const [editPlan, setEditPlan] = useState("");

    // Membership modal
    const [membershipTarget, setMembershipTarget] = useState<Customer | null>(null);
    const [membershipPlan, setMembershipPlan] = useState("semi_personal");
    const [enrollmentType, setEnrollmentType] = useState("campaign");
    const [membershipLoading, setMembershipLoading] = useState(false);

    const load = useCallback(() => {
        setLoading(true);
        getCustomers()
            .catch(() => [])
            .then((data) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const normalized = (Array.isArray(data) ? data : []).map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    lineUserId: c.lineUserId || c.line_user_id,
                    email: c.email,
                    phone: c.phone,
                    plan: c.plan,
                    notes: c.notes,
                    firstVisit: c.firstVisit || c.first_visit,
                    lastVisit: c.lastVisit || c.last_visit,
                    visitCount: c.visitCount ?? c.visit_count ?? 0,
                    status: c.status || "active",
                    createdAt: c.createdAt || c.created_at,
                    updatedAt: c.updatedAt || c.updated_at,
                } as Customer));
                setCustomers(normalized);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const filtered = customers.filter((c) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q) ||
            (c.email || "").toLowerCase().includes(q) ||
            (c.phone || "").includes(q) ||
            (c.plan || "").toLowerCase().includes(q);
    });

    async function handleCreate() {
        if (!newName.trim()) return;
        setSaving(true);
        setError("");
        try {
            await createCustomer({
                name: newName,
                email: newEmail || undefined,
                phone: newPhone || undefined,
                plan: newPlan || undefined,
                notes: newNotes || undefined,
            });
            setShowNewForm(false);
            setNewName(""); setNewEmail(""); setNewPhone(""); setNewPlan(""); setNewNotes("");
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "作成に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleUpdate(id: string) {
        setSaving(true);
        setError("");
        try {
            await updateCustomer(id, {
                notes: editNotes,
                plan: editPlan,
            });
            setEditingId(null);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "更新に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    function startEdit(customer: Customer) {
        setEditingId(customer.id);
        setEditNotes(customer.notes || "");
        setEditPlan(customer.plan || "");
    }

    async function handleMembershipCheckout() {
        if (!membershipTarget) return;
        setMembershipLoading(true);
        setError("");
        try {
            const result = await createMembershipCheckout({
                customerId: membershipTarget.id,
                customerName: membershipTarget.name,
                customerEmail: membershipTarget.email || undefined,
                plan: membershipPlan,
                enrollmentType,
            });
            if (result.url) {
                window.open(result.url, '_blank');
            }
            setMembershipTarget(null);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "決済リンクの作成に失敗しました");
        } finally {
            setMembershipLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">顧客管理</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">
                        LINEから予約したお客様が自動で登録されます
                        <span className="ml-2 text-[#06C755] font-medium">{customers.length}名</span>
                    </p>
                </div>
                <button
                    onClick={() => setShowNewForm(true)}
                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                >
                    <Plus size={16} />
                    顧客を追加
                </button>
            </div>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error}
                    <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* Search */}
            <div className="mt-6 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="名前・メール・電話番号で検索..."
                    className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg pl-10 pr-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none"
                />
            </div>

            {/* New Customer Form */}
            {showNewForm && (
                <div className="mt-6 bg-white border border-[#06C755]/30 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A]">新しい顧客</h2>
                        <button onClick={() => setShowNewForm(false)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">お名前 *</label>
                            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="田中 太郎"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">メール</label>
                            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="tanaka@example.com"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">電話番号</label>
                            <input type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder="090-1234-5678"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">プラン</label>
                            <input type="text" value={newPlan} onChange={(e) => setNewPlan(e.target.value)} placeholder="月額会員、体験等"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-[13px] text-[#666666] mb-1.5">メモ</label>
                            <input type="text" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} placeholder="備考"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5 justify-end">
                        <button onClick={() => setShowNewForm(false)} className="px-4 py-2.5 text-[14px] text-[#999999]">キャンセル</button>
                        <button
                            onClick={handleCreate}
                            disabled={saving || !newName.trim()}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors"
                        >
                            <Plus size={14} />
                            {saving ? "作成中..." : "顧客を追加"}
                        </button>
                    </div>
                </div>
            )}

            {/* Customer List */}
            <div className="mt-6 space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E8E8E8] rounded-xl">
                        <Users size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                        <p className="text-[#999999] text-[15px]">顧客がまだ登録されていません</p>
                        <p className="text-[#CCCCCC] text-[13px] mt-1">LINEで予約が入ると自動で顧客が登録されます</p>
                    </div>
                ) : (
                    filtered.map((customer) => (
                        <div key={customer.id} className="bg-white border border-[#E8E8E8] rounded-xl p-5 hover:shadow-sm transition-shadow">
                            {editingId === customer.id ? (
                                // Edit mode
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-[16px] font-bold text-[#1A1A1A]">{customer.name}</h3>
                                        <button onClick={() => setEditingId(null)} className="text-[#999999]"><X size={16} /></button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[12px] text-[#999999] mb-1">プラン</label>
                                            <input type="text" value={editPlan} onChange={(e) => setEditPlan(e.target.value)}
                                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] text-[#999999] mb-1">メモ</label>
                                            <input type="text" value={editNotes} onChange={(e) => setEditNotes(e.target.value)}
                                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUpdate(customer.id)}
                                        disabled={saving}
                                        className="mt-3 flex items-center gap-1 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg text-[13px]"
                                    >
                                        <Save size={13} />
                                        {saving ? "保存中..." : "保存"}
                                    </button>
                                </div>
                            ) : (
                                // View mode
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                                        <User size={18} className="text-[#06C755]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-[16px] font-bold text-[#1A1A1A]">{customer.name}</h3>
                                            {customer.plan && customer.plan !== "none" && (
                                                <span className="text-[11px] font-bold bg-[#E8F5E9] text-[#06C755] px-2 py-0.5 rounded-full">{customer.plan}</span>
                                            )}
                                            <span className={`text-[11px] px-2 py-0.5 rounded-full ${customer.status === "active" ? "bg-[#E8F5E9] text-[#06C755]" : "bg-[#F5F5F5] text-[#999999]"}`}>
                                                {customer.status === "active" ? "アクティブ" : customer.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-[13px] text-[#999999]">
                                            {customer.email && (
                                                <span className="flex items-center gap-1"><Mail size={12} />{customer.email}</span>
                                            )}
                                            {customer.phone && (
                                                <span className="flex items-center gap-1"><Phone size={12} />{customer.phone}</span>
                                            )}
                                            <span>来店 {customer.visitCount}回</span>
                                            {customer.lastVisit && <span>最終: {customer.lastVisit}</span>}
                                        </div>
                                        {customer.notes && (
                                            <p className="text-[12px] text-[#AAAAAA] mt-1">{customer.notes}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        <button
                                            onClick={() => { setMembershipTarget(customer); setMembershipPlan("semi_personal"); setEnrollmentType("campaign"); }}
                                            className="p-2 text-[#CCCCCC] hover:text-[#2196F3] hover:bg-[#E3F2FD] rounded-lg transition-colors"
                                            title="会員登録"
                                        >
                                            <CreditCard size={16} />
                                        </button>
                                        <button
                                            onClick={() => startEdit(customer)}
                                            className="p-2 text-[#CCCCCC] hover:text-[#06C755] hover:bg-[#E8F5E9] rounded-lg transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Membership Checkout Modal */}
            {membershipTarget && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setMembershipTarget(null)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">会員登録</h2>
                            <button onClick={() => setMembershipTarget(null)} className="text-[#999999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>

                        <div className="bg-[#F9FAFB] rounded-xl p-4 mb-4">
                            <p className="text-[14px] font-bold text-[#1A1A1A]">{membershipTarget.name}</p>
                            {membershipTarget.email && <p className="text-[12px] text-[#999999]">{membershipTarget.email}</p>}
                        </div>

                        {/* Plan Selection */}
                        <div className="mb-4">
                            <label className="block text-[13px] font-bold text-[#666666] mb-2">プラン</label>
                            <div className="space-y-2">
                                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${membershipPlan === "semi_personal" ? "border-[#06C755] bg-[#E8F5E9]" : "border-[#E8E8E8]"}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="plan" value="semi_personal" checked={membershipPlan === "semi_personal"} onChange={(e) => setMembershipPlan(e.target.value)} className="accent-[#06C755]" />
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">セミパーソナル（通い放題）</p>
                                            <p className="text-[12px] text-[#999999]">少人数制トレーニング</p>
                                        </div>
                                    </div>
                                    <span className="text-[16px] font-bold text-[#06C755]">¥19,800<span className="text-[11px] text-[#999999] font-normal">/月</span></span>
                                </label>
                                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${membershipPlan === "mantoMan" ? "border-[#06C755] bg-[#E8F5E9]" : "border-[#E8E8E8]"}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="plan" value="mantoMan" checked={membershipPlan === "mantoMan"} onChange={(e) => setMembershipPlan(e.target.value)} className="accent-[#06C755]" />
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">マンツーマン</p>
                                            <p className="text-[12px] text-[#999999]">1対1の集中トレーニング</p>
                                        </div>
                                    </div>
                                    <span className="text-[16px] font-bold text-[#06C755]">¥34,800<span className="text-[11px] text-[#999999] font-normal">/月</span></span>
                                </label>
                            </div>
                        </div>

                        {/* Enrollment Fee */}
                        <div className="mb-5">
                            <label className="block text-[13px] font-bold text-[#666666] mb-2">入会金</label>
                            <div className="space-y-2">
                                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${enrollmentType === "campaign" ? "border-[#F59E0B] bg-[#FFFBEB]" : "border-[#E8E8E8]"}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="enrollment" value="campaign" checked={enrollmentType === "campaign"} onChange={(e) => setEnrollmentType(e.target.value)} className="accent-[#F59E0B]" />
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">体験当日入会キャンペーン</p>
                                            <p className="text-[12px] text-[#F59E0B]">¥20,000 OFF!</p>
                                        </div>
                                    </div>
                                    <span className="text-[16px] font-bold text-[#F59E0B]">¥10,000</span>
                                </label>
                                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${enrollmentType === "normal" ? "border-[#999999] bg-[#F9FAFB]" : "border-[#E8E8E8]"}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="enrollment" value="normal" checked={enrollmentType === "normal"} onChange={(e) => setEnrollmentType(e.target.value)} className="accent-[#999999]" />
                                        <p className="text-[14px] text-[#1A1A1A]">通常入会</p>
                                    </div>
                                    <span className="text-[16px] font-bold text-[#666666]">¥30,000</span>
                                </label>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-[#1A1A1A] rounded-xl p-4 mb-5 text-white">
                            <div className="flex justify-between text-[13px] mb-1">
                                <span className="text-[#AAAAAA]">入会金</span>
                                <span>¥{enrollmentType === "campaign" ? "10,000" : "30,000"}</span>
                            </div>
                            <div className="flex justify-between text-[13px] mb-2">
                                <span className="text-[#AAAAAA]">月会費</span>
                                <span>¥{membershipPlan === "semi_personal" ? "19,800" : "34,800"}/月</span>
                            </div>
                            <div className="border-t border-[#333333] pt-2 flex justify-between text-[15px] font-bold">
                                <span>初月合計</span>
                                <span className="text-[#06C755]">
                                    ¥{(
                                        (enrollmentType === "campaign" ? 10000 : 30000) +
                                        (membershipPlan === "semi_personal" ? 19800 : 34800)
                                    ).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleMembershipCheckout}
                            disabled={membershipLoading}
                            className="w-full bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[15px] transition-colors"
                        >
                            {membershipLoading ? "作成中..." : "決済リンクを作成"}
                        </button>
                        <p className="text-[11px] text-[#999999] text-center mt-2">Stripe決済ページが新しいタブで開きます</p>
                    </div>
                </div>
            )}
        </div>
    );
}
