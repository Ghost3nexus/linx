"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-gym.png"
          alt="Modern fitness gym"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 py-20 w-full">
        <div className="max-w-[680px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#06C755] font-bold text-[14px] sm:text-[16px] tracking-wider mb-4">
              LINE AI for Fitness & Wellness
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-white text-[32px] sm:text-[44px] md:text-[56px] font-extrabold leading-[1.2]"
          >
            公式LINEに、
            <br />
            <span className="text-[#06C755]">AIスタッフ</span>を。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-white/80 text-[16px] sm:text-[18px] mt-6 leading-[1.8] max-w-[540px]"
          >
            予約受付・会員管理・入退館・決済まで、
            <br className="hidden sm:block" />
            LINE1つで店舗運営を完全自動化。
            <br className="hidden sm:block" />
            最短1日で導入、スタッフの負担をゼロに。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(6,199,85,0.4)]"
            >
              初月無料で試す
              <ArrowRight size={18} />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all duration-300 hover:bg-white/10"
            >
              機能を見る
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex gap-8 sm:gap-12 mt-14"
          >
            {[
              { value: "24h", label: "AI自動応対" },
              { value: "1日", label: "最短導入" },
              { value: "0円", label: "初期費用" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[#06C755] text-[28px] sm:text-[36px] font-extrabold leading-none">
                  {stat.value}
                </p>
                <p className="text-white/60 text-[12px] sm:text-[13px] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
