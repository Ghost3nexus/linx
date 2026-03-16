"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-[100px] sm:py-[140px] md:py-[180px] px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #F5FBF7 0%, #FFFFFF 100%)" }}>
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern" />

      <div className="max-w-[760px] mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[52px] font-bold text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          まずは無料で、<br className="sm:hidden" />試してみませんか？
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-[16px] sm:text-[18px] md:text-[20px] text-[#666666] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          たった5分の設定で、
          <br className="hidden sm:block" />
          明日からLINEの対応がラクになります。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/login"
            className="btn-primary w-full sm:w-auto text-[18px] px-14 py-[22px]"
          >
            無料ではじめる
            <ArrowRight size={20} className="btn-arrow" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-5 justify-center text-[14px] sm:text-[15px] text-[#999999]"
        >
          <span>✓ クレジットカード不要</span>
          <span>✓ ずっと無料プランあり</span>
          <span>✓ いつでも解約OK</span>
        </motion.div>
      </div>
    </section>
  );
}
