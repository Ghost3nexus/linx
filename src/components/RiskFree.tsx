"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const guarantees = [
  { label: "初期費用", value: "¥0" },
  { label: "初月料金", value: "¥0" },
  { label: "クレジットカード登録", value: "不要" },
  { label: "解約金", value: "¥0" },
  { label: "契約期間の縛り", value: "なし" },
  { label: "データエクスポート", value: "いつでも可能" },
];

export default function RiskFree() {
  return (
    <section className="py-[50px] sm:py-[80px] md:py-[100px] px-6 section-alt">
      <div className="max-w-[800px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          リスクゼロ保証
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          失うものは、何もありません。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#999999] text-[14px] sm:text-[16px]"
          style={{ lineHeight: 1.8 }}
        >
          LINXは新しいサービスです。だからこそ、導入リスクを限りなくゼロにしました。
        </motion.p>

        {/* 保証リスト */}
        <div className="mt-12 sm:mt-16 space-y-4 sm:space-y-5">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 sm:gap-5 bg-white border border-[#E8E8E8] rounded-xl px-6 sm:px-8 py-4 sm:py-5 shadow-sm"
            >
              <CheckCircle2
                size={28}
                className="text-[#06C755] shrink-0"
                strokeWidth={2.5}
              />
              <div className="flex-1 flex items-center justify-between gap-4">
                <span className="text-[15px] sm:text-[17px] text-[#1A1A1A] font-medium">
                  {g.label}
                </span>
                <span className="text-[17px] sm:text-[20px] font-bold text-[#06C755] shrink-0">
                  {g.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 最下部コピー + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p
            className="text-[15px] sm:text-[17px] text-[#666666] mb-8"
            style={{ lineHeight: 1.8 }}
          >
            まず1ヶ月、無料でお試しください。
            <br className="sm:hidden" />
            合わなければ、いつでもやめられます。
          </p>
          <Link
            href="/login"
            className="inline-block bg-[#06C755] hover:bg-[#05B34C] text-white text-[16px] sm:text-[18px] font-bold px-10 sm:px-14 py-4 sm:py-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            無料で始める
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
