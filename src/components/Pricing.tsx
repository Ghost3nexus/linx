"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "円 / 月",
    description: "まずは無料で体験",
    features: [
      "LINEグループ 1件",
      "月30回 AI応答",
      "ナレッジ 1件登録",
      "ずっと無料・カード不要",
    ],
    cta: "無料で始める",
    href: "/dashboard",
    popular: false,
  },
  {
    name: "Starter",
    price: "4,980",
    period: "円 / 月",
    description: "小規模店舗・個人事業に",
    features: [
      "LINEグループ 1件",
      "月300回 AI応答",
      "ナレッジ 5件登録",
      "メールサポート",
    ],
    cta: "このプランで始める",
    href: "/dashboard/billing",
    popular: false,
  },
  {
    name: "Standard",
    price: "9,800",
    period: "円 / 月",
    description: "複数グループ・成長企業に",
    features: [
      "LINEグループ 3件",
      "月1,000回 AI応答",
      "ナレッジ 20件登録",
      "Web検索AI（RAG）",
      "エスカレーション通知",
      "優先サポート",
    ],
    cta: "このプランで始める",
    href: "/dashboard/billing",
    popular: true,
  },
  {
    name: "Pro",
    price: "29,800",
    period: "円 / 月",
    description: "本格運用・チェーン展開に",
    features: [
      "LINEグループ 10件",
      "月5,000回 AI応答",
      "ナレッジ 100件登録",
      "Web検索AI（RAG）",
      "外部ツール連携",
      "エスカレーション通知",
      "AI人格カスタマイズ",
      "専任サポート",
    ],
    cta: "このプランで始める",
    href: "/dashboard/billing",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-[80px] sm:py-[100px] px-6 border-t border-[#1A1A2E]">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[34px] md:text-[44px] font-bold text-center"
          style={{ lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          始めるのに、理由はいらない。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-center text-[#9CA3AF] text-[16px] sm:text-[18px]"
        >
          無料プランでいつでも始められます。クレジットカード不要。
        </motion.p>

        {/* Mobile: 1col scroll / Desktop: 4col */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col ${plan.popular
                ? "border-gradient-animated"
                : "bg-[#0A0A0F] border border-[#1A1A2E]"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#06C755] text-white text-[12px] font-semibold px-4 py-1 rounded-full whitespace-nowrap z-10">
                  人気
                </div>
              )}

              <div>
                <h3 className="text-[18px] font-semibold text-white">{plan.name}</h3>
                <p className="text-[14px] text-[#6B7280] mt-1">{plan.description}</p>
              </div>

              <div className="mt-5">
                <span className="text-[32px] font-bold text-white">
                  {plan.price === "0" ? "¥0" : `¥${plan.price}`}
                </span>
                <span className="text-[14px] text-[#6B7280] ml-1">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={16} className="text-[#06C755] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[#D1D5DB]" style={{ lineHeight: 1.5 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`mt-7 block text-center py-[14px] rounded-xl text-[15px] font-semibold transition-all duration-200 touch-manipulation active:scale-95 ${plan.popular
                  ? "bg-[#06C755] hover:bg-[#08E065] text-white cta-glow"
                  : "border border-[#2A2A3E] hover:border-[#06C755] text-white hover:text-[#06C755]"
                  }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-[#6B7280] text-[14px]">
            全プラン共通: AI自動応答 / ナレッジ登録 / 会話ログ閲覧 / 管理画面 / LINE Reply API（追加課金なし）
          </p>
          <p className="mt-3 text-[#4B5563] text-[13px]">
            合わなければいつでも解約。解約金ゼロ。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
