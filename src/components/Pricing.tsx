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
    <section id="pricing" className="py-[80px] sm:py-[120px] md:py-[160px] px-6 section-alt">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          料金プラン
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          まずは無料で、はじめてみませんか？
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#666666] text-[16px] sm:text-[18px] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          クレジットカード不要。いつでもプラン変更・解約OK。
        </motion.p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 sm:p-9 flex flex-col bg-white hover:shadow-xl transition-all duration-300 ${
                plan.popular
                  ? "shadow-lg"
                  : "shadow-sm hover:shadow-lg"
              }`}
              style={{
                border: plan.popular
                  ? "none"
                  : plan.highlight
                  ? "2px solid rgba(6,199,85,0.3)"
                  : "1px solid #E8E8E8",
                background: plan.popular
                  ? "white"
                  : "white",
                ...(plan.popular ? {
                  backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #06C755, #00B048)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  border: "2px solid transparent",
                } : {}),
                transition: "all 0.3s cubic-bezier(.25,1,.5,1)",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[13px] font-bold px-5 py-1.5 rounded-full whitespace-nowrap z-10" style={{ background: "linear-gradient(135deg, #06C755, #00B048)" }}>
                  人気 No.1
                </div>
              )}

              <div>
                <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1A1A1A]">{plan.name}</h3>
                <p className="text-[14px] text-[#999999] mt-1">{plan.description}</p>
              </div>

              <div className="mt-6">
                <span className="text-[44px] font-bold text-[#1A1A1A]" style={{ lineHeight: 1 }}>
                  {plan.price === "0" ? "¥0" : `¥${plan.price}`}
                </span>
                <span className="text-[14px] text-[#999999] ml-1">{plan.period}</span>
              </div>

              <ul className="mt-7 space-y-4 flex-1">
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
                className={`mt-8 py-[16px] min-h-[52px] flex items-center justify-center rounded-full text-[16px] font-bold touch-manipulation ${
                  plan.popular || plan.highlight
                    ? "btn-primary w-full text-[16px] px-6 py-[16px]"
                    : "border-2 border-[#E0E0E0] hover:border-[#06C755] text-[#333333] hover:text-[#06C755] transition-all duration-300"
                }`}
                style={plan.popular || plan.highlight ? {} : { transition: "all 0.3s cubic-bezier(.25,1,.5,1)" }}
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
          <p className="text-[#999999] text-[14px] sm:text-[15px]">
            全プラン共通: AI自動応答 / 情報登録 / 会話ログ / 管理画面
          </p>
          <p className="mt-2 text-[#AAAAAA] text-[13px] sm:text-[14px]">
            合わなければいつでも解約。解約金はありません。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
