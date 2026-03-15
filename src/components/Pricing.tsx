"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "円 / 月",
    description: "まずは無料で試してみたい方に",
    features: [
      "LINEアカウント 1件",
      "月50回までAI回答",
      "お店情報の登録 1件",
      "ずっと無料・カード不要",
    ],
    cta: "無料ではじめる",
    href: "/login",
    popular: false,
    highlight: true,
  },
  {
    name: "Starter",
    price: "4,980",
    period: "円 / 月",
    description: "個人のお店・小規模事業に",
    features: [
      "LINEアカウント 3件",
      "月500回までAI回答",
      "お店情報の登録 5件",
      "メールサポート",
    ],
    cta: "このプランではじめる",
    href: "/login",
    popular: true,
    highlight: false,
  },
  {
    name: "Standard",
    price: "9,800",
    period: "円 / 月",
    description: "複数店舗・成長中のビジネスに",
    features: [
      "LINEアカウント 10件",
      "月2,000回までAI回答",
      "お店情報の登録 無制限",
      "Web検索で最新情報も回答",
      "大事な質問は通知でお知らせ",
      "優先サポート",
    ],
    cta: "このプランではじめる",
    href: "/login",
    popular: false,
    highlight: false,
  },
  {
    name: "Pro",
    price: "29,800",
    period: "円 / 月",
    description: "本格運用・チェーン展開に",
    features: [
      "LINEアカウント 無制限",
      "月10,000回までAI回答",
      "お店情報の登録 無制限",
      "すべてのStandard機能",
      "AIの話し方をカスタマイズ",
      "外部ツール連携",
      "専任サポート担当",
    ],
    cta: "このプランではじめる",
    href: "/login",
    popular: false,
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-[60px] sm:py-[80px] px-6 section-alt">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          料金プラン
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          まずは無料で、はじめてみませんか？
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-[#999999] text-[16px]"
        >
          クレジットカード不要。いつでもプラン変更・解約OK。
        </motion.p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-[#06C755] shadow-md"
                  : plan.highlight
                  ? "border-2 border-[#06C755]/30"
                  : "border border-[#E8E8E8]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#06C755] text-white text-[13px] font-bold px-4 py-1 rounded-full whitespace-nowrap z-10">
                  人気 No.1
                </div>
              )}

              <div>
                <h3 className="text-[18px] font-bold text-[#1A1A1A]">{plan.name}</h3>
                <p className="text-[14px] text-[#999999] mt-1">{plan.description}</p>
              </div>

              <div className="mt-5">
                <span className="text-[36px] font-bold text-[#1A1A1A]">
                  {plan.price === "0" ? "¥0" : `¥${plan.price}`}
                </span>
                <span className="text-[14px] text-[#999999] ml-1">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className="text-[#06C755] shrink-0 mt-0.5" />
                    <span className="text-[15px] text-[#333333]" style={{ lineHeight: 1.5 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`mt-7 py-[14px] min-h-[48px] flex items-center justify-center rounded-full text-[16px] font-bold transition-all duration-200 touch-manipulation active:scale-95 ${
                  plan.popular || plan.highlight
                    ? "bg-[#06C755] hover:bg-[#05B04A] text-white cta-glow"
                    : "border-2 border-[#E0E0E0] hover:border-[#06C755] text-[#333333] hover:text-[#06C755]"
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
          className="mt-8 text-center"
        >
          <p className="text-[#999999] text-[14px]">
            全プラン共通: AI自動応答 / 情報登録 / 会話ログ / 管理画面
          </p>
          <p className="mt-2 text-[#AAAAAA] text-[13px]">
            合わなければいつでも解約。解約金はありません。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
