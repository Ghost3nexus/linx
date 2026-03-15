"use client";

import { useEffect, useState } from "react";
import { getStats, type Stats } from "@/lib/apiClient";
import { MessageSquare, BookOpen, Zap, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStats()
            .then(setStats)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#E53935]/10 border border-[#E53935]/30 rounded-xl p-6 text-[#E53935]">
                エラー: {error}
            </div>
        );
    }

    if (!stats) return null;

    const usagePercent = Math.round((stats.monthlyResponses / stats.maxMonthlyResponses) * 100);
    const knowledgePercent = stats.maxKnowledgeFiles > 0
        ? Math.round((stats.knowledgeFiles / stats.maxKnowledgeFiles) * 100)
        : 0;

    const cards = [
        {
            icon: MessageSquare,
            label: "月間応答数",
            value: `${stats.monthlyResponses.toLocaleString()}`,
            sub: `/ ${stats.maxMonthlyResponses.toLocaleString()} 回`,
            percent: usagePercent,
            color: usagePercent > 80 ? "#FFB800" : "#06C755",
        },
        {
            icon: BookOpen,
            label: "お店の情報",
            value: `${stats.knowledgeFiles}`,
            sub: `/ ${stats.maxKnowledgeFiles} ファイル`,
            percent: knowledgePercent,
            color: "#06C755",
        },
        {
            icon: Zap,
            label: "プラン",
            value: stats.plan.charAt(0).toUpperCase() + stats.plan.slice(1),
            sub: "",
            percent: -1,
            color: "#06C755",
        },
        {
            icon: TrendingUp,
            label: "ステータス",
            value: "稼働中",
            sub: "",
            percent: -1,
            color: "#06C755",
        },
    ];

    return (
        <div>
            <h1 className="text-[24px] font-bold text-[#1A1A1A]">ダッシュボード</h1>
            <p className="text-[#999999] mt-1 text-[14px]">LINXの使用状況をリアルタイムで確認</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white border border-[#E8E8E8] rounded-xl p-6 hover:border-[#D0D0D0] transition-colors"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-lg bg-[#06C755]/10 flex items-center justify-center">
                                <card.icon size={18} className="text-[#06C755]" />
                            </div>
                            <span className="text-[13px] text-[#999999] font-medium">{card.label}</span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-[28px] font-bold text-[#1A1A1A]">{card.value}</span>
                            {card.sub && <span className="text-[13px] text-[#999999]">{card.sub}</span>}
                        </div>

                        {card.percent >= 0 && (
                            <div className="mt-4">
                                <div className="w-full h-[6px] bg-[#E8E8E8] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(card.percent, 100)}%`, backgroundColor: card.color }}
                                    />
                                </div>
                                <p className="text-[11px] text-[#999999] mt-1.5">{card.percent}% 使用中</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-white border border-[#E8E8E8] rounded-xl p-6">
                <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-3">クイックスタート</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/dashboard/knowledge" className="group flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg border border-[#E8E8E8] hover:border-[#06C755]/40 transition-colors">
                        <BookOpen size={20} className="text-[#06C755]" />
                        <div>
                            <p className="text-[14px] font-medium text-[#1A1A1A] group-hover:text-[#06C755] transition-colors">お店の情報を登録</p>
                            <p className="text-[12px] text-[#999999]">AIが回答する情報を追加</p>
                        </div>
                    </a>
                    <a href="/dashboard/settings" className="group flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg border border-[#E8E8E8] hover:border-[#06C755]/40 transition-colors">
                        <Zap size={20} className="text-[#06C755]" />
                        <div>
                            <p className="text-[14px] font-medium text-[#1A1A1A] group-hover:text-[#06C755] transition-colors">設定をカスタマイズ</p>
                            <p className="text-[12px] text-[#999999]">Bot名・トーンを変更</p>
                        </div>
                    </a>
                    <a href="/dashboard/logs" className="group flex items-center gap-3 p-4 bg-[#F9FAFB] rounded-lg border border-[#E8E8E8] hover:border-[#06C755]/40 transition-colors">
                        <MessageSquare size={20} className="text-[#06C755]" />
                        <div>
                            <p className="text-[14px] font-medium text-[#1A1A1A] group-hover:text-[#06C755] transition-colors">会話ログを確認</p>
                            <p className="text-[12px] text-[#999999]">AI応答の履歴を閲覧</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
