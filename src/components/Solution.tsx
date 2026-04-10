"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "24時間AI自動応対",
    description: "夜中も休日も、AIがLINEで即回答。予約・空き確認・入会案内まで自動完結。",
    image: "/images/phone-line-chat.png",
    metric: "3",
    suffix: "秒",
    metricLabel: "平均応答速度",
  },
  {
    title: "スマートロック入退館",
    description: "LINEでチェックインするだけでドアが自動解錠。専用端末不要・工事不要。",
    image: "/images/smartlock-entry.png",
    metric: "¥0",
    suffix: "",
    metricLabel: "専用端末費",
  },
  {
    title: "会員管理・チェックイン",
    description: "ステータス管理、ワンタップチェックイン、LINE一斉配信。これ1つで完結。",
    image: "/images/members-checkin.png",
    metric: "1",
    suffix: "画面",
    metricLabel: "で全管理",
  },
  {
    title: "ダッシュボード",
    description: "予約・シフト・会員・入退館・決済。すべてを1つの画面で。API連携にも対応。",
    image: "/images/staff-dashboard.png",
    metric: "5",
    suffix: "分",
    metricLabel: "で導入完了",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-[60px] sm:py-[100px] px-6 bg-[#F8F9FA]">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[#06C755] font-bold text-[15px] tracking-wider text-center mb-3"
        >
          FEATURES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[38px] md:text-[48px] font-bold text-center text-[#1A1A1A] leading-tight"
        >
          店舗運営を、AIが変える。
        </motion.h2>

        <div className="mt-12 sm:mt-16 space-y-8 sm:space-y-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className={`group flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12 bg-white rounded-2xl border border-[#E8E8E8] p-6 sm:p-8 hover:shadow-xl hover:border-[#06C755]/30 transition-all duration-500`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                  className="flex items-baseline gap-2 mb-4"
                >
                  <span className="text-[48px] sm:text-[56px] md:text-[64px] font-bold text-gradient-green leading-none">
                    {feature.metric}
                  </span>
                  {feature.suffix && (
                    <span className="text-[22px] sm:text-[26px] font-bold text-[#06C755]">
                      {feature.suffix}
                    </span>
                  )}
                  <span className="text-[14px] sm:text-[15px] text-[#999] ml-1">{feature.metricLabel}</span>
                </motion.div>
                <h3 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-[#1A1A1A] leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#666] text-[16px] sm:text-[17px] mt-3" style={{ lineHeight: 1.8 }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
