"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-[100px] sm:py-[120px] px-6 overflow-hidden border-t border-[#1A1A2E]">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(6, 199, 85, 0.07)" }}
      />

      <div className="max-w-[760px] mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[22px] sm:text-[28px] md:text-[34px] font-bold"
          style={{ lineHeight: 1.4 }}
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
          className="mt-10"
        >
          <a
            href="/dashboard"
            className="inline-block bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-12 py-[18px] rounded-xl text-[17px] transition-all duration-200 active:scale-95 touch-manipulation"
          >
            無料で始める
          </a>
          <p className="mt-5 text-[#6B7280] text-[14px]">
            クレジットカード不要 / 5分で導入
          </p>
        </motion.div>
      </div>
    </section>
  );
}
