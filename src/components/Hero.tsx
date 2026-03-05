"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChatMockup from "./ChatMockup";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-[100px] pb-[60px] px-6 overflow-hidden bg-grid">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: "rgba(6, 199, 85, 0.05)" }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(0, 212, 255, 0.03)" }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="text-center max-w-[800px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-6"
          >
            LINE AI Concierge
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[36px] sm:text-[52px] md:text-[72px] font-bold"
            style={{ lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            公式LINEに、
            <br />
            <span className="text-gradient-hero">AIスタッフ</span>を。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 text-[16px] sm:text-[19px] text-[#9CA3AF] max-w-[600px] mx-auto"
            style={{ lineHeight: 1.9 }}
          >
            お客様の質問に、AIが即座に回答。
            <br className="hidden sm:block" />
            予約確認・在庫問い合わせ・FAQ対応を24時間自動化。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/login"
              className="bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-10 py-[18px] rounded-xl text-[16px] sm:text-[17px] transition-all duration-200 active:scale-95 text-center touch-manipulation cta-glow inline-flex items-center justify-center gap-2"
            >
              無料で始める
              <ArrowRight size={18} />
            </a>
            <a
              href="#demo"
              className="border border-[#2A2A3E] hover:border-[#06C755] text-white hover:text-[#06C755] font-semibold px-10 py-[18px] rounded-xl text-[16px] sm:text-[17px] transition-all duration-200 text-center touch-manipulation"
            >
              デモを見る
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-5 text-[13px] text-[#4B5563]"
          >
            クレジットカード不要 ・ 無料プランあり ・ 最短5分で導入
          </motion.p>
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
