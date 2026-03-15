"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="py-[80px] sm:py-[100px] px-6 bg-[#F5FBF7]">
      <div className="max-w-[760px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          まずは無料で、<br className="sm:hidden" />試してみませんか？
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-[16px] sm:text-[18px] text-[#666666]"
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
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-12 py-[18px] rounded-full text-[18px] transition-all duration-200 active:scale-95 touch-manipulation cta-glow"
          >
            無料ではじめる
            <ArrowRight size={20} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 flex flex-wrap gap-4 justify-center text-[14px] text-[#999999]"
        >
          <span>✓ クレジットカード不要</span>
          <span>✓ ずっと無料プランあり</span>
          <span>✓ いつでも解約OK</span>
        </motion.div>
      </div>
    </section>
  );
}
