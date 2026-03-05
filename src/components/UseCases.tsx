"use client";

import { motion } from "framer-motion";
import { GraduationCap, Scissors, Package, Briefcase } from "lucide-react";

const cases = [
  {
    icon: GraduationCap,
    title: "幼稚園・保育園",
    description: "持ち物・行事・お知らせの問い合わせに自動対応",
    effect: "保護者対応 1日30分→5分に",
  },
  {
    icon: Scissors,
    title: "美容院・サロン",
    description: "予約確認・メニュー案内・空き状況の自動応答",
    effect: "営業時間外の予約取りこぼしゼロ",
  },
  {
    icon: Package,
    title: "EC・小売",
    description: "在庫確認・配送状況・商品案内を24時間対応",
    effect: "問い合わせ対応コスト70%削減",
  },
  {
    icon: Briefcase,
    title: "コンサル・士業",
    description: "FAQ自動回答・資料送付・スケジュール案内",
    effect: "定型業務を自動化、本業に集中",
  },
];

export default function UseCases() {
  return (
    <section id="usecases" className="py-[80px] sm:py-[100px] px-6">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          Use Cases
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[34px] md:text-[44px] font-bold text-center"
          style={{ lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          あなたの業種でも、すぐ使えます。
        </motion.h2>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-2xl p-7 hover:border-[#06C755]/40 transition-all duration-300 group card-glow"
            >
              <c.icon
                size={28}
                className="text-[#06C755] group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="mt-5 text-[17px] font-semibold text-white" style={{ lineHeight: 1.4 }}>
                {c.title}
              </h3>
              <p className="mt-2 text-[15px] text-[#9CA3AF]" style={{ lineHeight: 1.7 }}>
                {c.description}
              </p>
              <p className="mt-5 text-[14px] font-semibold text-[#06C755]">
                {c.effect}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
