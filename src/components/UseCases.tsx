"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cases = [
  { image: "/images/hero-salon.png", label: "美容室・ヘアサロン", sub: "スタイリスト相談・指名予約・アフターケア" },
  { image: "/images/hero-gym.png", label: "パーソナルジム", sub: "予約・入退館・会員管理" },
  { image: "/images/usecase-yoga.png", label: "ヨガスタジオ", sub: "レッスン予約・リマインド" },
  { image: "/images/usecase-pilates.png", label: "ピラティス", sub: "少人数予約・シフト管理" },
  { image: "/images/usecase-clinic.png", label: "クリニック", sub: "予約受付・事前問診" },
  { image: "/images/usecase-sauna.png", label: "サウナ", sub: "入退館・時間管理" },
  { image: "/images/usecase-pickleball.png", label: "ピックルボール", sub: "コート予約・会員管理" },
  { image: "/images/usecase-studio.png", label: "ダンススタジオ", sub: "クラス予約・出席管理" },
];

export default function UseCases() {
  return (
    <section className="py-[80px] sm:py-[120px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[#06C755] font-bold text-[14px] tracking-wider text-center mb-3"
        >
          USE CASES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-center text-[#1A1A1A] leading-tight"
        >
          あらゆるウェルネス施設に対応
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#666] text-[16px] max-w-[500px] mx-auto"
        >
          ジムからクリニックまで、店舗型ビジネスの運営を自動化
        </motion.p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
              className="group relative rounded-2xl overflow-hidden cursor-default aspect-[4/3]"
            >
              <Image
                src={c.image}
                alt={c.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-extrabold text-[16px] sm:text-[18px]">{c.label}</p>
                <p className="text-white/70 text-[12px] mt-0.5">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
