"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "24時間AI自動応対",
    description: "夜中も休日も、AIがLINEで即回答。予約受付・空き確認・入会案内まで自動で完結。スタッフの対応工数をゼロに。",
    image: "/images/phone-line-chat.png",
  },
  {
    title: "スマートロック入退館",
    description: "LINEでチェックインするだけでドアが自動解錠。暗証番号・指紋・顔認証にも対応。専用端末不要、工事不要で最短即日導入。",
    image: "/images/smartlock-entry.png",
  },
  {
    title: "会員管理・出席チェックイン",
    description: "アクティブ/休会/退会のステータス管理、ワンタップチェックイン、来館率分析。LINE一斉配信でキャンペーンも即配信。",
    image: "/images/members-checkin.png",
  },
  {
    title: "ダッシュボードで一元管理",
    description: "予約カレンダー・スタッフシフト・会員データ・入退館ログ・決済。すべてを1つの画面で管理。既存システムとのAPI連携にも対応。",
    image: "/images/staff-dashboard.png",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="py-[80px] sm:py-[120px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[#06C755] font-bold text-[14px] tracking-wider text-center mb-3"
        >
          FEATURES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-center text-[#1A1A1A] leading-tight"
        >
          店舗運営を、AIが変える。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#666] text-[16px] sm:text-[18px] max-w-[600px] mx-auto leading-relaxed"
        >
          予約・会員管理・入退館・決済。すべてをLINE1つで。
        </motion.p>

        <div className="mt-16 space-y-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="w-12 h-1 bg-[#06C755] rounded-full mb-4" />
                <h3 className="text-[24px] sm:text-[28px] font-extrabold text-[#1A1A1A] leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#666] text-[15px] sm:text-[16px] mt-4 leading-[1.8]">
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
