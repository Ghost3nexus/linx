"use client";

import { useEffect, useState, useCallback } from "react";
import {
    getKnowledge, addKnowledge, updateKnowledge, deleteKnowledge, uploadPDF,
    type KnowledgeItem,
} from "@/lib/apiClient";
import { Plus, Pencil, Trash2, X, Save, BookOpen, Upload, FileText } from "lucide-react";

export default function KnowledgePage() {
    const [items, setItems] = useState<KnowledgeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Editor state
    const [editing, setEditing] = useState<KnowledgeItem | null>(null);
    const [isNew, setIsNew] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const load = useCallback(() => {
        setLoading(true);
        getKnowledge()
            .then(setItems)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    function openNew() {
        setEditing(null);
        setIsNew(true);
        setTitle("");
        setContent("");
    }

    function openEdit(item: KnowledgeItem) {
        setEditing(item);
        setIsNew(false);
        setTitle(item.title);
        setContent(item.content);
    }

    function closeEditor() {
        setEditing(null);
        setIsNew(false);
        setTitle("");
        setContent("");
    }

    async function handleSave() {
        if (!title.trim() || !content.trim()) return;
        setSaving(true);
        try {
            if (isNew) {
                await addKnowledge(title, content);
            } else if (editing) {
                await updateKnowledge(editing.id, title, content);
            }
            closeEditor();
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "保存に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("この情報を削除しますか？")) return;
        try {
            await deleteKnowledge(id);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "削除に失敗しました");
        }
    }

    async function handlePDFUpload(file: File) {
        if (!file.name.endsWith('.pdf')) {
            setError('PDFファイルのみアップロード可能です');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('ファイルサイズは5MB以下にしてください');
            return;
        }
        setUploading(true);
        setError('');
        try {
            await uploadPDF(file);
            load();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'アップロードに失敗しました');
        } finally {
            setUploading(false);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handlePDFUpload(file);
    }

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handlePDFUpload(file);
        e.target.value = '';
    }

    const showEditor = isNew || editing !== null;

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">お店の情報 管理</h1>
                    <p className="text-[#999999] mt-1 text-[14px]">AIが回答に使う情報を管理します</p>
                </div>
            </div>

            {/* Warning banner */}
            <div className="mt-4 bg-[#FFF8E1] border border-[#FFE082] rounded-xl p-4 flex items-start gap-3">
                <span className="text-[20px] shrink-0">⚠️</span>
                <div>
                    <p className="text-[14px] font-bold text-[#F57F17]">ここに登録した情報は、LINEのお客様に表示されます</p>
                    <p className="text-[13px] text-[#999999] mt-1">社外秘の情報や個人情報（電話番号・住所等）は登録しないでください。</p>
                </div>
                <button
                    onClick={openNew}
                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#08E065] text-white font-medium px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                >
                    <Plus size={16} />
                    テキスト追加
                </button>
            </div>

            {/* PDF Drop Zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`mt-6 border-2 border-dashed rounded-xl p-6 text-center transition-colors ${dragOver ? 'border-[#06C755] bg-[#06C755]/5' : 'border-[#E8E8E8] hover:border-[#D0D0D0]'
                    }`}
            >
                {uploading ? (
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                        <span className="text-[#666666] text-[14px]">PDFを解析中...</span>
                    </div>
                ) : (
                    <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                            <FileText size={28} className="text-[#AAAAAA]" />
                            <p className="text-[14px] text-[#666666]">PDFをドラッグ&ドロップ、または<span className="text-[#06C755] ml-1">クリックして選択</span></p>
                            <p className="text-[12px] text-[#AAAAAA]">最大5MB</p>
                        </div>
                        <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                    </label>
                )}
            </div>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px] flex items-center justify-between">
                    {error}
                    <button onClick={() => setError("")} className="text-[#E53935] hover:text-[#1A1A1A]"><X size={16} /></button>
                </div>
            )}

            {/* Editor modal */}
            {showEditor && (
                <div className="mt-6 bg-white border border-[#06C755]/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[16px] font-semibold text-[#1A1A1A]">
                            {isNew ? "新規情報" : "情報編集"}
                        </h2>
                        <button onClick={closeEditor} className="text-[#999999] hover:text-[#1A1A1A]"><X size={18} /></button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">タイトル</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="例: 営業時間・アクセス"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] text-[#666666] mb-1.5">内容</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="AIが回答に使う情報をテキストで入力してください..."
                                rows={8}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors resize-y"
                            />
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button onClick={closeEditor} className="px-5 py-2.5 text-[14px] text-[#666666] hover:text-[#1A1A1A] transition-colors">
                                キャンセル
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !title.trim() || !content.trim()}
                                className="flex items-center gap-2 bg-[#06C755] hover:bg-[#08E065] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-5 py-2.5 rounded-lg text-[14px] transition-colors"
                            >
                                <Save size={16} />
                                {saving ? "保存中..." : "保存"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Knowledge list */}
            <div className="mt-6 space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E8E8E8] rounded-xl">
                        <BookOpen size={40} className="text-[#D0D0D0] mx-auto mb-4" />
                        <p className="text-[#999999] text-[15px]">お店の情報がまだ登録されていません</p>
                        <p className="text-[#AAAAAA] text-[13px] mt-1">「テキスト追加」から情報を登録してください</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-[#E8E8E8] rounded-xl p-5 hover:border-[#D0D0D0] transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[15px] font-medium text-[#1A1A1A]">{item.title}</h3>
                                    <p className="text-[13px] text-[#999999] mt-1 line-clamp-2">{item.content}</p>
                                    <p className="text-[11px] text-[#AAAAAA] mt-2">
                                        更新: {new Date(item.updatedAt).toLocaleString("ja-JP")}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="p-2 text-[#999999] hover:text-[#06C755] hover:bg-[#06C755]/10 rounded-lg transition-colors"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-[#999999] hover:text-[#E53935] hover:bg-[#E53935]/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
