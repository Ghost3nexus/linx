"use client";

import { useState } from "react";
import { FileText, ArrowRight, Download, Mail, Building2, User, Phone, Globe, Briefcase, CheckCircle2 } from "lucide-react";

export default function DocumentsPage() {
    const [showForm, setShowForm] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [industry, setIndustry] = useState("");
    const [website, setWebsite] = useState("");
    const [sending, setSending] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name || !email) return;
        setSending(true);
        setError("");
        try {
            const apiUrl = process.env.NEXT_PUBLIC_LINX_API_URL || "https://linx-server-production.up.railway.app/api";
            const res = await fetch(`${apiUrl}/documents/request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, company, phone, industry, website }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "送信に失敗しました");
            }
            setFormSubmitted(true);
            setShowForm(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "送信に失敗しました");
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-[#F0F0F0] bg-white sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-6 h-[64px] flex items-center justify-between">
                    <a href="/" className="text-[22px] font-bold tracking-tight text-[#1A1A1A]">
                        LIN<span className="text-[#06C755]">X</span>
                    </a>
                    <div className="flex items-center gap-3">
                        <a
                            href="/login"
                            className="inline-flex items-center gap-2 bg-[#06C755] text-white font-bold px-5 py-2.5 rounded-full text-[14px] hover:bg-[#05B04A] transition-all duration-300"
                        >
                            無料ではじめる
                        </a>
                    </div>
                </div>
            </header>

            {/* Lead Form Gate */}
            {showForm && !formSubmitted && (
                <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-20">
                    <div className="w-full max-w-[480px]">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-[#E8F5E9] flex items-center justify-center mx-auto mb-5">
                                <FileText size={32} className="text-[#06C755]" />
                            </div>
                            <h1 className="text-[28px] sm:text-[36px] font-bold text-[#1A1A1A]" style={{ lineHeight: 1.3 }}>
                                LINX サービス資料
                            </h1>
                            <p className="text-[16px] text-[#666666] mt-3 leading-relaxed">
                                AI自動応答・予約管理・決済・顧客管理の<br className="hidden sm:block" />
                                機能と料金をまとめた資料をご覧いただけます。
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white border border-[#E8E8E8] rounded-2xl p-8 shadow-sm">
                            {error && (
                                <div className="mb-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[14px] font-medium text-[#333333] mb-2">
                                        お名前 <span className="text-[#E53935]">*</span>
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            placeholder="田中 太郎"
                                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-medium text-[#333333] mb-2">
                                        会社名・店舗名
                                    </label>
                                    <div className="relative">
                                        <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" />
                                        <input
                                            type="text"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            placeholder="株式会社〇〇 / 〇〇サロン"
                                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-medium text-[#333333] mb-2">
                                        メールアドレス <span className="text-[#E53935]">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="tanaka@example.com"
                                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-medium text-[#333333] mb-2">
                                        電話番号
                                    </label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="090-1234-5678"
                                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-medium text-[#333333] mb-2">
                                        業種 <span className="text-[#E53935]">*</span>
                                    </label>
                                    <div className="relative">
                                        <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" />
                                        <select
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                            required
                                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3.5 text-[16px] text-[#1A1A1A] focus:border-[#06C755] focus:outline-none transition-colors appearance-none"
                                        >
                                            <option value="">業種を選択してください</option>
                                            <option value="gym">パーソナルジム・フィットネス</option>
                                            <option value="yoga">ヨガスタジオ</option>
                                            <option value="pilates">ピラティススタジオ</option>
                                            <option value="clinic">クリニック・医療</option>
                                            <option value="sauna">サウナ・スパ</option>
                                            <option value="pickleball">ピックルボール・テニス</option>
                                            <option value="studio">ダンス・レッスンスタジオ</option>
                                            <option value="other">その他</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[14px] font-medium text-[#333333] mb-2">
                                        WEBサイトURL
                                    </label>
                                    <div className="relative">
                                        <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" />
                                        <input
                                            type="url"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                            placeholder="https://example.com"
                                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl pl-11 pr-4 py-3.5 text-[16px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={sending || !name || !email}
                                className="w-full mt-6 bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-4 rounded-full text-[17px] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                                style={{ boxShadow: "0 4px 20px rgba(6,199,85,0.3)" }}
                            >
                                {sending ? "送信中..." : "資料を見る"}
                                {!sending && <ArrowRight size={18} />}
                            </button>

                            <p className="text-[12px] text-[#AAAAAA] text-center mt-4">
                                入力いただいた情報は資料送付のみに使用します。
                                <br />
                                <a href="/privacy" className="underline hover:text-[#06C755]">プライバシーポリシー</a>
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {/* Success state: Big Thank You + Documents */}
            {formSubmitted && (
                <>
                    {/* Big Success Banner */}
                    <div className="bg-gradient-to-b from-[#F5FBF7] to-white border-b border-[#E8E8E8]">
                        <div className="max-w-[880px] mx-auto px-6 py-12 sm:py-16 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#06C755] mb-6 animate-[bounce_1s_ease-in-out_1]">
                                <CheckCircle2 size={44} className="text-white" strokeWidth={2.5} />
                            </div>
                            <h1 className="text-[28px] sm:text-[36px] font-bold text-[#1A1A1A]" style={{ lineHeight: 1.3 }}>
                                お問い合わせありがとうございます
                            </h1>
                            <p className="mt-4 text-[15px] sm:text-[17px] text-[#666666] leading-relaxed max-w-[560px] mx-auto">
                                ご入力いただいた内容を確認の上、担当者より<br className="hidden sm:block" />
                                <span className="font-bold text-[#1A1A1A]">2営業日以内</span>にメールまたはお電話にてご連絡いたします。
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 bg-white border border-[#E8E8E8] rounded-full px-5 py-2.5">
                                <Mail size={15} className="text-[#06C755]" />
                                <p className="text-[13px] text-[#666666]">
                                    確認メールを <span className="font-bold text-[#1A1A1A]">{email}</span> にお送りしました
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-[1200px] mx-auto px-6 py-10">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Document Viewer */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-[20px] font-bold text-[#1A1A1A]">
                                        LINX サービス資料
                                    </h2>
                                    <a
                                        href="/linx-product-overview.html"
                                        target="_blank"
                                        className="flex items-center gap-1 text-[14px] text-[#06C755] font-medium hover:underline"
                                    >
                                        <ArrowRight size={14} />
                                        別タブで開く
                                    </a>
                                </div>
                                <div className="border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-sm" style={{ height: "75vh" }}>
                                    <iframe
                                        src="/linx-product-overview.html"
                                        className="w-full h-full"
                                        title="LINX サービス資料"
                                    />
                                </div>

                                {/* Industry-specific documents */}
                                <div className="mt-8">
                                    <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-4">業種別ソリューション資料</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            { label: "パーソナルジム", href: "/solutions/gym" },
                                            { label: "ヨガスタジオ", href: "/solutions/yoga" },
                                            { label: "ピラティス", href: "/solutions/pilates" },
                                            { label: "クリニック", href: "/solutions/clinic" },
                                            { label: "サウナ", href: "/solutions/sauna" },
                                            { label: "ピックルボール", href: "/solutions/pickleball" },
                                            { label: "ダンススタジオ", href: "/solutions/studio" },
                                        ].map(doc => (
                                            <a key={doc.label} href={doc.href}
                                                className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E8E8E8] hover:border-[#06C755] rounded-xl px-4 py-3 text-[14px] font-medium text-[#1A1A1A] hover:text-[#06C755] transition-all">
                                                <FileText size={16} className="shrink-0" />
                                                {doc.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="w-full lg:w-[320px] shrink-0">
                                <div className="lg:sticky lg:top-[88px] space-y-6">
                                    {/* PDF Downloads */}
                                    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6">
                                        <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-1">PDF資料ダウンロード</h3>
                                        <p className="text-[12px] text-[#999] mb-4">社内共有・検討用にどうぞ</p>
                                        <div className="space-y-3">
                                            <a
                                                href="/downloads/linx-vs-hacomono.pdf"
                                                download
                                                className="flex items-center gap-3 bg-[#F9FAFB] hover:bg-[#F5FBF7] border border-[#E8E8E8] hover:border-[#06C755] rounded-xl p-3 transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#06C755]/10 flex items-center justify-center shrink-0">
                                                    <Download size={16} className="text-[#06C755]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold text-[#1A1A1A] truncate">LINX vs 競合比較</p>
                                                    <p className="text-[11px] text-[#999]">PDF · 847 KB</p>
                                                </div>
                                            </a>
                                            <a
                                                href="/downloads/linx-smartlock-catalog.pdf"
                                                download
                                                className="flex items-center gap-3 bg-[#F9FAFB] hover:bg-[#F5FBF7] border border-[#E8E8E8] hover:border-[#06C755] rounded-xl p-3 transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#06C755]/10 flex items-center justify-center shrink-0">
                                                    <Download size={16} className="text-[#06C755]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold text-[#1A1A1A] truncate">スマートロック連携</p>
                                                    <p className="text-[11px] text-[#999]">PDF · 826 KB</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Free plan CTA */}
                                    <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-2xl p-6">
                                        <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Freeプランで今すぐ試す</h3>
                                        <p className="text-[13px] text-[#666666] mb-4 leading-relaxed">
                                            連絡を待たずに使ってみたい方は、<br />
                                            クレカ登録不要のFreeプランで今すぐお試しいただけます。
                                        </p>
                                        <a
                                            href="/login"
                                            className="w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold py-3.5 rounded-full text-[14px] transition-all duration-300"
                                            style={{ boxShadow: "0 4px 16px rgba(6,199,85,0.25)" }}
                                        >
                                            無料で始める
                                            <ArrowRight size={15} />
                                        </a>
                                        <p className="text-center text-[11px] text-[#999] mt-3">クレジットカード不要 · ずっと無料</p>
                                    </div>

                                    {/* Contact info */}
                                    <div className="text-[13px] text-[#999999] space-y-1 px-2">
                                        <p className="font-bold text-[#1A1A1A]">株式会社TomorrowProof</p>
                                        <p>tomorrowprooftokyo@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
