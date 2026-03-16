"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-[100px] pb-[80px] px-6 overflow-hidden">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(6,199,85,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 60%, rgba(200,200,200,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-start gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#06C755] text-[14px] font-bold px-5 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#06C755] rounded-full animate-pulse" />
                無料ではじめられます
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-bold text-[#1A1A1A]"
              style={{ lineHeight: 1.15, letterSpacing: "-0.03em" }}
            >
              公式LINEに、
              <br />
              <span className="text-gradient-green">AIスタッフ</span>を。
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-[16px] sm:text-[18px] md:text-[20px] text-[#666666] max-w-[540px] mx-auto lg:mx-0"
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
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="/login"
                className="btn-primary w-full sm:w-auto text-[17px] px-12 py-[20px]"
              >
                無料ではじめる
                <ArrowRight size={18} className="btn-arrow" />
              </a>
              <a
                href="#demo"
                className="btn-secondary w-full sm:w-auto text-[17px] px-10 py-[18px]"
              >
                デモを見る
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-6 flex flex-wrap gap-5 justify-center lg:justify-start text-[14px] text-[#999999]"
            >
              <span>✓ クレジットカード不要</span>
              <span>✓ 5分で導入</span>
              <span>✓ ずっと無料プランあり</span>
            </motion.div>
          </div>

          {/* Right: Product Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex-shrink-0 w-full max-w-[560px] lg:max-w-[540px]"
            style={{ animation: "floatY 6s ease-in-out infinite" }}
          >
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 rounded-3xl bg-[#06C755]/10 blur-3xl scale-95" />
              <Image
                src="/hero-visual.png"
                alt="LINXのダッシュボードとLINEチャット画面"
                width={1024}
                height={576}
                className="relative w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
