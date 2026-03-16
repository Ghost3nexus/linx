"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link2, Check, ChevronRight, Copy, ExternalLink, FileText, Globe, Sparkles, Loader2 } from "lucide-react";
import { addKnowledge, uploadPDF, updateLineSettings, autoSetupFromUrl } from "@/lib/apiClient";

const steps = [
    { id: 1, icon: FileText, label: "お店の情報を登録", desc: "お客様に回答する情報を登録" },
    { id: 2, icon: Link2, label: "LINE公式アカウント連携", desc: "Channel情報を設定" },
    { id: 3, icon: Check, label: "完了", desc: "AIが応答を開始します" },
];

export default function SetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Step 1 state
    const [inputMode, setInputMode] = useState<"url" | "manual" | "pdf">("url");
    const [siteUrl, setSiteUrl] = useState("");
    const [autoSetupDone, setAutoSetupDone] = useState(false);
    const [autoSetupResult, setAutoSetupResult] = useState<{ itemsCreated: number; botName: string } | null>(null);
    const [knowledgeText, setKnowledgeText] = useState("");
    const [knowledgeTitle, setKnowledgeTitle] = useState("");
    const [dragOver, setDragOver] = useState(false);

    // Step 2 state
    const [channelId, setChannelId] = useState("");
    const [channelSecret, setChannelSecret] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [copied, setCopied] = useState(false);

    async function handleAutoSetup() {
        if (!siteUrl.trim()) {
            setError("URLを入力してください");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const result = await autoSetupFromUrl(siteUrl);
            setAutoSetupDone(true);
            setAutoSetupResult({
                itemsCreated: result.itemsCreated,
                botName: result.suggestion.botName,
            });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "読み込みに失敗しました");
        } finally {
            setLoading(false);
        }
    }

    async function handleKnowledgeSave() {
        if (!knowledgeText.trim() && !knowledgeTitle.trim()) {
            setStep(2);
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
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-[560px]">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-[26px] font-bold text-[#1A1A1A]">導入セットアップ</h1>
                    <p className="text-[14px] text-[#999999] mt-2">3ステップで完了。5分でAIが動き始めます。</p>
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
                                        : "bg-white border border-[#E8E8E8] text-[#AAAAAA]"
                                    }`}>
                                    {step > s.id ? <Check size={16} /> : s.id}
                                </div>
                                <span className={`text-[11px] mt-1.5 text-center leading-tight ${step === s.id ? "text-[#06C755]" : "text-[#AAAAAA]"}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`h-[2px] w-12 mb-5 mx-1 transition-all duration-300 ${step > s.id ? "bg-[#06C755]" : "bg-[#E8E8E8]"}`} />
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
                            className="bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-1">STEP 1: お店の情報を登録</h2>
                            <p className="text-[13px] text-[#999999] mb-5">
                                AIがお客様に回答するための情報を登録します。
                            </p>

                            {error && (
                                <div className="mb-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">{error}</div>
                            )}

                            {/* Input mode tabs */}
                            <div className="flex gap-2 mb-5">
                                {[
                                    { id: "url" as const, label: "URLから自動作成", icon: Sparkles, recommended: true },
                                    { id: "manual" as const, label: "手入力", icon: FileText, recommended: false },
                                    { id: "pdf" as const, label: "PDF", icon: Upload, recommended: false },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => { setInputMode(tab.id); setError(""); }}
                                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                                            inputMode === tab.id
                                                ? "bg-[#06C755] text-white shadow-md"
                                                : "bg-[#F9FAFB] text-[#666666] border border-[#E8E8E8] hover:border-[#06C755]"
                                        }`}
                                    >
                                        <tab.icon size={14} />
                                        {tab.label}
                                        {tab.recommended && inputMode !== tab.id && (
                                            <span className="text-[10px] bg-[#06C755] text-white px-1.5 py-0.5 rounded-full ml-1">おすすめ</span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* URL auto-setup mode */}
                            {inputMode === "url" && !autoSetupDone && (
                                <div>
                                    <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-xl p-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <Sparkles size={20} className="text-[#06C755] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-[14px] font-bold text-[#1A1A1A]">AIが自動でお店の情報を読み取ります</p>
                                                <p className="text-[13px] text-[#666666] mt-1">
                                                    ホームページやGoogleマップのURLを入力するだけ。
                                                    <br />営業時間・メニュー・よくある質問などをAIが自動で整理します。
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                                            <input
                                                type="url"
                                                value={siteUrl}
                                                onChange={(e) => setSiteUrl(e.target.value)}
                                                placeholder="https://your-shop.com"
                                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg pl-10 pr-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none"
                                                onKeyDown={(e) => { if (e.key === "Enter") handleAutoSetup(); }}
                                            />
                                        </div>
                                        <button
                                            onClick={handleAutoSetup}
                                            disabled={loading || !siteUrl.trim()}
                                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-lg text-[14px] transition-all active:scale-95 shrink-0"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    読み取り中...
                                                </>
                                            ) : (
                                                <>
                                                    <Sparkles size={16} />
                                                    自動作成
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    {loading && (
                                        <div className="mt-4 bg-[#F5FBF7] rounded-lg p-4 text-center">
                                            <Loader2 size={24} className="animate-spin text-[#06C755] mx-auto mb-2" />
                                            <p className="text-[14px] text-[#333333] font-medium">AIがサイトを読み取っています...</p>
                                            <p className="text-[12px] text-[#999999] mt-1">通常10〜20秒ほどかかります</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* URL auto-setup success */}
                            {inputMode === "url" && autoSetupDone && autoSetupResult && (
                                <div className="bg-[#F5FBF7] border border-[#06C755]/30 rounded-xl p-5 text-center">
                                    <div className="w-12 h-12 rounded-full bg-[#06C755]/20 flex items-center justify-center mx-auto mb-3">
                                        <Check size={24} className="text-[#06C755]" />
                                    </div>
                                    <p className="text-[16px] font-bold text-[#1A1A1A]">
                                        {autoSetupResult.itemsCreated}件の情報を自動登録しました！
                                    </p>
                                    <p className="text-[13px] text-[#666666] mt-2">
                                        おすすめBot名: <strong className="text-[#06C755]">{autoSetupResult.botName}</strong>
                                    </p>
                                    <p className="text-[12px] text-[#999999] mt-2">
                                        ダッシュボードの「お店の情報」からいつでも編集できます。
                                    </p>
                                </div>
                            )}

                            {/* Manual text input mode */}
                            {inputMode === "manual" && (
                                <div>
                                    <input
                                        type="text"
                                        value={knowledgeTitle}
                                        onChange={(e) => setKnowledgeTitle(e.target.value)}
                                        placeholder="タイトル（例: 営業時間・メニュー）"
                                        className="w-full mb-3 bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none"
                                    />
                                    <textarea
                                        value={knowledgeText}
                                        onChange={(e) => setKnowledgeText(e.target.value)}
                                        placeholder={"営業時間: 月〜金 9:00〜18:00\n定休日: 土日・祝日\n電話番号: 03-XXXX-XXXX..."}
                                        rows={6}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none resize-none"
                                    />
                                </div>
                            )}

                            {/* PDF upload mode */}
                            {inputMode === "pdf" && (
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragOver(false);
                                        const file = e.dataTransfer.files[0];
                                        if (file?.type === "application/pdf") handlePDFUpload(file);
                                    }}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                                        dragOver ? "border-[#06C755] bg-[#06C755]/5" : "border-[#E8E8E8] hover:border-[#D0D0D0]"
                                    }`}
                                >
                                    <label className="cursor-pointer block">
                                        <input
                                            type="file" accept=".pdf" className="sr-only"
                                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePDFUpload(f); }}
                                        />
                                        <Upload size={28} className="text-[#AAAAAA] mx-auto mb-3" />
                                        <p className="text-[14px] text-[#666666]">
                                            PDFをドラッグ&ドロップ
                                            <br />または <span className="text-[#06C755] font-medium">クリックして選択</span>
                                        </p>
                                        <p className="text-[12px] text-[#AAAAAA] mt-2">最大5MB</p>
                                    </label>
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-5 py-2.5 rounded-xl text-[13px] text-[#999999] hover:text-[#1A1A1A] border border-[#E8E8E8] hover:border-[#D0D0D0] transition-colors"
                                >
                                    {autoSetupDone ? "後で編集" : "後で登録"}
                                </button>
                                <button
                                    onClick={() => {
                                        if (inputMode === "url" && autoSetupDone) {
                                            setStep(2);
                                        } else if (inputMode === "manual") {
                                            handleKnowledgeSave();
                                        } else if (inputMode === "url" && !autoSetupDone) {
                                            handleAutoSetup();
                                        }
                                    }}
                                    disabled={loading || (inputMode === "pdf")}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[15px] transition-all active:scale-95"
                                >
                                    {loading ? "処理中..." : autoSetupDone ? "次へ" : inputMode === "url" ? "自動作成して次へ" : "保存して次へ"}
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
                            className="bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-1">STEP 2: LINE公式アカウント連携</h2>
                            <p className="text-[13px] text-[#999999] mb-2">
                                <a href="https://developers.line.biz/" target="_blank" rel="noopener noreferrer" className="text-[#06C755] hover:underline inline-flex items-center gap-1">
                                    LINE Developers <ExternalLink size={11} />
                                </a>
                                {" "}からChannel情報を取得してください。
                            </p>

                            <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-xl p-4 mb-5 text-[12px] text-[#666666] leading-relaxed">
                                <p className="font-medium text-[#06C755] mb-2">取得場所：</p>
                                <ol className="space-y-1 list-decimal list-inside">
                                    <li>LINE Developers → プロバイダー → Messaging APIチャンネル</li>
                                    <li>「基本設定」タブ → Channel ID・Channel Secret</li>
                                    <li>「Messaging API設定」タブ → Channel Access Token を発行・コピー</li>
                                </ol>
                            </div>

                            {error && (
                                <div className="mb-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">{error}</div>
                            )}

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[12px] text-[#666666] mb-1.5">Channel ID</label>
                                    <input type="text" value={channelId} onChange={(e) => setChannelId(e.target.value)} placeholder="1234567890"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono" />
                                </div>
                                <div>
                                    <label className="block text-[12px] text-[#666666] mb-1.5">Channel Secret</label>
                                    <input type="password" value={channelSecret} onChange={(e) => setChannelSecret(e.target.value)} placeholder="••••••••••••••••••••••••••••••••"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono" />
                                </div>
                                <div>
                                    <label className="block text-[12px] text-[#666666] mb-1.5">Channel Access Token（長期）</label>
                                    <textarea value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="発行したLong-lived Channel access tokenを貼り付け..." rows={3}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono resize-none" />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setStep(1)}
                                    className="px-5 py-2.5 rounded-xl text-[13px] text-[#999999] hover:text-[#1A1A1A] border border-[#E8E8E8] transition-colors">
                                    戻る
                                </button>
                                <button onClick={handleLineSetup} disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[15px] transition-all active:scale-95">
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
                            className="bg-white border border-[#06C755]/30 rounded-2xl p-6 text-center shadow-sm"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#06C755]/20 flex items-center justify-center mx-auto mb-4">
                                <Check size={28} className="text-[#06C755]" />
                            </div>
                            <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-2">セットアップ完了！ 🎉</h2>
                            <p className="text-[14px] text-[#666666] mb-6">あと一歩。LINE DevelopersでWebhook URLを設定すれば完了です。</p>

                            <div className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl p-4 mb-6">
                                <p className="text-[12px] text-[#999999] mb-2 text-left">Webhook URL（LINE Developersにコピーして貼り付け）</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 text-[12px] text-[#06C755] font-mono text-left break-all">{webhookUrl}</code>
                                    <button onClick={copyWebhookUrl}
                                        className="shrink-0 px-3 py-1.5 bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] rounded-lg text-[12px] flex items-center gap-1 transition-colors">
                                        {copied ? <Check size={12} /> : <Copy size={12} />}
                                        {copied ? "コピー済" : "コピー"}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-xl p-4 mb-6 text-left">
                                <p className="text-[12px] text-[#666666] leading-relaxed">
                                    <strong className="text-[#06C755]">最後の作業:</strong><br />
                                    LINE Developers → Messaging API設定 → Webhook設定 → URLを貼り付け → 「検証」→「有効化」
                                </p>
                            </div>

                            <a href="https://developers.line.biz/" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[13px] text-[#06C755] hover:underline mb-6 mx-auto">
                                LINE Developers を開く <ExternalLink size={13} />
                            </a>

                            <button onClick={() => router.push("/dashboard")}
                                className="w-full bg-[#06C755] hover:bg-[#05B04A] text-white font-bold py-3 rounded-xl text-[15px] transition-all active:scale-95">
                                ダッシュボードへ
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
