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
      "管理者 1名",
      "顧客 50名まで",
      "月50回までAI回答",
      "ずっと無料・カード不要",
    ],
    cta: "無料ではじめる",
    href: "/login",
    popular: false,
    highlight: true,
  },
  {
    name: "Standard",
    price: "12,800",
    period: "円 / 月",
    description: "店舗運営に必要な機能をすべて",
    features: [
      "管理者 5名",
      "スタッフ 20名まで",
      "顧客 無制限",
      "月2,000回までAI回答",
      "AIが予約受付・空き確認を自動化",
      "会員管理・ステータス管理",
      "出席管理（チェックイン）",
      "スタッフ管理・シフト設定",
      "Stripe決済連携（入会金+月額）",
      "LINE一斉配信",
      "体験後の自動フォローアップ",
      "週間カレンダー予約管理",
      "祝日・臨時休業管理",
      "優先サポート",
    ],
    cta: "初月無料で試す",
    href: "/login",
    popular: true,
    highlight: false,
  },
  {
    name: "Pro",
    price: "29,800",
    period: "円 / 月",
    description: "チェーン展開・本格AI活用に",
    features: [
      "すべてのStandard機能",
      "管理者 無制限",
      "スタッフ 無制限",
      "月10,000回までAI回答",
      "AI顧客分析・離脱予測",
      "AIシフト自動生成",
      "入会提案書の自動生成",
      "マルチ店舗ダッシュボード",
      "専任サポート担当",
    ],
    cta: "お問い合わせ",
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

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-[960px] mx-auto">
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
            全プラン共通: AI自動応答 / お店情報登録 / 会話ログ / 管理画面 / AES-256暗号化 / SSL通信
          </p>
          <p className="mt-2 text-[#AAAAAA] text-[13px] sm:text-[14px]">
            初月無料トライアル。合わなければいつでも解約。解約金はありません。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
