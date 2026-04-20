"use client";

import { useState } from "react";
import { Clock, Send, Plus, ToggleLeft, ToggleRight, Sparkles, Eye, Edit2, Users, TrendingUp } from "lucide-react";

// ============================================================
// 配信シナリオ (ハードコード / モック)
// ============================================================
type Scenario = {
    id: string;
    timing: string;
    title: string;
    body: string;
    sender: string;
    delivered: number;
    openRate: number;
    enabled: boolean;
    emoji: string;
};

const INITIAL_SCENARIOS: Scenario[] = [
    {
        id: "day0",
        timing: "施術当日",
        title: "ご来店のお礼 + ホームケアPDF",
        body: "本日はご来店いただきありがとうございました。今日の施術写真と、ご自宅でお使いいただけるホームケアPDFをお送りします…",
        sender: "担当スタイリスト",
        delivered: 182,
        openRate: 94,
        enabled: true,
        emoji: "🎀",
    },
    {
        id: "day2",
        timing: "施術2日後",
        title: "カラー後のホームケア指南",
        body: "お元気でいらっしゃいますか?本日で施術から2日目ですね。この時期に気をつけたいのは… AVEDA カラーコンサーブシャンプーのご案内も…",
        sender: "担当スタイリスト",
        delivered: 176,
        openRate: 88,
        enabled: true,
        emoji: "💧",
    },
    {
        id: "week2",
        timing: "施術2週間後",
        title: "お気遣いメッセージ + 新コラム案内",
        body: "スタイルが落ち着く頃かと思いますが、いかがですか?LOOK mag. 最新号『春のアッシュ特集』を公開しましたので、もしよろしければ…",
        sender: "担当スタイリスト",
        delivered: 164,
        openRate: 76,
        enabled: true,
        emoji: "🌸",
    },
    {
        id: "week3",
        timing: "施術3週間後",
        title: "次回ご予約のご提案",
        body: "お客様の来店サイクルから、そろそろリタッチの頃合いかと思います。担当の私から、おすすめの日時をピックアップしました…",
        sender: "担当スタイリスト",
        delivered: 153,
        openRate: 81,
        enabled: true,
        emoji: "📅",
    },
    {
        id: "season",
        timing: "季節の変わり目",
        title: "シーズン限定カラー / LOOK mag. 配信",
        body: "季節が変わる節目に、サロン全体の旬な情報をお届けします。春夏秋冬の年4回…",
        sender: "PEEK-A-BOO 公式",
        delivered: 312,
        openRate: 72,
        enabled: true,
        emoji: "🌼",
    },
    {
        id: "birthday",
        timing: "お誕生月",
        title: "バースデーメッセージ",
        body: "お誕生月のお客様へ、特別なメッセージとご優待クーポン(AVEDAプロダクト10%オフ)をお届け…",
        sender: "PEEK-A-BOO 公式",
        delivered: 44,
        openRate: 96,
        enabled: false,
        emoji: "🎂",
    },
];

