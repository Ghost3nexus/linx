"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 px-5 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-[120px] sm:blur-[150px] pointer-events-none"
        style={{ background: "rgba(6, 199, 85, 0.08)" }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          まずは、無料で試してみてください。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg text-[#6B7280] leading-relaxed"
        >
          あなたのLINEグループに、
          <br />
          AIスタッフが加わる体験を。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-10"
        >
          <a
            href="#"
            className="inline-block bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-8 sm:px-10 py-4 rounded-xl text-base sm:text-lg transition-all duration-200 active:scale-95 touch-manipulation"
          >
            無料で始める
          </a>
          <p className="mt-3 sm:mt-4 text-[#6B7280] text-xs sm:text-sm">
            クレジットカード不要 / 5分で導入
          </p>
        </motion.div>
      </div>
    </section>
  );
}
