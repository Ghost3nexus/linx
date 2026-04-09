"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-[60px] sm:py-[80px] md:py-[100px] px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #F5FBF7 0%, #FFFFFF 100%)" }}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="text-[15px] text-[#666666]">
            または
          </p>
          <a
            href="https://calendar.app.google/2aFsQTibv5HJKivE9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-3 border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] font-bold px-10 py-4 rounded-full text-[16px] transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            無料オンラインデモを予約
          </a>
        </motion.div>
      </div>
    </section>
  );
}
