"use client";

import { motion } from "framer-motion";
import { Clock, Wallet, Smartphone } from "lucide-react";
import ChatMockup from "./ChatMockup";

const badges = [
  { icon: Clock, label: "最短30分で導入" },
  { icon: Wallet, label: "1週間無料お試し" },
  { icon: Smartphone, label: "LINE公式連携" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-[100px] pb-[60px] px-6 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(6, 199, 85, 0.06)" }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="text-center max-w-[760px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[28px] sm:text-[40px] md:text-[52px] font-bold tracking-tight"
            style={{ lineHeight: 1.3 }}
          >
            公式LINEに、
            <br />
            <span className="text-[#06C755]">AIスタッフ</span>を。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 text-[16px] sm:text-[18px] text-[#9CA3AF] max-w-[600px] mx-auto"
            style={{ lineHeight: 1.9 }}
          >
            LINXが、あなたの代わりに公式LINEで顧客対応。
            <br className="hidden sm:block" />
            LINE公式アカウントがあれば最短30分。1週間無料お試し。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/login"
              className="bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-10 py-[16px] rounded-xl text-[16px] sm:text-[17px] transition-all duration-200 active:scale-95 text-center touch-manipulation"
            >
              無料で始める
            </a>
            <a
              href="#demo"
              className="border border-[#2A2A3E] hover:border-[#06C755] text-white hover:text-[#06C755] font-semibold px-10 py-[16px] rounded-xl text-[16px] sm:text-[17px] transition-all duration-200 text-center touch-manipulation"
            >
              デモを見る
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 bg-[#0D1117] border border-[#1A1A2E] rounded-full px-5 py-3"
              >
                <badge.icon size={16} className="text-[#06C755]" />
                <span className="text-[14px] text-[#E5E7EB] font-medium">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}
