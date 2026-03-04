"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings, updateLineSettings, getWebhookUrl, type Settings } from "@/lib/apiClient";
import { Save, Bot, Volume2, Bell, Link2, ExternalLink, Copy, Check } from "lucide-react";

const toneOptions = [
    { value: "professional", label: "プロフェッショナル", desc: "丁寧でありつつ親しみやすい" },
    { value: "casual", label: "カジュアル", desc: "友だちのように親しみやすい" },
    { value: "formal", label: "フォーマル", desc: "敬語を使ったフォーマルな対応" },
] as const;

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [botName, setBotName] = useState("LINX");
    const [tone, setTone] = useState<string>("professional");
    const [escalationUserId, setEscalationUserId] = useState("");

    // LINE連携設定
    const [lineChannelId, setLineChannelId] = useState("");
    const [lineChannelSecret, setLineChannelSecret] = useState("");
    const [lineAccessToken, setLineAccessToken] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [lineLoading, setLineLoading] = useState(false);
    const [lineError, setLineError] = useState("");
    const [lineSuccess, setLineSuccess] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        getSettings()
            .then((s) => {
                setSettings(s);
                setBotName(s.botName || "LINX");
                setTone(s.tone || "professional");
                setEscalationUserId(s.escalationUserId || "");
                if (s.lineChannelId) setLineChannelId(s.lineChannelId);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));

        // Webhook URL取得
        getWebhookUrl().then((r) => setWebhookUrl(r.webhookUrl)).catch(() => { });
    }, []);

    async function handleSave() {
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const updated = await updateSettings({ botName, tone: tone as Settings["tone"], escalationUserId });
            setSettings(updated);
            setSuccess("設定を保存しました");
            setTimeout(() => setSuccess(""), 3000);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "保存に失敗しました");
        } finally {
            setSaving(false);
        }
    }

    async function handleLineSetup() {
        if (!lineChannelId || !lineChannelSecret || !lineAccessToken) {
            setLineError("すべての項目を入力してください");
            return;
        }
        setLineLoading(true);
        setLineError("");
        setLineSuccess("");
        try {
            const result = await updateLineSettings(lineChannelId, lineChannelSecret, lineAccessToken);
            setWebhookUrl(result.webhookUrl);
            setLineSuccess("接続成功！Webhook URLをLINE Developersに設定してください。");
        } catch (e: unknown) {
            setLineError(e instanceof Error ? e.message : "LINE接続に失敗しました");
        } finally {
            setLineLoading(false);
        }
    }

    function copyWebhookUrl() {
        navigator.clipboard.writeText(webhookUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-[24px] font-bold text-white">設定</h1>
            <p className="text-[#6B7280] mt-1 text-[14px]">LINXの動作をカスタマイズします</p>

            {error && (
                <div className="mt-4 bg-[#FF3366]/10 border border-[#FF3366]/30 rounded-lg p-4 text-[#FF3366] text-[14px]">
                    {error}
                </div>
            )}
            {success && (
                <div className="mt-4 bg-[#06C755]/10 border border-[#06C755]/30 rounded-lg p-4 text-[#06C755] text-[14px]">
                    ✅ {success}
                </div>
            )}

            <div className="mt-8 space-y-6 max-w-[640px]">
                {/* Bot Name */}
                <div className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Bot size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-white">Bot名</h3>
                            <p className="text-[12px] text-[#6B7280]">AIアシスタントの名前</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        placeholder="LINX"
                        className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none transition-colors"
                    />
                </div>

                {/* Tone */}
                <div className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Volume2 size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-white">回答のトーン</h3>
                            <p className="text-[12px] text-[#6B7280]">AIの口調を設定します</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {toneOptions.map((opt) => (
                            <label
                                key={opt.value}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${tone === opt.value
                                    ? "border-[#06C755]/40 bg-[#06C755]/5"
                                    : "border-[#1A1A2E] hover:border-[#2A2A3E]"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="tone"
                                    value={opt.value}
                                    checked={tone === opt.value}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${tone === opt.value ? "border-[#06C755]" : "border-[#4B5563]"
                                    }`}>
                                    {tone === opt.value && <div className="w-2 h-2 rounded-full bg-[#06C755]" />}
                                </div>
                                <div>
                                    <p className="text-[14px] text-white">{opt.label}</p>
                                    <p className="text-[12px] text-[#6B7280]">{opt.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Escalation */}
                <div className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#FFB800]/10 flex items-center justify-center">
                            <Bell size={18} className="text-[#FFB800]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-white">エスカレーション通知先</h3>
                            <p className="text-[12px] text-[#6B7280]">AIが回答できない場合の通知先（LINE UserID）</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={escalationUserId}
                        onChange={(e) => setEscalationUserId(e.target.value)}
                        placeholder="Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none transition-colors font-mono"
                    />
                </div>

                {/* LINE連携設定 */}
                <div className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Link2 size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-white">LINE公式アカウント連携</h3>
                            <p className="text-[12px] text-[#6B7280]">Channel情報を入力してLINEと接続</p>
                        </div>
                    </div>

                    {lineError && (
                        <div className="mb-3 bg-[#FF3366]/10 border border-[#FF3366]/30 rounded-lg p-3 text-[#FF3366] text-[13px]">{lineError}</div>
                    )}
                    {lineSuccess && (
                        <div className="mb-3 bg-[#06C755]/10 border border-[#06C755]/30 rounded-lg p-3 text-[#06C755] text-[13px]">✅ {lineSuccess}</div>
                    )}

                    <div className="space-y-3 mb-4">
                        <div>
                            <label className="block text-[12px] text-[#9CA3AF] mb-1.5">Channel ID</label>
                            <input
                                type="text"
                                value={lineChannelId}
                                onChange={(e) => setLineChannelId(e.target.value)}
                                placeholder="1234567890"
                                className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#9CA3AF] mb-1.5">Channel Secret</label>
                            <input
                                type="password"
                                value={lineChannelSecret}
                                onChange={(e) => setLineChannelSecret(e.target.value)}
                                placeholder="••••••••••••••••••••••••••••••••"
                                className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#9CA3AF] mb-1.5">Channel Access Token（長期）</label>
                            <textarea
                                value={lineAccessToken}
                                onChange={(e) => setLineAccessToken(e.target.value)}
                                placeholder="発行したLong-lived Channel access tokenを貼り付け..."
                                rows={3}
                                className="w-full bg-[#0D1117] border border-[#1A1A2E] rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none font-mono resize-none"
                            />
                        </div>
                    </div>

                    {webhookUrl && (
                        <div className="bg-[#0D1117] border border-[#06C755]/30 rounded-lg p-3 mb-4">
                            <p className="text-[11px] text-[#6B7280] mb-1.5">Webhook URL（LINE Developersに設定）</p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 text-[11px] text-[#06C755] font-mono break-all">{webhookUrl}</code>
                                <button
                                    onClick={copyWebhookUrl}
                                    className="shrink-0 px-2 py-1 bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] rounded text-[11px] flex items-center gap-1 transition-colors"
                                >
                                    {copied ? <Check size={11} /> : <Copy size={11} />}
                                    {copied ? "コピー済" : "コピー"}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLineSetup}
                            disabled={lineLoading}
                            className="flex items-center gap-2 bg-[#06C755] hover:bg-[#08E065] disabled:opacity-50 text-white font-medium px-4 py-2.5 rounded-lg text-[13px] transition-colors"
                        >
                            <Link2 size={14} />
                            {lineLoading ? "接続テスト中..." : "接続テスト・保存"}
                        </button>
                        <a
                            href="https://developers.line.biz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[12px] text-[#6B7280] hover:text-[#9CA3AF] transition-colors"
                        >
                            LINE Developers <ExternalLink size={11} />
                        </a>
                    </div>
                </div>

                {/* Plan info (read-only) */}
                {settings && (
                    <div className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl p-6">
                        <h3 className="text-[15px] font-medium text-white mb-3">プラン情報</h3>
                        <div className="flex gap-6 text-[14px]">
                            <div>
                                <p className="text-[#6B7280] text-[12px]">現在のプラン</p>
                                <p className="text-white font-medium mt-0.5">{settings.plan.charAt(0).toUpperCase() + settings.plan.slice(1)}</p>
                            </div>
                            <div>
                                <p className="text-[#6B7280] text-[12px]">月間上限</p>
                                <p className="text-white font-medium mt-0.5">{settings.planLimits.maxMonthlyResponses.toLocaleString()} 回</p>
                            </div>
                            <div>
                                <p className="text-[#6B7280] text-[12px]">ナレッジ上限</p>
                                <p className="text-white font-medium mt-0.5">{settings.planLimits.maxKnowledgeFiles} ファイル</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#06C755] hover:bg-[#08E065] disabled:opacity-50 text-white font-medium px-6 py-3 rounded-lg text-[14px] transition-colors"
                >
                    <Save size={16} />
                    {saving ? "保存中..." : "設定を保存"}
                </button>
            </div>
        </div>
    );
}
