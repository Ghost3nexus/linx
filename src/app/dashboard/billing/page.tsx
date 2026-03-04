"use client";

import { useEffect, useState } from "react";
import { getSettings, createCheckoutSession, createPortalSession, type Settings } from "@/lib/apiClient";
import { CreditCard, Zap, Check, ExternalLink } from "lucide-react";

const PLANS = [
    {
        id: "free",
        name: "Free Trial",
        price: "¥0",
        period: "1週間お試し",
        features: ["公式LINE 1アカウント", "月50回応答", "ナレッジ1ファイル", "管理画面"],
    },
    {
        id: "starter",
        name: "Starter",
        price: "¥4,980",
        period: "/ 月",
        features: ["公式LINE 3アカウント", "月500回応答", "ナレッジ5ファイル", "管理画面", "メールサポート"],
    },
    {
        id: "standard",
        name: "Standard",
        price: "¥9,800",
        period: "/ 月",
        features: ["公式LINE 10アカウント", "月2,000回応答", "ナレッジ100ファイル", "エスカレーション通知", "Web検索AI", "優先サポート"],
        popular: true,
    },
    {
        id: "pro",
        name: "Pro",
        price: "¥29,800",
        period: "/ 月",
        features: ["公式LINE 100アカウント", "月10,000回応答", "ナレッジ100ファイル", "人格カスタマイズ", "Web検索AI", "外部ツール連携", "エスカレーション通知", "専任サポート"],
    },
];

export default function BillingPage() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getSettings()
            .then(setSettings)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleUpgrade(planId: string) {
        setProcessing(planId);
        setError("");
        try {
            const { url } = await createCheckoutSession(planId);
            if (url) window.location.href = url;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "エラーが発生しました");
        } finally {
            setProcessing("");
        }
    }

    async function handleManage() {
        if (!settings?.stripeCustomerId) return;
        setProcessing("manage");
        try {
            const { url } = await createPortalSession(settings.stripeCustomerId);
            if (url) window.location.href = url;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "エラーが発生しました");
        } finally {
            setProcessing("");
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const currentPlan = settings?.plan || "free";

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[24px] font-bold text-white">プラン・課金</h1>
                    <p className="text-[#6B7280] mt-1 text-[14px]">
                        現在のプラン: <span className="text-[#06C755] font-medium">{currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</span>
                    </p>
                </div>
                {settings?.stripeCustomerId && (
                    <button
                        onClick={handleManage}
                        disabled={processing === "manage"}
                        className="flex items-center gap-2 text-[14px] text-[#9CA3AF] hover:text-white border border-[#1A1A2E] hover:border-[#2A2A3E] px-4 py-2.5 rounded-lg transition-colors"
                    >
                        <ExternalLink size={16} />
                        {processing === "manage" ? "読み込み中..." : "課金管理（Stripe）"}
                    </button>
                )}
            </div>

            {error && (
                <div className="mt-4 bg-[#FF3366]/10 border border-[#FF3366]/30 rounded-lg p-4 text-[#FF3366] text-[14px]">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {PLANS.map((plan) => {
                    const isCurrent = plan.id === currentPlan;
                    const isUpgrade = !isCurrent && plan.id !== "free";

                    return (
                        <div
                            key={plan.id}
                            className={`bg-[#0A0A0F] border rounded-xl p-6 transition-colors relative ${plan.popular
                                ? "border-[#06C755]/50"
                                : isCurrent
                                    ? "border-[#06C755]/30"
                                    : "border-[#1A1A2E] hover:border-[#2A2A3E]"
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#06C755] text-white text-[11px] font-medium px-3 py-0.5 rounded-full">
                                    人気
                                </span>
                            )}

                            <div className="mb-4">
                                <h3 className="text-[16px] font-semibold text-white">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mt-2">
                                    <span className="text-[24px] font-bold text-white">{plan.price}</span>
                                    <span className="text-[13px] text-[#6B7280]">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-2 mb-6">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                                        <Check size={14} className="text-[#06C755] shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {isCurrent ? (
                                <div className="flex items-center justify-center gap-2 py-2.5 text-[14px] text-[#06C755] font-medium border border-[#06C755]/30 rounded-lg bg-[#06C755]/5">
                                    <Zap size={16} />
                                    現在のプラン
                                </div>
                            ) : isUpgrade ? (
                                <button
                                    onClick={() => handleUpgrade(plan.id)}
                                    disabled={!!processing}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 text-[14px] font-medium rounded-lg transition-colors bg-[#06C755] hover:bg-[#08E065] text-white disabled:opacity-50"
                                >
                                    <CreditCard size={16} />
                                    {processing === plan.id ? "処理中..." : "アップグレード"}
                                </button>
                            ) : (
                                <div className="py-2.5 text-center text-[14px] text-[#4B5563]">—</div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl p-6">
                <h3 className="text-[15px] font-medium text-white mb-2">課金について</h3>
                <ul className="space-y-1 text-[13px] text-[#6B7280]">
                    <li>• クレジットカード決済はStripeで安全に処理されます</li>
                    <li>• プラン変更はいつでも可能です（日割り計算）</li>
                    <li>• 解約後は無料プランに自動移行します</li>
                </ul>
            </div>
        </div>
    );
}
