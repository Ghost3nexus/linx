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
            href="#"
            className="mt-3 inline-flex items-center gap-3 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-10 py-4 rounded-full text-[16px] transition-all duration-300"
            style={{ boxShadow: "0 4px 16px rgba(6,199,85,0.3)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
            LINEで無料相談する
          </a>
        </motion.div>
      </div>
    </section>
  );
}
