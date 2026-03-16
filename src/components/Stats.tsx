"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "80",
    suffix: "%",
    label: "事務作業削減",
    description: "LINE対応にかけていた時間を大幅カット",
    emoji: "📉",
  },
  {
    value: "3",
    suffix: "秒",
    label: "応答速度",
    description: "お客様を待たせない即時レスポンス",
    emoji: "⚡",
  },
  {
    value: "24",
    suffix: "時間",
    label: "365日対応",
    description: "夜中も休日もAIが自動で応答",
    emoji: "🕐",
  },
  {
    value: "5",
    suffix: "分",
    label: "で導入完了",
    description: "むずかしい設定は一切不要",
    emoji: "🚀",
  },
];

export default function Stats() {
  return (
    <section className="py-[60px] sm:py-[80px] px-6 bg-white">
      <div className="max-w-[960px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          数字で見る、LINXの効果
        </motion.h2>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-[#F5FBF7] border border-[#D4EDD8] rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg hover:border-[#06C755]/40 transition-all duration-300"
            >
              <span className="text-[32px]">{stat.emoji}</span>
              <div className="mt-3">
                <span className="text-[40px] sm:text-[48px] lg:text-[56px] font-bold text-[#06C755]" style={{ lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span className="text-[18px] sm:text-[20px] font-bold text-[#06C755]">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-2 text-[15px] sm:text-[16px] font-bold text-[#1A1A1A]">
                {stat.label}
              </p>
              <p className="mt-1 text-[13px] text-[#999999]" style={{ lineHeight: 1.5 }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
