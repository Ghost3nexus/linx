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
    features: [
      "3グループ",
      "月500回応答",
      "ナレッジ5ファイル",
      "管理画面",
      "メールサポート",
    ],
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

const commonFeatures = [
  "生成AI応答",
  "ナレッジ登録",
  "会話ログ閲覧",
  "管理画面",
  "メールサポート",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          始めるのに、理由はいらない。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-sub text-lg"
        >
          無料プランで、まず試してみてください。
        </motion.p>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-card rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "border-2 border-primary"
                  : "border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  人気
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-text">{plan.name}</h3>
                <p className="text-xs text-sub mt-1">{plan.description}</p>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold text-text">
                  {plan.price === "0" ? "¥0" : `¥${plan.price}`}
                </span>
                <span className="text-sm text-sub ml-1">{plan.period}</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-6 block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "border border-border hover:border-primary text-text hover:text-primary"
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
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sub text-sm">
            すべてのプランに含まれるもの:{" "}
            {commonFeatures.map((f, i) => (
              <span key={f}>
                <Check size={14} className="inline text-primary mr-0.5" />
                {f}
                {i < commonFeatures.length - 1 && (
                  <span className="mx-2 text-border">|</span>
                )}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
