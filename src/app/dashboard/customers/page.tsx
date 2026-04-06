"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getCustomers, createCustomer, updateCustomer, createMembershipCheckout,
    checkinCustomer, sendBroadcast,
    type Customer,
} from "@/lib/apiClient";
import { Users, Plus, X, Search, User, Mail, Phone, Edit2, Save, CreditCard, CheckCircle, Send, Upload, Filter } from "lucide-react";

const STATUS_OPTIONS = [
    { value: "active", label: "アクティブ", color: "#06C755", bg: "#E8F5E9" },
    { value: "suspended", label: "休会", color: "#F59E0B", bg: "#FFFBEB" },
    { value: "cancelled", label: "退会", color: "#E53935", bg: "#FFEBEE" },
    { value: "trial", label: "体験", color: "#2196F3", bg: "#E3F2FD" },
];

const PLAN_OPTIONS = [
    { value: "none", label: "未設定" },
    { value: "semi_personal", label: "セミパーソナル" },
    { value: "mantoMan", label: "マンツーマン" },
];

function getStatusStyle(status: string) {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Forms
    const [showNewForm, setShowNewForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newPlan, setNewPlan] = useState("none");
    const [newNotes, setNewNotes] = useState("");

    // Edit
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editPlan, setEditPlan] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editNotes, setEditNotes] = useState("");

    // Membership checkout
    const [membershipTarget, setMembershipTarget] = useState<Customer | null>(null);
    const [membershipPlan, setMembershipPlan] = useState("semi_personal");
    const [enrollmentType, setEnrollmentType] = useState("campaign");
    const [membershipLoading, setMembershipLoading] = useState(false);

    // Broadcast
    const [showBroadcast, setShowBroadcast] = useState(false);
    const [broadcastMsg, setBroadcastMsg] = useState("");
    const [broadcastTarget, setBroadcastTarget] = useState("active");
    const [broadcastSending, setBroadcastSending] = useState(false);
    const [broadcastResult, setBroadcastResult] = useState<{ sentCount: number; failedCount: number } | null>(null);

    // CSV Import
    const [showCsvImport, setShowCsvImport] = useState(false);

    const load = useCallback(() => {
        setLoading(true);
        getCustomers()
            .then(data => setCustomers(Array.isArray(data) ? data : []))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const filtered = customers.filter(c => {
        if (filterStatus !== "all" && c.status !== filterStatus) return false;
        if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !(c.email || "").toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const stats = {
        total: customers.length,
        active: customers.filter(c => c.status === "active").length,
        suspended: customers.filter(c => c.status === "suspended").length,
        trial: customers.filter(c => c.status === "trial").length,
    };

    async function handleCreate() {
        if (!newName.trim()) return;
        try {
            await createCustomer({ name: newName, email: newEmail || undefined, phone: newPhone || undefined, plan: newPlan, notes: newNotes || undefined });
            setShowNewForm(false); setNewName(""); setNewEmail(""); setNewPhone(""); setNewPlan("none"); setNewNotes("");
            load();
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "作成に失敗"); }
    }

    async function handleSaveEdit() {
        if (!editingId) return;
        try {
            await updateCustomer(editingId, { name: editName, email: editEmail, phone: editPhone, plan: editPlan, status: editStatus, notes: editNotes });
            setEditingId(null); load();
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "更新に失敗"); }
    }

    function startEdit(c: Customer) {
        setEditingId(c.id); setEditName(c.name); setEditEmail(c.email || ""); setEditPhone(c.phone || "");
        setEditPlan(c.plan || "none"); setEditStatus(c.status); setEditNotes(c.notes || "");
    }

    async function handleCheckin(c: Customer) {
        try {
            await checkinCustomer(c.id, { service: c.plan === "semi_personal" ? "セミパーソナル" : c.plan === "mantoMan" ? "マンツーマン" : undefined });
            load();
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "チェックインに失敗"); }
    }

    async function handleMembershipCheckout() {
        if (!membershipTarget) return;
        setMembershipLoading(true);
        try {
            const result = await createMembershipCheckout({ customerId: membershipTarget.id, customerName: membershipTarget.name, customerEmail: membershipTarget.email || undefined, plan: membershipPlan, enrollmentType });
            if (result.url) window.open(result.url, '_blank');
            setMembershipTarget(null);
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "決済リンクの作成に失敗"); }
        finally { setMembershipLoading(false); }
    }

    async function handleBroadcast() {
        if (!broadcastMsg.trim()) return;
        setBroadcastSending(true);
        try {
            const result = await sendBroadcast(broadcastMsg, broadcastTarget);
            setBroadcastResult(result);
            setBroadcastMsg("");
        } catch (e: unknown) { setError(e instanceof Error ? e.message : "配信に失敗"); }
        finally { setBroadcastSending(false); }
    }

    async function handleCsvUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        try {
            const accountId = localStorage.getItem("linx_account_id") || "";
            const token = localStorage.getItem("linx_token") || "";
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://linx-server-production.up.railway.app/api"}/linx/customers/${accountId}/import-csv`, {
                method: 'POST', headers: { 'Content-Type': 'text/csv', Authorization: `Bearer ${token}` }, body: text,
            });
            const data = await res.json();
            if (data.success) {
                alert(`インポート完了: ${data.data.imported}件追加, ${data.data.skipped}件スキップ`);
                load();
            } else { setError(data.error); }
        } catch (err: unknown) { setError(err instanceof Error ? err.message : "CSVインポートに失敗"); }
        setShowCsvImport(false);
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">会員管理</h1>
                    <p className="text-[#999] mt-1 text-[14px]">会員情報・ステータス・出席・配信</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowBroadcast(!showBroadcast)}
                        className="flex items-center gap-2 border border-[#2196F3] text-[#2196F3] hover:bg-[#E3F2FD] px-4 py-2 rounded-lg text-[13px] font-bold transition-colors">
                        <Send size={14} /> LINE配信
                    </button>
                    <button onClick={() => setShowCsvImport(true)}
                        className="flex items-center gap-2 border border-[#E8E8E8] text-[#666] hover:border-[#06C755] hover:text-[#06C755] px-4 py-2 rounded-lg text-[13px] transition-colors">
                        <Upload size={14} /> CSV取込
                    </button>
                    <button onClick={() => setShowNewForm(true)}
                        className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2 rounded-lg text-[13px] transition-colors">
                        <Plus size={14} /> 会員追加
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px] flex items-center justify-between">
                    {error} <button onClick={() => setError("")}><X size={14} /></button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                    { label: "全会員", value: stats.total, color: "#1A1A1A" },
                    { label: "アクティブ", value: stats.active, color: "#06C755" },
                    { label: "休会中", value: stats.suspended, color: "#F59E0B" },
                    { label: "体験", value: stats.trial, color: "#2196F3" },
                ].map(s => (
                    <div key={s.label} className="bg-white border border-[#E8E8E8] rounded-xl p-3 text-center">
                        <p className="text-[24px] font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[11px] text-[#999]">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Broadcast Panel */}
            {showBroadcast && (
                <div className="mt-4 bg-white border border-[#2196F3]/30 rounded-xl p-5 shadow-sm">
                    <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2"><Send size={15} className="text-[#2196F3]" /> LINE一斉配信</h2>
                    <div className="flex gap-3 mb-3">
                        <select value={broadcastTarget} onChange={e => setBroadcastTarget(e.target.value)}
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#2196F3] focus:outline-none">
                            <option value="active">アクティブ会員</option>
                            <option value="suspended">休会中</option>
                            <option value="trial">体験者</option>
                        </select>
                        <span className="text-[12px] text-[#999] self-center">
                            対象: {customers.filter(c => c.status === broadcastTarget && c.lineUserId).length}名
                        </span>
                    </div>
                    <textarea value={broadcastMsg} onChange={e => setBroadcastMsg(e.target.value)} rows={3} placeholder="配信メッセージを入力..."
                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] focus:border-[#2196F3] focus:outline-none resize-none" />
                    <div className="flex items-center justify-between mt-3">
                        {broadcastResult && (
                            <p className="text-[13px] text-[#06C755]">送信完了: {broadcastResult.sentCount}件成功 / {broadcastResult.failedCount}件失敗</p>
                        )}
                        <button onClick={handleBroadcast} disabled={broadcastSending || !broadcastMsg.trim()}
                            className="ml-auto flex items-center gap-2 bg-[#2196F3] hover:bg-[#1976D2] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-lg text-[13px]">
                            <Send size={14} /> {broadcastSending ? "送信中..." : "送信"}
                        </button>
                    </div>
                </div>
            )}

            {/* CSV Import */}
            {showCsvImport && (
                <div className="mt-4 bg-white border border-[#E8E8E8] rounded-xl p-5 shadow-sm">
                    <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-3 flex items-center gap-2"><Upload size={15} /> 既存会員CSVインポート</h2>
                    <p className="text-[12px] text-[#999] mb-3">CSV形式: 名前,メール,電話,プラン,ステータス,備考,会員番号<br/>ヘッダー行必須。日本語ヘッダー対応（名前/氏名/会員名）</p>
                    <input type="file" accept=".csv" onChange={handleCsvUpload}
                        className="block w-full text-[13px] text-[#666] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#06C755] file:text-white file:font-bold file:cursor-pointer" />
                    <button onClick={() => setShowCsvImport(false)} className="mt-2 text-[12px] text-[#999]">閉じる</button>
                </div>
            )}

            {/* New Member Form */}
            {showNewForm && (
                <div className="mt-4 bg-white border border-[#06C755]/30 rounded-xl p-5 shadow-sm">
                    <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-3">新規会員登録</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="名前 *"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="メール"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        <input type="tel" value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="電話番号"
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                        <select value={newPlan} onChange={e => setNewPlan(e.target.value)}
                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none">
                            {PLAN_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                    </div>
                    <input type="text" value={newNotes} onChange={e => setNewNotes(e.target.value)} placeholder="備考（会員番号など）"
                        className="w-full mt-3 bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleCreate} disabled={!newName.trim()}
                            className="bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-[13px]">登録</button>
                        <button onClick={() => setShowNewForm(false)} className="text-[#999] px-3">キャンセル</button>
                    </div>
                </div>
            )}

            {/* Search & Filter */}
            <div className="mt-5 flex gap-3 items-center">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#CCC]" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="名前・メールで検索"
                        className="w-full bg-white border border-[#E8E8E8] rounded-lg pl-9 pr-4 py-2.5 text-[14px] focus:border-[#06C755] focus:outline-none" />
                </div>
                <div className="flex gap-1.5">
                    {[{ value: "all", label: "全て" }, ...STATUS_OPTIONS].map(s => (
                        <button key={s.value} onClick={() => setFilterStatus(s.value)}
                            className={`px-3 py-2 rounded-lg text-[12px] font-bold transition-colors ${
                                filterStatus === s.value ? "bg-[#1A1A1A] text-white" : "bg-[#F5F5F5] text-[#666] hover:bg-[#E8E8E8]"
                            }`}>
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Customer List */}
            <div className="mt-4 space-y-2">
                {loading ? (
                    <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" /></div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-[#E8E8E8] rounded-xl">
                        <Users size={40} className="text-[#E0E0E0] mx-auto mb-3" />
                        <p className="text-[#999] text-[15px]">会員がいません</p>
                    </div>
                ) : filtered.map(c => {
                    const statusStyle = getStatusStyle(c.status);
                    const planLabel = PLAN_OPTIONS.find(p => p.value === c.plan)?.label || c.plan || "未設定";
                    return (
                        <div key={c.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 hover:shadow-sm transition-shadow">
                            {editingId === c.id ? (
                                /* Edit Mode */
                                <div className="space-y-3">
                                    <div className="grid grid-cols-3 gap-2">
                                        <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#06C755] focus:outline-none" />
                                        <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} placeholder="メール"
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#06C755] focus:outline-none" />
                                        <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="電話"
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#06C755] focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <select value={editPlan} onChange={e => setEditPlan(e.target.value)}
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#06C755] focus:outline-none">
                                            {PLAN_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                        </select>
                                        <select value={editStatus} onChange={e => setEditStatus(e.target.value)}
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#06C755] focus:outline-none">
                                            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                        </select>
                                        <input type="text" value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="備考"
                                            className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2 text-[13px] focus:border-[#06C755] focus:outline-none" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleSaveEdit} className="bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-4 py-1.5 rounded-lg text-[12px] flex items-center gap-1"><Save size={12} /> 保存</button>
                                        <button onClick={() => setEditingId(null)} className="text-[#999] text-[12px]">キャンセル</button>
                                    </div>
                                </div>
                            ) : (
                                /* View Mode */
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#06C755]/10 flex items-center justify-center text-[14px] font-bold text-[#06C755] shrink-0">
                                        {c.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-[15px] font-bold text-[#1A1A1A]">{c.name}</p>
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: statusStyle.color, backgroundColor: statusStyle.bg }}>
                                                {statusStyle.label}
                                            </span>
                                            {c.plan && c.plan !== "none" && (
                                                <span className="text-[10px] text-[#666] bg-[#F5F5F5] px-2 py-0.5 rounded-full">{planLabel}</span>
                                            )}
                                        </div>
                                        <div className="flex gap-3 mt-1 text-[11px] text-[#999]">
                                            {c.email && <span className="flex items-center gap-0.5"><Mail size={10} />{c.email}</span>}
                                            {c.phone && <span className="flex items-center gap-0.5"><Phone size={10} />{c.phone}</span>}
                                            <span>来店{c.visitCount || 0}回</span>
                                            {c.lastVisit && <span>最終: {c.lastVisit.split("T")[0]}</span>}
                                        </div>
                                        {c.notes && <p className="text-[11px] text-[#AAA] mt-0.5">{c.notes}</p>}
                                    </div>
                                    <div className="flex gap-1.5 shrink-0">
                                        <button onClick={() => handleCheckin(c)} title="チェックイン"
                                            className="p-2 text-[#CCC] hover:text-[#06C755] hover:bg-[#E8F5E9] rounded-lg transition-colors">
                                            <CheckCircle size={16} />
                                        </button>
                                        <button onClick={() => { setMembershipTarget(c); setMembershipPlan(c.plan === "mantoMan" ? "mantoMan" : "semi_personal"); setEnrollmentType("campaign"); }} title="会員登録"
                                            className="p-2 text-[#CCC] hover:text-[#2196F3] hover:bg-[#E3F2FD] rounded-lg transition-colors">
                                            <CreditCard size={16} />
                                        </button>
                                        <button onClick={() => startEdit(c)} title="編集"
                                            className="p-2 text-[#CCC] hover:text-[#06C755] hover:bg-[#E8F5E9] rounded-lg transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Membership Checkout Modal */}
            {membershipTarget && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={() => setMembershipTarget(null)}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A]">会員登録</h2>
                            <button onClick={() => setMembershipTarget(null)} className="text-[#999] hover:text-[#1A1A1A]"><X size={20} /></button>
                        </div>
                        <div className="bg-[#F9FAFB] rounded-xl p-4 mb-4">
                            <p className="text-[14px] font-bold text-[#1A1A1A]">{membershipTarget.name}</p>
                            {membershipTarget.email && <p className="text-[12px] text-[#999]">{membershipTarget.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-[13px] font-bold text-[#666] mb-2">プラン</label>
                            <div className="space-y-2">
                                {[
                                    { value: "semi_personal", name: "セミパーソナル（通い放題）", sub: "少人数制トレーニング", price: "¥19,800" },
                                    { value: "mantoMan", name: "マンツーマン", sub: "1対1の集中トレーニング", price: "¥34,800" },
                                ].map(p => (
                                    <label key={p.value} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${membershipPlan === p.value ? "border-[#06C755] bg-[#E8F5E9]" : "border-[#E8E8E8]"}`}>
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="plan" value={p.value} checked={membershipPlan === p.value} onChange={e => setMembershipPlan(e.target.value)} className="accent-[#06C755]" />
                                            <div><p className="text-[14px] font-bold">{p.name}</p><p className="text-[12px] text-[#999]">{p.sub}</p></div>
                                        </div>
                                        <span className="text-[16px] font-bold text-[#06C755]">{p.price}<span className="text-[11px] text-[#999] font-normal">/月</span></span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="block text-[13px] font-bold text-[#666] mb-2">入会金</label>
                            <div className="space-y-2">
                                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${enrollmentType === "campaign" ? "border-[#F59E0B] bg-[#FFFBEB]" : "border-[#E8E8E8]"}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="enrollment" value="campaign" checked={enrollmentType === "campaign"} onChange={e => setEnrollmentType(e.target.value)} className="accent-[#F59E0B]" />
                                        <div><p className="text-[14px] font-bold">体験当日入会キャンペーン</p><p className="text-[12px] text-[#F59E0B]">¥20,000 OFF!</p></div>
                                    </div>
                                    <span className="text-[16px] font-bold text-[#F59E0B]">¥10,000</span>
                                </label>
                                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${enrollmentType === "normal" ? "border-[#999] bg-[#F9FAFB]" : "border-[#E8E8E8]"}`}>
                                    <div className="flex items-center gap-3">
                                        <input type="radio" name="enrollment" value="normal" checked={enrollmentType === "normal"} onChange={e => setEnrollmentType(e.target.value)} className="accent-[#999]" />
                                        <p className="text-[14px]">通常入会</p>
                                    </div>
                                    <span className="text-[16px] font-bold text-[#666]">¥30,000</span>
                                </label>
                            </div>
                        </div>
                        <div className="bg-[#1A1A1A] rounded-xl p-4 mb-5 text-white">
                            <div className="flex justify-between text-[13px] mb-1"><span className="text-[#AAA]">入会金</span><span>¥{enrollmentType === "campaign" ? "10,000" : "30,000"}</span></div>
                            <div className="flex justify-between text-[13px] mb-2"><span className="text-[#AAA]">月会費</span><span>¥{membershipPlan === "semi_personal" ? "19,800" : "34,800"}/月</span></div>
                            <div className="border-t border-[#333] pt-2 flex justify-between text-[15px] font-bold">
                                <span>初月合計</span>
                                <span className="text-[#06C755]">¥{((enrollmentType === "campaign" ? 10000 : 30000) + (membershipPlan === "semi_personal" ? 19800 : 34800)).toLocaleString()}</span>
                            </div>
                        </div>
                        <button onClick={handleMembershipCheckout} disabled={membershipLoading}
                            className="w-full bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[15px]">
                            {membershipLoading ? "作成中..." : "決済リンクを作成"}
                        </button>
                        <p className="text-[11px] text-[#999] text-center mt-2">Stripe決済ページが新しいタブで開きます</p>
                    </div>
                </div>
            )}
        </div>
    );
}
