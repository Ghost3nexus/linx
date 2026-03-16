"use client";

import { useState } from "react";
import { FileText, Calendar, ArrowRight, Download, ChevronLeft, ChevronRight, Mail, Building2, User, Phone } from "lucide-react";

export default function DocumentsPage() {
    const [showForm, setShowForm] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [sending, setSending] = useState(false);

    // Simple form — no backend needed for now, just gates the content
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name || !email) return;
        setSending(true);
        // Simulate brief delay
        setTimeout(() => {
            setFormSubmitted(true);
            setShowForm(false);
            setSending(false);
        }, 800);
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
                            href="https://calendar.app.google/AJXwDSRvDQEWTxjb7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex items-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold px-5 py-2.5 rounded-full text-[14px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                        >
                            <Calendar size={15} />
                            オンライン相談
                        </a>
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

            {/* Document Viewer + Meeting CTA */}
            {formSubmitted && (
                <div className="max-w-[1200px] mx-auto px-6 py-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Document Viewer */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[20px] font-bold text-[#1A1A1A]">
                                    📄 LINX サービス資料
                                </h2>
                                <a
                                    href="/linx-product-overview.html"
                                    target="_blank"
                                    className="flex items-center gap-1 text-[14px] text-[#06C755] font-medium hover:underline"
                                >
                                    <Download size={14} />
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
                        </div>

                        {/* Sidebar: Meeting CTA */}
                        <div className="w-full lg:w-[320px] shrink-0">
                            <div className="lg:sticky lg:top-[88px] space-y-6">
                                {/* Meeting booking */}
                                <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#06C755] flex items-center justify-center">
                                            <Calendar size={24} className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-[16px] font-bold text-[#1A1A1A]">オンライン相談</h3>
                                            <p className="text-[13px] text-[#999999]">30分無料</p>
                                        </div>
                                    </div>
                                    <p className="text-[14px] text-[#666666] mb-5 leading-relaxed">
                                        デモと導入プランをご説明します。<br />
                                        お気軽にご相談ください。
                                    </p>
                                    <a
                                        href="https://calendar.app.google/AJXwDSRvDQEWTxjb7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold py-3.5 rounded-full text-[15px] transition-all duration-300"
                                        style={{ boxShadow: "0 4px 16px rgba(6,199,85,0.25)" }}
                                    >
                                        <Calendar size={16} />
                                        ミーティングを予約する
                                    </a>
                                </div>

                                {/* Quick start */}
                                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6">
                                    <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3">今すぐ試す</h3>
                                    <p className="text-[14px] text-[#666666] mb-4">
                                        無料プランで即日利用開始できます。<br />
                                        クレジットカード不要。
                                    </p>
                                    <a
                                        href="/login"
                                        className="w-full flex items-center justify-center gap-2 border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-bold py-3.5 rounded-full text-[15px] transition-all duration-300"
                                    >
                                        無料ではじめる
                                        <ArrowRight size={16} />
                                    </a>
                                </div>

                                {/* Contact info */}
                                <div className="text-[13px] text-[#999999] space-y-1">
                                    <p className="font-bold text-[#1A1A1A]">株式会社TomorrowProof</p>
                                    <p>tomorrowprooftokyo@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
