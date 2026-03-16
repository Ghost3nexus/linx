"use client";

import { useEffect, useState, useCallback } from "react";
import { getServices, createService, updateService, deleteService, type Service } from "@/lib/apiClient";
import { Plus, X, Pencil, Trash2, ClipboardList, Save } from "lucide-react";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // New service form
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formName, setFormName] = useState("");
    const [formDuration, setFormDuration] = useState(60);
    const [formPrice, setFormPrice] = useState(0);
    const [formMaxParticipants, setFormMaxParticipants] = useState(1);
    const [formDescription, setFormDescription] = useState("");

    const load = useCallback(() => {
        setLoading(true);
        getServices()
            .then((data) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const normalized = (Array.isArray(data) ? data : []).map((s: any) => ({
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
                } as Service));
                setServices(normalized);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    function resetForm() {
        setFormName("");
        setFormDuration(60);
        setFormPrice(0);
        setFormMaxParticipants(1);
        setFormDescription("");
        setEditingId(null);
        setShowForm(false);
    }

    function startEdit(s: Service) {
        setEditingId(s.id);
        setFormName(s.name);
        setFormDuration(s.duration);
        setFormPrice(s.price);
        setFormMaxParticipants(s.maxParticipants);
        setFormDescription(s.description || "");
        setShowForm(true);
    }

    async function handleSubmit() {
        if (!formName.trim()) return;
        setSaving(true);
        setError("");
        try {
            if (editingId) {
                await updateService(editingId, {
                    name: formName,
                    duration: formDuration,
                    price: formPrice,
                    maxParticipants: formMaxParticipants,
                    description: formDescription || undefined,
                });
            } else {
                await createService({
                    name: formName,
                    duration: formDuration,
                    price: formPrice,
                    maxParticipants: formMaxParticipants,
                    description: formDescription || undefined,
                });
            }
            resetForm();
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "保存に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("このメニューを削除しますか？")) return;
        try {
            await deleteService(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "削除に失敗しました");
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">メニュー管理</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">提供するサービス・メニューを管理します</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                >
                    <Plus size={16} />
                    メニューを追加
                </button>
            </div>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error}
                    <button onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            {/* New / Edit Form */}
            {showForm && (
                <div className="mt-6 bg-white border border-[#06C755]/30 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-bold text-[#1A1A1A]">
                            {editingId ? "メニューを編集" : "新しいメニュー"}
                        </h2>
                        <button onClick={resetForm} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="block text-[13px] text-[#666666] mb-1.5">メニュー名 *</label>
                            <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="カット、カラー等"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">所要時間（分）</label>
                            <select value={formDuration} onChange={(e) => setFormDuration(Number(e.target.value))}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none">
                                <option value={15}>15分</option>
                                <option value={30}>30分</option>
                                <option value={45}>45分</option>
                                <option value={60}>60分</option>
                                <option value={90}>90分</option>
                                <option value={120}>120分</option>
                                <option value={150}>150分</option>
                                <option value={180}>180分</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">料金（円）</label>
                            <input type="number" value={formPrice} onChange={(e) => setFormPrice(Number(e.target.value))} min={0} step={100}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">同時受付人数</label>
                            <input type="number" value={formMaxParticipants} onChange={(e) => setFormMaxParticipants(Number(e.target.value))} min={1} max={100}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">説明</label>
                            <input type="text" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="メニューの説明（任意）"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-5 justify-end">
                        <button onClick={resetForm} className="px-4 py-2.5 text-[14px] text-[#999999]">キャンセル</button>
                        <button
                            onClick={handleSubmit}
                            disabled={saving || !formName.trim()}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-[14px] transition-colors"
                        >
                            <Save size={14} />
                            {saving ? "保存中..." : editingId ? "更新" : "追加"}
                        </button>
                    </div>
                </div>
            )}

            {/* Services List */}
            <div className="mt-6 space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E8E8E8] rounded-xl">
                        <ClipboardList size={40} className="text-[#E0E0E0] mx-auto mb-4" />
                        <p className="text-[#999999] text-[15px]">メニューが登録されていません</p>
                        <p className="text-[#CCCCCC] text-[13px] mt-1">「メニューを追加」からサービスを登録してください</p>
                    </div>
                ) : (
                    services.map((s) => (
                        <div key={s.id} className="bg-white border border-[#E8E8E8] rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                            <div className="flex-1 min-w-0">
                                <p className="text-[15px] font-bold text-[#1A1A1A]">{s.name}</p>
                                <div className="flex items-center gap-3 mt-1 text-[13px] text-[#666666]">
                                    <span>{s.duration}分</span>
                                    <span className="text-[#E8E8E8]">|</span>
                                    <span>{s.price > 0 ? `¥${s.price.toLocaleString()}` : "無料"}</span>
                                    <span className="text-[#E8E8E8]">|</span>
                                    <span>定員 {s.maxParticipants}名</span>
                                </div>
                                {s.description && <p className="text-[12px] text-[#999999] mt-1">{s.description}</p>}
                            </div>
                            <div className="shrink-0 flex items-center gap-2">
                                <button
                                    onClick={() => startEdit(s)}
                                    className="text-[#999999] hover:text-[#06C755] transition-colors p-1.5"
                                    title="編集"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(s.id)}
                                    className="text-[#CCCCCC] hover:text-[#E53935] transition-colors p-1.5"
                                    title="削除"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
