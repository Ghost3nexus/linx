"use client";

import { motion } from "framer-motion";
import { GraduationCap, Scissors, Package, Briefcase } from "lucide-react";

const cases = [
  {
    icon: GraduationCap,
    title: "幼稚園・保育園",
    description: "持ち物・行事・お知らせ対応",
    effect: "保護者対応が1日30分→5分に",
  },
  {
    icon: Scissors,
    title: "美容院・サロン",
    description: "予約確認・メニュー案内",
    effect: "営業時間外の予約取りこぼしゼロ",
  },
  {
    icon: Package,
    title: "EC・小売",
    description: "在庫確認・配送状況・商品案内",
    effect: "問い合わせ対応コスト70%削減",
  },
  {
    icon: Briefcase,
    title: "コンサル・士業",
    description: "FAQ自動回答・資料送付",
    effect: "定型業務を自動化、本業に集中",
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          あなたの業種でも、すぐ使えます。
        </motion.h2>

        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0D1117] border border-[#1A1A2E] rounded-2xl p-4 sm:p-6 hover:border-[#06C755]/40 transition-all duration-300 group"
            >
              <c.icon
                size={28}
                className="text-[#06C755] group-hover:scale-110 transition-transform duration-300 sm:w-8 sm:h-8"
              />
              <h3 className="mt-3 sm:mt-4 text-sm sm:text-lg font-semibold text-[#FAFAFA]">
                {c.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#6B7280]">{c.description}</p>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-[#06C755]">
                {c.effect}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