export default function AfterCarePage() {
    const [scenarios, setScenarios] = useState<Scenario[]>(INITIAL_SCENARIOS);
    const [selected, setSelected] = useState<Scenario>(INITIAL_SCENARIOS[0]);

    function toggle(id: string) {
        setScenarios(scenarios.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    }

    const activeCount = scenarios.filter(s => s.enabled).length;
    const totalDelivered = scenarios.reduce((sum, s) => sum + s.delivered, 0);
    const avgOpenRate = Math.round(
        scenarios.reduce((sum, s) => sum + s.openRate, 0) / scenarios.length
    );

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
                <div>
                    <p className="text-[#06C755] font-bold text-[12px] tracking-wider mb-2">AFTERCARE RITUAL</p>
                    <h1 className="text-[28px] sm:text-[36px] font-extrabold text-[#1A1A1A]" style={{ lineHeight: 1.2 }}>
                        施術後の自動配信設定
                    </h1>
                    <p className="text-[14px] text-[#666] mt-3 max-w-[580px] leading-relaxed">
                        お客様の来店サイクルに合わせて、担当スタイリスト様からのメッセージを自動配信します。
                        タイミング・本文・差出人・頻度はすべてカスタム可能です。
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-[#E8E8E8] hover:border-[#06C755] text-[#333] font-bold px-5 py-2.5 rounded-full text-[13px] transition-all">
                        <Eye size={14} /> プレビュー
                    </button>
                    <button className="flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-5 py-2.5 rounded-full text-[13px] transition-all">
                        <Plus size={14} /> 新規シナリオ
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#F5FBF7] border border-[#06C755]/20 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-[#06C755]" />
                        <p className="text-[12px] font-bold text-[#06C755]">アクティブ</p>
                    </div>
                    <p className="text-[32px] font-extrabold text-[#1A1A1A]" style={{ lineHeight: 1 }}>
                        {activeCount}<span className="text-[14px] text-[#999] font-medium"> / {scenarios.length} シナリオ</span>
                    </p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Send size={16} className="text-[#333]" />
                        <p className="text-[12px] font-bold text-[#666]">今月の配信数</p>
                    </div>
                    <p className="text-[32px] font-extrabold text-[#1A1A1A]" style={{ lineHeight: 1 }}>
                        {totalDelivered.toLocaleString()}<span className="text-[14px] text-[#999] font-medium"> 通</span>
                    </p>
                </div>
                <div className="bg-white border border-[#E8E8E8] rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-[#333]" />
                        <p className="text-[12px] font-bold text-[#666]">平均開封率</p>
                    </div>
                    <p className="text-[32px] font-extrabold text-[#1A1A1A]" style={{ lineHeight: 1 }}>
                        {avgOpenRate}<span className="text-[14px] text-[#999] font-medium"> %</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                {/* Scenario list */}
                <div className="space-y-3">
                    <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-1">シナリオ一覧</h2>
                    {scenarios.map((s) => (
                        <div
                            key={s.id}
                            onClick={() => setSelected(s)}
                            className={`bg-white border rounded-2xl p-5 cursor-pointer transition-all ${
                                selected.id === s.id ? "border-[#06C755] shadow-lg" : "border-[#E8E8E8] hover:border-[#06C755]/50"
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[22px] shrink-0 ${
                                    s.enabled ? "bg-[#F5FBF7]" : "bg-[#F5F5F5] opacity-50"
                                }`}>
                                    {s.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] font-bold text-[#06C755] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                                            {s.timing}
                                        </span>
                                        <span className="text-[11px] text-[#999]">• 差出人: {s.sender}</span>
                                    </div>
                                    <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1">{s.title}</h3>
                                    <p className="text-[12px] text-[#999] line-clamp-2 leading-relaxed">{s.body}</p>
                                    <div className="flex items-center gap-4 mt-3 text-[11px] text-[#666]">
                                        <span className="flex items-center gap-1">
                                            <Users size={12} /> {s.delivered.toLocaleString()} 通配信
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <TrendingUp size={12} /> 開封率 {s.openRate}%
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggle(s.id); }}
                                    className="shrink-0"
                                    aria-label="有効/無効切替"
                                >
                                    {s.enabled ? (
                                        <ToggleRight size={32} className="text-[#06C755]" />
                                    ) : (
                                        <ToggleLeft size={32} className="text-[#CCC]" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Selected preview panel */}
                <div className="lg:sticky lg:top-6 h-fit">
                    <div className="bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden">
                        {/* LINE風プレビュー */}
                        <div className="bg-[#06C755] text-white text-center py-3 text-[13px] font-bold">
                            PEEK-A-BOO 公式LINE — プレビュー
                        </div>
                        <div className="bg-[#7494A5] p-4 min-h-[360px]">
                            <div className="flex justify-start">
                                <div className="bg-white rounded-lg rounded-tl-sm p-3 max-w-[85%] shadow-sm">
                                    <p className="text-[11px] font-bold text-[#06C755] mb-1">{selected.sender}</p>
                                    <p className="text-[13px] text-[#1A1A1A] leading-relaxed whitespace-pre-line">
                                        {selected.body}
                                    </p>
                                </div>
                            </div>
                            <p className="text-center text-[10px] text-white/60 mt-4">
                                🕐 配信タイミング: {selected.timing}
                            </p>
                        </div>

                        <div className="p-5 border-t border-[#E8E8E8]">
                            <h3 className="text-[13px] font-bold text-[#1A1A1A] mb-3">配信条件</h3>
                            <div className="space-y-2 text-[12px] text-[#666]">
                                <div className="flex justify-between"><span>タイミング</span><span className="font-bold text-[#1A1A1A]">{selected.timing}</span></div>
                                <div className="flex justify-between"><span>差出人</span><span className="font-bold text-[#1A1A1A]">{selected.sender}</span></div>
                                <div className="flex justify-between"><span>対象</span><span className="font-bold text-[#1A1A1A]">全施術対象</span></div>
                                <div className="flex justify-between"><span>AI パーソナライズ</span><span className="font-bold text-[#06C755]">ON</span></div>
                            </div>
                            <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[#F5FBF7] border border-[#06C755]/30 hover:bg-[#06C755]/10 text-[#06C755] font-bold py-2.5 rounded-full text-[12px] transition-all">
                                <Edit2 size={12} /> シナリオを編集
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 bg-[#FFFBEB] border-l-4 border-[#F59E0B] p-4 rounded-r-lg">
                        <p className="text-[11px] font-bold text-[#F59E0B] mb-1">💡 AIが文面を最適化</p>
                        <p className="text-[11px] text-[#666] leading-relaxed">
                            お客様ごとの施術履歴・好み・会話トーンを考慮して、AIが配信直前に本文を微調整します。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
