"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-[100px] sm:py-[120px] px-6 overflow-hidden border-t border-[#1A1A2E]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: "rgba(6, 199, 85, 0.06)" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(0, 212, 255, 0.03)" }}
      />

      <div className="max-w-[760px] mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[34px] md:text-[44px] font-bold"
          style={{ lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          まずは、無料で試してみてください。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-[16px] sm:text-[18px] text-[#9CA3AF]"
          style={{ lineHeight: 1.8 }}
        >
          あなたの公式LINEに、
          <br />
          AIスタッフが加わる体験を。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-12 py-[18px] rounded-xl text-[17px] transition-all duration-200 active:scale-95 touch-manipulation cta-glow"
          >
            無料で始める
            <ArrowRight size={18} />
          </a>
          <a
            href="https://calendar.app.google/AJXwDSRvDQEWTxjb7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-[#2A2A3E] hover:border-[#06C755] text-white hover:text-[#06C755] font-semibold px-10 py-[18px] rounded-xl text-[16px] transition-all duration-200 touch-manipulation"
          >
            Google Meetで相談
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 text-[#4B5563] text-[13px]"
        >
          クレジットカード不要 / 無料プランは期限なし / いつでも解約可能
        </motion.p>
      </div>
    </section>
  );
}
