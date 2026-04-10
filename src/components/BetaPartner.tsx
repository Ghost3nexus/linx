"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const REMAINING_SLOTS = 8;
const TOTAL_SLOTS = 10;

const perks = [
  {
    icon: "💰",
    title: "Standard機能を6ヶ月間",
    desc: "月額¥9,800 → ¥3,200（67%OFF）",
  },
  {
    icon: "🎯",
    title: "機能要望の優先反映",
    desc: "専用チャットサポート付き",
  },
  {
    icon: "📸",
    title: "導入事例としての掲載",
    desc: "許可制・貴社のPRにも活用可能",
  },
];

const conditions = [
  "ジム・サロン・クリニック等の実店舗を運営",
  "LINE公式アカウントを運用中（または開設予定）",
  "フィードバックを月1回共有いただける",
];

export default function BetaPartner() {
  return (
    <section className="py-[50px] sm:py-[80px] md:py-[100px] px-6 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          パートナー募集
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          最初の10社と、業界の新標準を作る。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#999999] text-[14px] sm:text-[16px]"
          style={{ lineHeight: 1.8 }}
        >
          LINXの進化を一緒に作りませんか？共創パートナーを限定10社募集します。
        </motion.p>

        {/* 残り枠カウンター */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <div className="inline-flex items-baseline gap-2 bg-[#F5FBF7] border border-[#D6F0DB] rounded-2xl px-8 sm:px-10 py-4 sm:py-5">
            <span className="text-[14px] sm:text-[15px] text-[#666666]">残り</span>
            <span className="text-[48px] sm:text-[56px] font-bold text-[#06C755]" style={{ lineHeight: 1 }}>
              {REMAINING_SLOTS}
            </span>
            <span className="text-[14px] sm:text-[15px] text-[#666666]">社 / {TOTAL_SLOTS}社</span>
          </div>
        </motion.div>

        {/* パートナー特典カード */}
        <div className="mt-10 sm:mt-14 grid sm:grid-cols-3 gap-5 sm:gap-6">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-[#E8E8E8] rounded-2xl p-7 sm:p-8 text-center shadow-sm hover:shadow-lg hover:border-[#D6F0DB] transition-all duration-300"
            >
              <span className="text-[36px] sm:text-[40px] block mb-4">{p.icon}</span>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#1A1A1A] mb-2">
                {p.title}
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#999999]" style={{ lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 応募条件 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-14 bg-[#FAFAFA] border border-[#E8E8E8] rounded-2xl p-7 sm:p-9"
        >
          <h3 className="text-[15px] sm:text-[16px] font-bold text-[#1A1A1A] mb-4">
            応募条件
          </h3>
          <ul className="space-y-3">
            {conditions.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="text-[#06C755] mt-0.5 shrink-0 text-[16px]">●</span>
                <span className="text-[14px] sm:text-[15px] text-[#666666]" style={{ lineHeight: 1.7 }}>
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <Link
            href="/documents"
            className="inline-block bg-[#06C755] hover:bg-[#05B34C] text-white text-[16px] sm:text-[18px] font-bold px-10 sm:px-14 py-4 sm:py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            パートナーに応募する
          </Link>
          <p className="mt-4 text-[12px] sm:text-[13px] text-[#999999]">
            応募＝契約ではありません。まずはお話しましょう。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
