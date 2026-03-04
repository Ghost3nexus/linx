"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link2, Check, ChevronRight, Copy, ExternalLink, FileText } from "lucide-react";
import { addKnowledge, uploadPDF, updateLineSettings } from "@/lib/apiClient";

const steps = [
    { id: 1, icon: FileText, label: "ナレッジ登録", desc: "お客様に回答する情報を登録" },
    { id: 2, icon: Link2, label: "LINE公式アカウント連携", desc: "Channel情報を設定" },
    { id: 3, icon: Check, label: "完了", desc: "AIが応答を開始します" },
];

export default function SetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Step 1 state
    const [knowledgeText, setKnowledgeText] = useState("");
    const [knowledgeTitle, setKnowledgeTitle] = useState("");
    const [dragOver, setDragOver] = useState(false);

    // Step 2 state
    const [channelId, setChannelId] = useState("");
    const [channelSecret, setChannelSecret] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleKnowledgeSave() {
        if (!knowledgeText.trim() && !knowledgeTitle.trim()) {
            setStep(2); // スキップ可能
            return;
        }
        setLoading(true);
        setError("");
        try {
            await addKnowledge(knowledgeTitle || "会社情報", knowledgeText);
            setStep(2);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "保存に失敗しました");
        } finally {
            setLoading(false);
        }
    }

    async function handlePDFUpload(file: File) {
        setLoading(true);
        setError("");
        try {
            await uploadPDF(file);
            setStep(2);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "アップロードに失敗しました");
        } finally {
            setLoading(false);
        }
    }

    async function handleLineSetup() {
        if (!channelId || !channelSecret || !accessToken) {
            setError("すべての項目を入力してください");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const result = await updateLineSettings(channelId, channelSecret, accessToken);
            setWebhookUrl(result.webhookUrl);
            setStep(3);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "接続に失敗しました");
        } finally {
            setLoading(false);
        }
    }

    function copyWebhookUrl() {
        navigator.clipboard.writeText(webhookUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="min-h-screen bg-[#050509] flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-[560px]">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-[26px] font-bold text-white">導入セットアップ</h1>
                    <p className="text-[14px] text-[#6B7280] mt-2">3ステップで完了。5分でAIが動き始めます。</p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-0 mb-10">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center">
                            <div className={`flex flex-col items-center ${i < steps.length - 1 ? "w-[120px]" : ""}`}>
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${step > s.id
                                    ? "bg-[#06C755] text-white"
                                    : step === s.id
                                        ? "bg-[#06C755]/20 border-2 border-[#06C755] text-[#06C755]"
                                        : "bg-[#0A0A0F] border border-[#1A1A2E] text-[#4B5563]"
                                    }`}>
                                    {step > s.id ? <Check size={16} /> : s.id}
                                </div>
                                <span className={`text-[11px] mt-1.5 text-center leading-tight ${step === s.id ? "text-[#06C755]" : "text-[#4B5563]"}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`h-[2px] w-12 mb-5 mx-1 transition-all duration-300 ${step > s.id ? "bg-[#06C755]" : "bg-[#1A1A2E]"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                    {/* STEP 1: Knowledge */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-2xl p-6"
                        >
                            <h2 className="text-[18px] font-semibold text-white mb-1">STEP 1: ナレッジ登録</h2>
                            <p className="text-[13px] text-[#6B7280] mb-6">
                                よくある質問・営業時間・商品情報などを入力してください。PDFでもOK。
                            </p>

                            {error && (
                                <div className="mb-4 bg-[#FF3366]/10 border border-[#FF3366]/30 rounded-lg p-3 text-[#FF3366] text-[13px]">{error}</div>
                            )}

                            {/* PDF Drop */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragOver(false);
                                    const file = e.dataTransfer.files[0];
                                    if (file?.type === "application/pdf") handlePDFUpload(file);
                                }}
                                className={`mb-4 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver ? "border-[#06C755] bg-[#06C755]/5" : "border-[#1A1A2E] hover:border-[#2A2A3E]"}`}
                            >
                                <label className="cursor-pointer block">
                                    <input
                                        type="file" accept=".pdf" className="sr-only"
                                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePDFUpload(f); }}
                                    />
                                    <Upload size={24} className="text-[#4B5563] mx-auto mb-2" />
                                    <p className="text-[13px] text-[#6B7280]">PDFをドロップ または クリックして選択</p>
                                </label>
                            </div>

                            <div className="relative mb-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#1A1A2E]" />
                                </div>
                                <div className="relative flex justify-center text-[11px] text-[#4B5563] bg-[#0A0A0F] px-2">または テキストで入力</div>
                            </div>

                            <input
                                type="text"
                                value={knowledgeTitle}
                                onChange={(e) => setKnowledgeTitle(e.target.value)}
                                placeholder="タイトル（例: 会社概要・営業時間）"
                                className="w-full mb-3 bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none"
                            />
                            <textarea
                                value={knowledgeText}
                                onChange={(e) => setKnowledgeText(e.target.value)}
                                placeholder="営業時間: 月〜金 9:00〜18:00&#10;定休日: 土日・祝日&#10;電話番号: 03-XXXX-XXXX..."
                                rows={5}
                                className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none resize-none"
                            />

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-5 py-2.5 rounded-xl text-[13px] text-[#6B7280] hover:text-white border border-[#1A1A2E] hover:border-[#2A2A3E] transition-colors"
                                >
                                    後で登録
                                </button>
                                <button
                                    onClick={handleKnowledgeSave}
                                    disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#08E065] disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-[14px] transition-all active:scale-95"
                                >
                                    {loading ? "保存中..." : "次へ"}
                                    {!loading && <ChevronRight size={16} />}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: LINE Setup */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-2xl p-6"
                        >
                            <h2 className="text-[18px] font-semibold text-white mb-1">STEP 2: LINE公式アカウント連携</h2>
                            <p className="text-[13px] text-[#6B7280] mb-2">
                                <a href="https://developers.line.biz/" target="_blank" rel="noopener noreferrer" className="text-[#06C755] hover:underline inline-flex items-center gap-1">
                                    LINE Developers <ExternalLink size={11} />
                                </a>
                                {" "}からChannel情報を取得してください。
                            </p>

                            {/* Guide */}
                            <div className="bg-[#06C755]/5 border border-[#06C755]/20 rounded-xl p-4 mb-5 text-[12px] text-[#9CA3AF] leading-relaxed">
                                <p className="font-medium text-[#06C755] mb-2">取得場所：</p>
                                <ol className="space-y-1 list-decimal list-inside">
                                    <li>LINE Developers → プロバイダー → Messaging APIチャンネル</li>
                                    <li>「基本設定」タブ → Channel ID・Channel Secret</li>
                                    <li>「Messaging API設定」タブ → Channel Access Token を発行・コピー</li>
                                </ol>
                            </div>

                            {error && (
                                <div className="mb-4 bg-[#FF3366]/10 border border-[#FF3366]/30 rounded-lg p-3 text-[#FF3366] text-[13px]">{error}</div>
                            )}

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[12px] text-[#9CA3AF] mb-1.5">Channel ID</label>
                                    <input
                                        type="text"
                                        value={channelId}
                                        onChange={(e) => setChannelId(e.target.value)}
                                        placeholder="1234567890"
                                        className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] text-[#9CA3AF] mb-1.5">Channel Secret</label>
                                    <input
                                        type="password"
                                        value={channelSecret}
                                        onChange={(e) => setChannelSecret(e.target.value)}
                                        placeholder="••••••••••••••••••••••••••••••••"
                                        className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[12px] text-[#9CA3AF] mb-1.5">Channel Access Token（長期）</label>
                                    <textarea
                                        value={accessToken}
                                        onChange={(e) => setAccessToken(e.target.value)}
                                        placeholder="発行したLong-lived Channel access tokenを貼り付け..."
                                        rows={3}
                                        className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none font-mono resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-5 py-2.5 rounded-xl text-[13px] text-[#6B7280] hover:text-white border border-[#1A1A2E] transition-colors"
                                >
                                    戻る
                                </button>
                                <button
                                    onClick={handleLineSetup}
                                    disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#08E065] disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-[14px] transition-all active:scale-95"
                                >
                                    {loading ? "接続テスト中..." : "接続して次へ"}
                                    {!loading && <ChevronRight size={16} />}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Done */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#0A0A0F] border border-[#06C755]/30 rounded-2xl p-6 text-center"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#06C755]/20 flex items-center justify-center mx-auto mb-4">
                                <Check size={28} className="text-[#06C755]" />
                            </div>
                            <h2 className="text-[22px] font-bold text-white mb-2">接続成功 🎉</h2>
                            <p className="text-[14px] text-[#9CA3AF] mb-6">あと一歩。LINE DevelopersでWebhook URLを設定すれば完了です。</p>

                            {/* Webhook URL */}
                            <div className="bg-[#0D1117] border border-[#1A1A2E] rounded-xl p-4 mb-6">
                                <p className="text-[12px] text-[#6B7280] mb-2 text-left">Webhook URL（LINE Developersにコピーして貼り付け）</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 text-[12px] text-[#06C755] font-mono text-left break-all">{webhookUrl}</code>
                                    <button
                                        onClick={copyWebhookUrl}
                                        className="shrink-0 px-3 py-1.5 bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] rounded-lg text-[12px] flex items-center gap-1 transition-colors"
                                    >
                                        {copied ? <Check size={12} /> : <Copy size={12} />}
                                        {copied ? "コピー済" : "コピー"}
                                    </button>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="bg-[#06C755]/5 border border-[#06C755]/20 rounded-xl p-4 mb-6 text-left">
                                <p className="text-[12px] text-[#9CA3AF] leading-relaxed">
                                    <strong className="text-[#06C755]">最後の作業:</strong><br />
                                    LINE Developers → Messaging API設定 → Webhook設定 → URLを貼り付け → 「検証」→「有効化」
                                </p>
                            </div>

                            <a
                                href="https://developers.line.biz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[13px] text-[#06C755] hover:underline mb-6 mx-auto"
                            >
                                LINE Developers を開く <ExternalLink size={13} />
                            </a>

                            <button
                                onClick={() => router.push("/dashboard")}
                                className="w-full bg-[#06C755] hover:bg-[#08E065] text-white font-medium py-3 rounded-xl text-[15px] transition-all active:scale-95"
                            >
                                ダッシュボードへ
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
