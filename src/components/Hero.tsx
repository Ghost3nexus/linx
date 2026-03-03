"use client";

import { motion } from "framer-motion";
import { Zap, Wallet, Smartphone } from "lucide-react";
import ChatMockup from "./ChatMockup";

const badges = [
  { icon: Zap, label: "導入5分" },
  { icon: Wallet, label: "月額0円から" },
  { icon: Smartphone, label: "LINEを変えなくていい" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-16 px-5 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(6, 199, 85, 0.06)" }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2]"
          >
            LINEグループに、
            <br />
            <span className="text-[#06C755]">AIスタッフ</span>を。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-2xl mx-auto"
          >
            LINXが、あなたの代わりにLINEグループで顧客対応。
            <br className="hidden sm:block" />
            導入5分。月額0円から。いつものLINEに追加するだけ。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <a
              href="#cta"
              className="bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-200 active:scale-95 text-center touch-manipulation"
            >
              無料で始める
            </a>
            <a
              href="#demo"
              className="border border-[#1A1A2E] hover:border-[#06C755] text-[#FAFAFA] hover:text-[#06C755] font-semibold px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-200 text-center touch-manipulation"
            >
              デモを見る
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3"
          >
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 bg-[#0D1117] border border-[#1A1A2E] rounded-xl px-4 py-2.5"
              >
                <badge.icon size={16} className="text-[#06C755]" />
                <span className="text-sm text-[#FAFAFA] font-medium">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}
