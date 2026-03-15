"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChatMockup from "./ChatMockup";

export default function Hero() {
  return (
    <section className="relative min-h-[90dvh] flex flex-col items-center justify-center pt-[100px] pb-[60px] px-6 overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#06C755] text-[14px] font-bold px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-[#06C755] rounded-full animate-pulse" />
              無料ではじめられます
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[32px] sm:text-[44px] md:text-[56px] font-bold text-[#1A1A1A]"
              style={{ lineHeight: 1.25, letterSpacing: "-0.02em" }}
            >
              公式LINEに、
              <br />
              <span className="text-[#06C755]">AIスタッフ</span>を。
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-[16px] sm:text-[18px] text-[#666666] max-w-[520px] mx-auto lg:mx-0"
              style={{ lineHeight: 1.9 }}
            >
              お客様からの質問に、AIが即座に回答。
              <br className="hidden sm:block" />
              予約・在庫・よくある質問を<strong className="text-[#1A1A1A]">24時間自動</strong>で対応します。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="/login"
                className="bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-10 py-[18px] rounded-full text-[17px] transition-all duration-200 active:scale-95 text-center touch-manipulation cta-glow inline-flex items-center justify-center gap-2"
              >
                無料ではじめる
                <ArrowRight size={18} />
              </a>
              <a
                href="#demo"
                className="border-2 border-[#E0E0E0] hover:border-[#06C755] text-[#333333] hover:text-[#06C755] font-bold px-10 py-[18px] rounded-full text-[17px] transition-all duration-200 text-center touch-manipulation"
              >
                デモを見る
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-5 flex flex-wrap gap-4 justify-center lg:justify-start text-[14px] text-[#999999]"
            >
              <span>✓ クレジットカード不要</span>
              <span>✓ 5分で導入</span>
              <span>✓ ずっと無料プランあり</span>
            </motion.div>
          </div>

          {/* Right: Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex-shrink-0"
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
