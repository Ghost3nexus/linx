"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings, updateLineSettings, getWebhookUrl, importCustomersCSV, importReservationsCSV, type Settings } from "@/lib/apiClient";
import { Save, Bot, Volume2, Bell, Link2, ExternalLink, Copy, Check, CreditCard, Globe, Upload } from "lucide-react";

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

    // Client Stripe key
    const [clientStripeKey, setClientStripeKey] = useState("");

    // Square連携
    const [squareAccessToken, setSquareAccessToken] = useState("");
    const [squareLocationId, setSquareLocationId] = useState("");

    // CSVインポート
    const [importLoading, setImportLoading] = useState(false);
    const [importResult, setImportResult] = useState<{ type: string; imported: number; total: number; errors: string[] } | null>(null);

    async function handleCSVImport(type: "customers" | "reservations", file: File) {
        setImportLoading(true);
        setImportResult(null);
        try {
            const result = type === "customers"
                ? await importCustomersCSV(file)
                : await importReservationsCSV(file);
            setImportResult({ type, imported: result.imported, total: result.total, errors: result.errors });
        } catch (e: unknown) {
            setImportResult({ type, imported: 0, total: 0, errors: [e instanceof Error ? e.message : "インポートに失敗しました"] });
        } finally {
            setImportLoading(false);
        }
    }

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
            const updated = await updateSettings({
                botName,
                tone: tone as Settings["tone"],
                escalationUserId,
                ...(clientStripeKey ? { clientStripeSecretKey: clientStripeKey } : {}),
                ...(squareAccessToken ? { squareAccessToken } : {}),
                ...(squareLocationId ? { squareLocationId } : {}),
            });
            setSettings(updated);
            setClientStripeKey("");
            setSquareAccessToken("");
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
            <h1 className="text-[24px] font-bold text-[#1A1A1A]">設定</h1>
            <p className="text-[#999999] mt-1 text-[14px]">LINXの動作をカスタマイズします</p>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px]">
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
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Bot size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">Bot名</h3>
                            <p className="text-[12px] text-[#999999]">AIアシスタントの名前</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        placeholder="LINX"
                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                    />
                </div>

                {/* Tone */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Volume2 size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">回答のトーン</h3>
                            <p className="text-[12px] text-[#999999]">AIの口調を設定します</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {toneOptions.map((opt) => (
                            <label
                                key={opt.value}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${tone === opt.value
                                    ? "border-[#06C755]/40 bg-[#06C755]/5"
                                    : "border-[#E8E8E8] hover:border-[#D0D0D0]"
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
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${tone === opt.value ? "border-[#06C755]" : "border-[#AAAAAA]"
                                    }`}>
                                    {tone === opt.value && <div className="w-2 h-2 rounded-full bg-[#06C755]" />}
                                </div>
                                <div>
                                    <p className="text-[14px] text-[#1A1A1A]">{opt.label}</p>
                                    <p className="text-[12px] text-[#999999]">{opt.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Escalation */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#FFB800]/10 flex items-center justify-center">
                            <Bell size={18} className="text-[#FFB800]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">エスカレーション通知先</h3>
                            <p className="text-[12px] text-[#999999]">AIが回答できない場合の通知先（LINE UserID）</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={escalationUserId}
                        onChange={(e) => setEscalationUserId(e.target.value)}
                        placeholder="Uxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors font-mono"
                    />
                </div>

                {/* LINE連携設定 */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Link2 size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">LINE公式アカウント連携</h3>
                            <p className="text-[12px] text-[#999999]">Channel情報を入力してLINEと接続</p>
                        </div>
                    </div>

                    {lineError && (
                        <div className="mb-3 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">{lineError}</div>
                    )}
                    {lineSuccess && (
                        <div className="mb-3 bg-[#06C755]/10 border border-[#06C755]/30 rounded-lg p-3 text-[#06C755] text-[13px]">✅ {lineSuccess}</div>
                    )}

                    <div className="space-y-3 mb-4">
                        <div>
                            <label className="block text-[12px] text-[#666666] mb-1.5">Channel ID</label>
                            <input
                                type="text"
                                value={lineChannelId}
                                onChange={(e) => setLineChannelId(e.target.value)}
                                placeholder="1234567890"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666666] mb-1.5">Channel Secret</label>
                            <input
                                type="password"
                                value={lineChannelSecret}
                                onChange={(e) => setLineChannelSecret(e.target.value)}
                                placeholder="••••••••••••••••••••••••••••••••"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#666666] mb-1.5">Channel Access Token（長期）</label>
                            <textarea
                                value={lineAccessToken}
                                onChange={(e) => setLineAccessToken(e.target.value)}
                                placeholder="発行したLong-lived Channel access tokenを貼り付け..."
                                rows={3}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono resize-none"
                            />
                        </div>
                    </div>

                    {webhookUrl && (
                        <div className="bg-[#F9FAFB] border border-[#06C755]/30 rounded-lg p-3 mb-4">
                            <p className="text-[11px] text-[#999999] mb-1.5">Webhook URL（LINE Developersに設定）</p>
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
                            className="flex items-center gap-1 text-[12px] text-[#999999] hover:text-[#666666] transition-colors"
                        >
                            LINE Developers <ExternalLink size={11} />
                        </a>
                    </div>
                </div>

                {/* Stripe連携（クライアント用） */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#635BFF]/10 flex items-center justify-center">
                            <CreditCard size={18} className="text-[#635BFF]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">お客様用の決済連携（Stripe）</h3>
                            <p className="text-[12px] text-[#999999]">あなたのお客様が支払う決済の接続です（入金はあなたのStripeアカウントに届きます）</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[12px] text-[#999999] mb-1.5">Stripe Secret Key</label>
                            <input
                                type="password"
                                value={clientStripeKey}
                                onChange={(e) => setClientStripeKey(e.target.value)}
                                placeholder="sk_live_xxxxxxxxxxxx"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                            <p className="text-[11px] text-[#AAAAAA] mt-1">
                                Stripe Dashboard → 開発者 → APIキー → シークレットキーをコピー
                            </p>
                        </div>

                        {settings?.clientStripeConnected && (
                            <div className="flex items-center gap-2 text-[14px] text-[#06C755]">
                                <Check size={16} />
                                Stripe接続済み — お客様の決済はあなたのStripeアカウントに届きます
                            </div>
                        )}

                        <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-3">
                            <p className="text-[12px] text-[#F57F17]">
                                Stripe APIキーは暗号化して保存されます。第三者に共有しないでください。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Square連携 */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#1A1A1A]/10 flex items-center justify-center">
                            <CreditCard size={18} className="text-[#1A1A1A]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">決済連携（Square）</h3>
                            <p className="text-[12px] text-[#999999]">Squareをお使いの場合はこちらを設定してください（Stripeとどちらか一方でOK）</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[12px] text-[#999999] mb-1.5">Square Access Token</label>
                            <input
                                type="password"
                                value={squareAccessToken}
                                onChange={(e) => setSquareAccessToken(e.target.value)}
                                placeholder="EAAAxxxxxxxxxxxxxxxx"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                            <p className="text-[11px] text-[#AAAAAA] mt-1">
                                Square Developer → Applications → Access Token をコピー
                            </p>
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#999999] mb-1.5">Square Location ID</label>
                            <input
                                type="text"
                                value={squareLocationId}
                                onChange={(e) => setSquareLocationId(e.target.value)}
                                placeholder="LxxxxxxxxxxxxxxX"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none font-mono"
                            />
                            <p className="text-[11px] text-[#AAAAAA] mt-1">
                                Square Dashboard → 店舗情報 → Location ID をコピー
                            </p>
                        </div>

                        {settings && (settings as Record<string, unknown>).squareConnected && (
                            <div className="flex items-center gap-2 text-[14px] text-[#06C755]">
                                <Check size={16} />
                                Square接続済み
                            </div>
                        )}

                        <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-3">
                            <p className="text-[12px] text-[#F57F17]">
                                Square APIキーは暗号化して保存されます。Stripeと両方設定した場合、Squareが優先されます。
                            </p>
                        </div>
                    </div>
                </div>

                {/* LP・LINE連携 */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                            <Globe size={18} className="text-[#06C755]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">LP・LINE連携</h3>
                            <p className="text-[12px] text-[#999999]">お客様がLINEで友だち追加できる導線を設置します</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-[12px] text-[#999999] mb-1.5">LINE友だち追加URL</label>
                            <input
                                type="text"
                                placeholder="https://lin.ee/xxxxx"
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-3 py-2.5 text-[13px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors font-mono"
                            />
                            <p className="text-[11px] text-[#AAAAAA] mt-1">LINE Official Account Manager → 友だち追加 → URLから取得</p>
                        </div>
                        <div>
                            <label className="block text-[12px] text-[#999999] mb-1.5">LP埋め込みコード</label>
                            <div className="bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg p-3">
                                <code className="text-[12px] text-[#666666] break-all">
                                    {`<a href="LINE_URL" style="background:#06C755;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">LINEで予約する</a>`}
                                </code>
                            </div>
                            <p className="text-[11px] text-[#AAAAAA] mt-1">このコードをホームページに貼り付けると、LINE友だち追加ボタンが表示されます</p>
                        </div>
                    </div>
                </div>

                {/* Payment URL (Square/LINE Pay/PayPay etc) */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                            <ExternalLink size={18} className="text-[#FF6B00]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">その他の決済連携</h3>
                            <p className="text-[12px] text-[#999999]">Square・LINE Pay・PayPay等の決済URLを設定できます</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="text-[13px] text-[#666666]">
                            Stripe以外の決済サービスをお使いの場合、決済ページのURLを登録するとAIがお客様に案内します。
                        </p>
                        <div>
                            <label className="block text-[12px] text-[#999999] mb-1.5">決済ページURL</label>
                            <input
                                type="url"
                                placeholder="https://squareup.com/... や https://pay.line.me/..."
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none"
                            />
                            <p className="text-[11px] text-[#AAAAAA] mt-1">
                                Square・LINE Pay・PayPay・銀行振込ページなど、お客様が支払いに使うURLを入力してください
                            </p>
                        </div>
                        <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-lg p-3">
                            <p className="text-[12px] text-[#666666]">
                                💡 URLを設定すると、AIが「お支払いはこちらから」と自動で案内します
                            </p>
                        </div>
                    </div>
                </div>

                {/* CSV Import */}
                <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-[#2196F3]/10 flex items-center justify-center">
                            <Upload size={18} className="text-[#2196F3]" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-medium text-[#1A1A1A]">データインポート</h3>
                            <p className="text-[12px] text-[#999999]">CSVファイルから顧客・予約データを一括インポート</p>
                        </div>
                    </div>

                    {importResult && (
                        <div className={`mb-4 rounded-lg p-3 text-[13px] ${importResult.errors.length > 0 && importResult.imported === 0
                            ? "bg-[#E53935]/10 border border-[#E53935]/30 text-[#E53935]"
                            : "bg-[#06C755]/10 border border-[#06C755]/30 text-[#06C755]"
                        }`}>
                            <p className="font-medium">
                                {importResult.type === "customers" ? "顧客" : "予約"}インポート結果: {importResult.imported}/{importResult.total}件成功
                            </p>
                            {importResult.errors.length > 0 && (
                                <ul className="mt-2 text-[12px] text-[#E53935] space-y-0.5">
                                    {importResult.errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            )}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <p className="text-[13px] text-[#1A1A1A] font-medium mb-1.5">顧客データ</p>
                            <p className="text-[11px] text-[#999999] mb-2">CSV形式: 名前,メール,電話,プラン,メモ</p>
                            <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium cursor-pointer transition-colors ${
                                importLoading ? "bg-gray-100 text-[#999999]" : "bg-[#F9FAFB] border border-[#E8E8E8] text-[#666666] hover:border-[#2196F3] hover:text-[#2196F3]"
                            }`}>
                                <Upload size={14} />
                                {importLoading ? "インポート中..." : "CSVを選択"}
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    disabled={importLoading}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleCSVImport("customers", file);
                                        e.target.value = "";
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            <p className="text-[13px] text-[#1A1A1A] font-medium mb-1.5">予約データ</p>
                            <p className="text-[11px] text-[#999999] mb-2">CSV形式: 顧客名,日付,開始時間,終了時間,サービス,メモ</p>
                            <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium cursor-pointer transition-colors ${
                                importLoading ? "bg-gray-100 text-[#999999]" : "bg-[#F9FAFB] border border-[#E8E8E8] text-[#666666] hover:border-[#2196F3] hover:text-[#2196F3]"
                            }`}>
                                <Upload size={14} />
                                {importLoading ? "インポート中..." : "CSVを選択"}
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    disabled={importLoading}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleCSVImport("reservations", file);
                                        e.target.value = "";
                                    }}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Plan info (read-only) */}
                {settings && (
                    <div className="bg-white border border-[#E8E8E8] rounded-xl p-6">
                        <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-3">プラン情報</h3>
                        <div className="flex gap-6 text-[14px]">
                            <div>
                                <p className="text-[#999999] text-[12px]">現在のプラン</p>
                                <p className="text-[#1A1A1A] font-medium mt-0.5">{settings.plan.charAt(0).toUpperCase() + settings.plan.slice(1)}</p>
                            </div>
                            <div>
                                <p className="text-[#999999] text-[12px]">月間上限</p>
                                <p className="text-[#1A1A1A] font-medium mt-0.5">{settings.planLimits.maxMonthlyResponses.toLocaleString()} 回</p>
                            </div>
                            <div>
                                <p className="text-[#999999] text-[12px]">情報登録上限</p>
                                <p className="text-[#1A1A1A] font-medium mt-0.5">{settings.planLimits.maxKnowledgeFiles} ファイル</p>
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
