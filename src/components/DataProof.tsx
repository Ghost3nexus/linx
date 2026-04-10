"use client";

import { motion } from "framer-motion";

const dataCards = [
  {
    big: "1/4",
    description: "hacomonoの月額コストと比較して",
    note: "hacomono ¥54,000~/店 vs LINX ¥12,800~/店 ※オプション込み実質比較",
  },
  {
    big: "¥0",
    description: "初期費用・解約金・カード登録",
    note: "hacomono初期費用 ¥150,000 / Lステップ 最低3ヶ月縛り",
  },
  {
    big: "唯一",
    description: "LINE×AI自動応答を搭載したSaaS",
    note: "Lステップ・hacomono・エルメ・STORES予約のいずれもAI自動応答機能なし（2026年4月自社調べ）",
  },
  {
    big: "5分",
    description: "最短導入時間。既存LINE公式をそのまま使える",
    note: "hacomono: 商談→契約→初期設定で数週間 / Lステップ: シナリオ構築に平均1ヶ月",
  },
];

export default function DataProof() {
  return (
    <section className="py-[50px] sm:py-[80px] md:py-[100px] px-6 bg-[#1A1A1A]">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[14px] font-bold tracking-[0.1em] uppercase text-[#06C755] text-center mb-4"
        >
          DATA PROOF
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-white"
          style={{ lineHeight: 1.3 }}
        >
          なぜ、LINXなのか。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-[#999999] text-[16px] sm:text-[18px] mt-4"
        >
          数字が、すべてを語ります。
        </motion.p>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {dataCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 hover:border-[#06C755]/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <p
                className="text-[48px] sm:text-[56px] md:text-[64px] font-bold text-gradient-green"
                style={{ lineHeight: 1.1 }}
              >
                {card.big}
              </p>
              <p className="mt-4 text-[16px] sm:text-[18px] font-bold text-white" style={{ lineHeight: 1.5 }}>
                {card.description}
              </p>
              <p className="mt-3 text-[12px] sm:text-[13px] text-[#777777]" style={{ lineHeight: 1.6 }}>
                {card.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
