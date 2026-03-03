"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold"
        >
          まずは、無料で試してみてください。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-lg text-sub leading-relaxed"
        >
          あなたのLINEグループに、
          <br />
          AIスタッフが加わる体験を。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="#"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-200 hover:scale-[1.02]"
          >
            無料で始める
          </a>
          <p className="mt-4 text-sub text-sm">
            クレジットカード不要 / 5分で導入
          </p>
        </motion.div>
      </div>
    </section>
  );
}
