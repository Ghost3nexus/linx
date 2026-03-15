"use client";

import { motion } from "framer-motion";

const cases = [
  {
    emoji: "🍽️",
    title: "飲食店",
    description: "予約の空き確認やメニューの案内を自動対応",
    effect: "予約の取りこぼしゼロに",
  },
  {
    emoji: "💇",
    title: "美容院・サロン",
    description: "予約確認やメニュー案内、空き状況をAIが回答",
    effect: "営業時間外の予約対応も自動",
  },
  {
    emoji: "🏥",
    title: "クリニック・歯科",
    description: "診療時間や保険適用の質問に24時間対応",
    effect: "受付スタッフの負担を大幅削減",
  },
  {
    emoji: "🛒",
    title: "ネットショップ",
    description: "在庫確認・配送状況・返品方法を自動回答",
    effect: "問い合わせ対応コスト70%削減",
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="py-[60px] sm:py-[80px] px-6">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          こんな業種で使われています
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          あなたのお店でも、すぐ使えます。
        </motion.h2>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-7 hover:border-[#06C755]/40 hover:shadow-lg transition-all duration-300 text-center"
            >
              <span className="text-[44px]">{c.emoji}</span>
              <h3 className="mt-4 text-[18px] font-bold text-[#1A1A1A]" style={{ lineHeight: 1.4 }}>
                {c.title}
              </h3>
              <p className="mt-2 text-[15px] text-[#666666]" style={{ lineHeight: 1.7 }}>
                {c.description}
              </p>
              <p className="mt-4 text-[14px] font-bold text-[#06C755] bg-[#E8F5E9] inline-block px-3 py-1 rounded-full">
                {c.effect}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
