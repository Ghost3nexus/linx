"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "円 / 月",
    description: "まず試してみたい方に",
    features: ["1グループ", "月50回応答", "ナレッジ1ファイル", "管理画面"],
    cta: "無料で始める",
    popular: false,
  },
  {
    name: "Starter",
    price: "4,980",
    period: "円 / 月",
    description: "小規模ビジネスに",
    features: ["3グループ", "月500回応答", "ナレッジ5ファイル", "管理画面", "メールサポート"],
    cta: "このプランで始める",
    popular: false,
  },
  {
    name: "Standard",
    price: "9,800",
    period: "円 / 月",
    description: "成長するビジネスに最適",
    features: [
      "10グループ",
      "月2,000回応答",
      "ナレッジ無制限",
      "エスカレーション通知",
      "管理画面",
      "優先サポート",
    ],
    cta: "このプランで始める",
    popular: true,
  },
  {
    name: "Pro",
    price: "14,800",
    period: "円 / 月",
    description: "本格運用に",
    features: [
      "無制限グループ",
      "無制限応答",
      "ナレッジ無制限",
      "人格カスタマイズ",
      "エスカレーション通知",
      "専任サポート",
    ],
    cta: "このプランで始める",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 px-5 sm:px-6 border-t border-[#1A1A2E]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          始めるのに、理由はいらない。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 sm:mt-4 text-center text-[#6B7280] text-base sm:text-lg"
        >
          無料プランで、まず試してみてください。
        </motion.p>

        {/* Mobile: 2-col grid / Desktop: 4-col */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-[#0D1117] rounded-2xl p-4 sm:p-6 flex flex-col ${
                plan.popular
                  ? "border-2 border-[#06C755] col-span-2 sm:col-span-1"
                  : "border border-[#1A1A2E]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#06C755] text-white text-[10px] sm:text-xs font-semibold px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                  人気
                </div>
              )}

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#FAFAFA]">{plan.name}</h3>
                <p className="text-[10px] sm:text-xs text-[#6B7280] mt-1">{plan.description}</p>
              </div>

              <div className="mt-3 sm:mt-4">
                <span className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
                  {plan.price === "0" ? "¥0" : `¥${plan.price}`}
                </span>
                <span className="text-xs sm:text-sm text-[#6B7280] ml-1">{plan.period}</span>
              </div>

              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-1.5 sm:gap-2">
                    <Check size={14} className="text-[#06C755] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#FAFAFA]">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-4 sm:mt-6 block text-center py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 touch-manipulation active:scale-95 ${
                  plan.popular
                    ? "bg-[#06C755] hover:bg-[#08E065] text-white"
                    : "border border-[#1A1A2E] hover:border-[#06C755] text-[#FAFAFA] hover:text-[#06C755]"
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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-[#6B7280] text-xs sm:text-sm flex flex-wrap justify-center gap-x-3 gap-y-1">
            {["生成AI応答", "ナレッジ登録", "会話ログ閲覧", "管理画面", "メールサポート"].map((f) => (
              <span key={f} className="inline-flex items-center gap-1">
                <Check size={12} className="text-[#06C755]" />
                {f}
              </span>
            ))}
          </p>
          <p className="text-[#6B7280] text-xs mt-2">全プランに含まれます</p>
        </motion.div>
      </div>
    </section>
  );
}
