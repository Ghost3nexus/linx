"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Link2, Check, ChevronRight, Copy, ExternalLink, FileText, Globe, Sparkles, Loader2, HelpCircle } from "lucide-react";
import { addKnowledge, uploadPDF, updateLineSettings, autoSetupFromUrl } from "@/lib/apiClient";

const steps = [
    { id: 1, icon: FileText, label: "お店の情報を登録", desc: "AIが回答する情報を登録" },
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
    const [showGuide, setShowGuide] = useState(false);

    async function handleAutoSetup() {
        if (!siteUrl.trim()) { setError("URLを入力してください"); return; }
        setLoading(true); setError("");
        try {
            const result = await autoSetupFromUrl(siteUrl);
            setAutoSetupDone(true);
            setAutoSetupResult({ itemsCreated: result.itemsCreated, botName: result.suggestion.botName });
        } catch (err: unknown) { setError(err instanceof Error ? err.message : "読み込みに失敗しました"); }
        finally { setLoading(false); }
    }

    async function handleKnowledgeSave() {
        if (!knowledgeText.trim() && !knowledgeTitle.trim()) { setStep(2); return; }
        setLoading(true); setError("");
        try { await addKnowledge(knowledgeTitle || "会社情報", knowledgeText); setStep(2); }
        catch (err: unknown) { setError(err instanceof Error ? err.message : "保存に失敗しました"); }
        finally { setLoading(false); }
    }

    async function handlePDFUpload(file: File) {
        setLoading(true); setError("");
        try { await uploadPDF(file); setStep(2); }
        catch (err: unknown) { setError(err instanceof Error ? err.message : "アップロードに失敗しました"); }
        finally { setLoading(false); }
    }

    async function handleLineSetup() {
        if (!channelId || !channelSecret || !accessToken) { setError("すべての項目を入力してください"); return; }
        setLoading(true); setError("");
        try {
            const result = await updateLineSettings(channelId, channelSecret, accessToken);
            setWebhookUrl(result.webhookUrl);
            setStep(3);
        } catch (err: unknown) { setError(err instanceof Error ? err.message : "接続に失敗しました"); }
        finally { setLoading(false); }
    }

    function copyWebhookUrl() {
        navigator.clipboard.writeText(webhookUrl);
        setCopied(true); setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-[600px]">
                <div className="text-center mb-10">
                    <h1 className="text-[26px] font-bold text-[#1A1A1A]">導入セットアップ</h1>
                    <p className="text-[14px] text-[#999999] mt-2">3ステップで完了。5分でAIが動き始めます。</p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-center gap-0 mb-10">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center">
                            <div className={`flex flex-col items-center ${i < steps.length - 1 ? "w-[120px]" : ""}`}>
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300 ${step > s.id ? "bg-[#06C755] text-white" : step === s.id ? "bg-[#06C755]/20 border-2 border-[#06C755] text-[#06C755]" : "bg-white border border-[#E8E8E8] text-[#AAAAAA]"}`}>
                                    {step > s.id ? <Check size={16} /> : s.id}
                                </div>
                                <span className={`text-[11px] mt-1.5 text-center leading-tight ${step === s.id ? "text-[#06C755]" : "text-[#AAAAAA]"}`}>{s.label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`h-[2px] w-12 mb-5 mx-1 transition-all duration-300 ${step > s.id ? "bg-[#06C755]" : "bg-[#E8E8E8]"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                            className="bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-1">STEP 1: お店の情報を登録</h2>
                            <p className="text-[13px] text-[#999999] mb-5">AIがお客様に回答するための情報を登録します。</p>

                            {error && <div className="mb-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">{error}</div>}

                            <div className="flex gap-2 mb-5">
                                {[
                                    { id: "url" as const, label: "URLから自動", icon: Sparkles, rec: true },
                                    { id: "manual" as const, label: "手入力", icon: FileText, rec: false },
                                    { id: "pdf" as const, label: "PDF", icon: Upload, rec: false },
                                ].map((tab) => (
                                    <button key={tab.id} onClick={() => { setInputMode(tab.id); setError(""); }}
                                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${inputMode === tab.id ? "bg-[#06C755] text-white shadow-md" : "bg-[#F9FAFB] text-[#666666] border border-[#E8E8E8]"}`}>
                                        <tab.icon size={14} />{tab.label}
                                        {tab.rec && inputMode !== tab.id && <span className="text-[10px] bg-[#06C755] text-white px-1.5 py-0.5 rounded-full ml-1">おすすめ</span>}
                                    </button>
                                ))}
                            </div>

                            {inputMode === "url" && !autoSetupDone && (
                                <div>
                                    <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-xl p-4 mb-4">
                                        <p className="text-[14px] font-bold text-[#1A1A1A]">💡 ホームページURLを入れるだけ</p>
                                        <p className="text-[13px] text-[#666666] mt-1">AIが自動でお店の情報を読み取って登録します。</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAAAAA]" />
                                            <input type="url" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="https://your-shop.com"
                                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg pl-10 pr-4 py-3 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none"
                                                onKeyDown={(e) => { if (e.key === "Enter") handleAutoSetup(); }} />
                                        </div>
                                        <button onClick={handleAutoSetup} disabled={loading || !siteUrl.trim()}
                                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-lg text-[14px] transition-all shrink-0">
                                            {loading ? <><Loader2 size={16} className="animate-spin" />読み取り中...</> : <><Sparkles size={16} />自動作成</>}
                                        </button>
                                    </div>
                                    {loading && (
                                        <div className="mt-4 bg-[#F5FBF7] rounded-lg p-4 text-center">
                                            <Loader2 size={24} className="animate-spin text-[#06C755] mx-auto mb-2" />
                                            <p className="text-[14px] text-[#333333] font-medium">AIがサイトを読み取っています...</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {inputMode === "url" && autoSetupDone && autoSetupResult && (
                                <div className="bg-[#F5FBF7] border border-[#06C755]/30 rounded-xl p-5 text-center">
                                    <Check size={24} className="text-[#06C755] mx-auto mb-2" />
                                    <p className="text-[16px] font-bold text-[#1A1A1A]">{autoSetupResult.itemsCreated}件の情報を自動登録しました！</p>
                                </div>
                            )}

                            {inputMode === "manual" && (
                                <div>
                                    <input type="text" value={knowledgeTitle} onChange={(e) => setKnowledgeTitle(e.target.value)} placeholder="タイトル（例: 営業時間・メニュー）"
                                        className="w-full mb-3 bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none" />
                                    <textarea value={knowledgeText} onChange={(e) => setKnowledgeText(e.target.value)} placeholder={"営業時間: 月〜金 9:00〜18:00\n定休日: 土日・祝日"} rows={6}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none resize-none" />
                                </div>
                            )}

                            {inputMode === "pdf" && (
                                <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f?.type === "application/pdf") handlePDFUpload(f); }}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer ${dragOver ? "border-[#06C755] bg-[#06C755]/5" : "border-[#E8E8E8]"}`}>
                                    <label className="cursor-pointer block">
                                        <input type="file" accept=".pdf" className="sr-only" onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePDFUpload(f); }} />
                                        <Upload size={28} className="text-[#AAAAAA] mx-auto mb-3" />
                                        <p className="text-[14px] text-[#666666]">PDFをドラッグ&ドロップ<br />または <span className="text-[#06C755] font-medium">クリックして選択</span></p>
                                    </label>
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setStep(2)} className="px-5 py-2.5 rounded-xl text-[13px] text-[#999999] border border-[#E8E8E8]">後で登録</button>
                                <button onClick={() => { if (inputMode === "url" && autoSetupDone) setStep(2); else if (inputMode === "manual") handleKnowledgeSave(); else if (inputMode === "url") handleAutoSetup(); }}
                                    disabled={loading || inputMode === "pdf"}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[15px] transition-all">
                                    {loading ? "処理中..." : autoSetupDone ? "次へ" : "次へ"}<ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: LINE連携（強化版ガイド付き） */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                            className="bg-white border border-[#E8E8E8] rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-1">STEP 2: LINE公式アカウント連携</h2>
                            <p className="text-[13px] text-[#999999] mb-4">お使いのLINE公式アカウントとLINXをつなげます。</p>

                            {error && <div className="mb-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">{error}</div>}

                            {/* ガイド開閉ボタン */}
                            <button onClick={() => setShowGuide(!showGuide)}
                                className="w-full flex items-center justify-between bg-[#F5FBF7] border border-[#06C755]/20 rounded-xl p-4 mb-5 text-left">
                                <div className="flex items-center gap-2">
                                    <HelpCircle size={18} className="text-[#06C755]" />
                                    <span className="text-[14px] font-bold text-[#1A1A1A]">やり方がわからない方はこちら（図解ガイド）</span>
                                </div>
                                <ChevronRight size={16} className={`text-[#06C755] transition-transform ${showGuide ? "rotate-90" : ""}`} />
                            </button>

                            {/* 図解ガイド */}
                            {showGuide && (
                                <div className="mb-5 bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl p-5 space-y-6">
                                    <p className="text-[13px] text-[#666666] mb-2">以下の手順に沿って、LINE公式アカウントの情報を取得してください。</p>

                                    {/* Step 1 */}
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[#06C755] text-white text-[13px] font-bold flex items-center justify-center shrink-0">1</div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">LINE Developersにログイン</p>
                                            <p className="text-[13px] text-[#666666] mt-1">
                                                <a href="https://developers.line.biz/" target="_blank" rel="noopener noreferrer" className="text-[#06C755] underline inline-flex items-center gap-1">
                                                    https://developers.line.biz/ <ExternalLink size={11} />
                                                </a>
                                                にアクセスして、LINE公式アカウントに紐づいたLINEアカウントでログインしてください。
                                            </p>
                                            <div className="mt-2 bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-3">
                                                <p className="text-[12px] text-[#F57F17]">⚠️ 初めての場合は「プロバイダー」の作成が必要です。名前は何でもOK（お店の名前など）。</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[#06C755] text-white text-[13px] font-bold flex items-center justify-center shrink-0">2</div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">Messaging APIチャンネルを作成</p>
                                            <p className="text-[13px] text-[#666666] mt-1">
                                                プロバイダーを選択 → 「チャンネル設定」→「Messaging API」を選択 → 必要項目を入力して作成。
                                            </p>
                                            <div className="mt-2 bg-white border border-[#E8E8E8] rounded-lg p-3">
                                                <p className="text-[12px] text-[#999999]">💡 既にMessaging APIが有効なLINE公式アカウントの場合は、この手順はスキップできます。</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[#06C755] text-white text-[13px] font-bold flex items-center justify-center shrink-0">3</div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">3つの情報をコピー</p>
                                            <div className="mt-2 space-y-2 text-[13px] text-[#666666]">
                                                <div className="bg-white border border-[#E8E8E8] rounded-lg p-3">
                                                    <p className="font-bold text-[#1A1A1A]">① Channel ID</p>
                                                    <p>「基本設定」タブ → 「チャネル基本設定」→ Channel ID をコピー</p>
                                                </div>
                                                <div className="bg-white border border-[#E8E8E8] rounded-lg p-3">
                                                    <p className="font-bold text-[#1A1A1A]">② Channel Secret</p>
                                                    <p>「基本設定」タブ → 下にスクロール → Channel Secret の「コピー」ボタン</p>
                                                </div>
                                                <div className="bg-white border border-[#E8E8E8] rounded-lg p-3">
                                                    <p className="font-bold text-[#1A1A1A]">③ Channel Access Token</p>
                                                    <p>「Messaging API設定」タブ → 一番下 → 「発行」ボタンを押す → 表示されたトークンをコピー</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="flex gap-3">
                                        <div className="w-7 h-7 rounded-full bg-[#06C755] text-white text-[13px] font-bold flex items-center justify-center shrink-0">4</div>
                                        <div>
                                            <p className="text-[14px] font-bold text-[#1A1A1A]">下のフォームに貼り付けて「接続テスト」</p>
                                            <p className="text-[13px] text-[#666666] mt-1">3つの情報を下の入力欄に貼り付けて、「接続して次へ」を押してください。</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-lg p-3 text-center">
                                        <p className="text-[13px] text-[#666666]">
                                            😵 それでもわからない場合は
                                            <a href="https://calendar.app.google/2aFsQTibv5HJKivE9" target="_blank" rel="noopener noreferrer" className="text-[#06C755] font-bold underline ml-1">
                                                オンラインで一緒に設定しましょう（無料）
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* 入力フォーム */}
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5 font-medium">① Channel ID</label>
                                    <input type="text" value={channelId} onChange={(e) => setChannelId(e.target.value)} placeholder="1234567890"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5 font-medium">② Channel Secret</label>
                                    <input type="password" value={channelSecret} onChange={(e) => setChannelSecret(e.target.value)} placeholder="英数字32文字"
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono" />
                                </div>
                                <div>
                                    <label className="block text-[13px] text-[#666666] mb-1.5 font-medium">③ Channel Access Token（長い文字列）</label>
                                    <textarea value={accessToken} onChange={(e) => setAccessToken(e.target.value)} placeholder="「Messaging API設定」タブの一番下で発行したトークンを貼り付け" rows={3}
                                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono resize-none" />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl text-[13px] text-[#999999] border border-[#E8E8E8]">戻る</button>
                                <button onClick={handleLineSetup} disabled={loading}
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-[15px] transition-all">
                                    {loading ? "接続テスト中..." : "接続して次へ"}<ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: 完了 + Webhook設定ガイド */}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                            className="bg-white border border-[#06C755]/30 rounded-2xl p-6 text-center shadow-sm">
                            <div className="w-14 h-14 rounded-full bg-[#06C755]/20 flex items-center justify-center mx-auto mb-4">
                                <Check size={28} className="text-[#06C755]" />
                            </div>
                            <h2 className="text-[22px] font-bold text-[#1A1A1A] mb-2">接続成功！あと1つだけ 🎉</h2>
                            <p className="text-[14px] text-[#666666] mb-6">LINE DevelopersでWebhook URLを設定すれば完了です。</p>

                            {/* Webhook URL */}
                            <div className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl p-4 mb-4 text-left">
                                <p className="text-[12px] text-[#999999] mb-2">このURLをコピーしてください 👇</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 text-[13px] text-[#06C755] font-mono break-all">{webhookUrl}</code>
                                    <button onClick={copyWebhookUrl}
                                        className="shrink-0 px-3 py-1.5 bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] rounded-lg text-[12px] flex items-center gap-1">
                                        {copied ? <Check size={12} /> : <Copy size={12} />}
                                        {copied ? "コピー済" : "コピー"}
                                    </button>
                                </div>
                            </div>

                            {/* Webhook設定ガイド */}
                            <div className="bg-[#FAFAFA] border border-[#E8E8E8] rounded-xl p-4 mb-6 text-left space-y-3">
                                <p className="text-[14px] font-bold text-[#1A1A1A]">📋 Webhook URLの設定方法</p>
                                <div className="flex gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <p className="text-[13px] text-[#666666]">LINE Developers → Messaging API設定 タブを開く</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <p className="text-[13px] text-[#666666]">「Webhook設定」→「Webhook URL」に上のURLを貼り付け</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <p className="text-[13px] text-[#666666]">「検証」ボタンを押して成功を確認</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#06C755] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                                    <p className="text-[13px] text-[#666666]">「Webhookの利用」を<strong className="text-[#1A1A1A]">オン</strong>にする</p>
                                </div>
                                <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-3 mt-2">
                                    <p className="text-[12px] text-[#F57F17]">⚠️ 「応答メッセージ」は必ず<strong>オフ</strong>にしてください（LINXが応答するため）</p>
                                </div>
                            </div>

                            <a href="https://developers.line.biz/" target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[13px] text-[#06C755] hover:underline mb-6">
                                LINE Developers を開く <ExternalLink size={13} />
                            </a>

                            <button onClick={() => router.push("/dashboard")}
                                className="w-full bg-[#06C755] hover:bg-[#05B04A] text-white font-bold py-3 rounded-xl text-[15px] transition-all">
                                ダッシュボードへ
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
