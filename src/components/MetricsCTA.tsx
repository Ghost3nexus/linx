"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MetricsCTA() {
  return (
    <section className="py-10 sm:py-14 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[680px] mx-auto text-center"
      >
        <p
          className="text-[18px] sm:text-[22px] md:text-[26px] font-bold text-white"
          style={{ lineHeight: 1.4, letterSpacing: "-0.01em" }}
        >
          この効果を、あなたの店舗でも。
        </p>
        <p className="mt-3 text-[14px] sm:text-[16px] text-[#6B7280]">
          5分の導入で、LINE対応が変わります。
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-8 py-[14px] rounded-xl text-[15px] transition-all duration-200 active:scale-95 touch-manipulation cta-glow"
          >
            今すぐ無料で体験する
            <ArrowRight size={16} />
          </a>
          <a
            href="https://calendar.app.google/AJXwDSRvDQEWTxjb7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-[#2A2A3E] hover:border-[#06C755] text-[#9CA3AF] hover:text-[#06C755] font-semibold px-8 py-[14px] rounded-xl text-[15px] transition-all duration-200 touch-manipulation"
          >
            相談してみる
          </a>
        </div>
      </motion.div>
    </section>
  );
}
