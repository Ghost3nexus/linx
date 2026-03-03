"use client";

import { motion } from "framer-motion";
import { Upload, UserPlus, MessageCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "情報を登録する",
    description: "PDF・テキストをアップロード。AIがあなたの業務内容を学習します。",
  },
  {
    num: "02",
    icon: UserPlus,
    title: "LINXをグループに追加",
    description: "いつものLINEグループにLINXを招待するだけ。設定は不要です。",
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "AIが応答開始",
    description: "お客様が @LINX で呼びかけるだけ。AIがすぐにお答えします。",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 border-t border-[#1A1A2E]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          導入は、3ステップ。5分で完了。
        </motion.h2>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px border-t border-dashed border-[#1A1A2E]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0D1117] border border-[#1A1A2E] mb-5 sm:mb-6">
                <step.icon size={28} className="text-[#06C755]" />
              </div>
              <div className="text-[#06C755] font-bold text-xs sm:text-sm tracking-widest mb-2">
                STEP {step.num}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#FAFAFA]">{step.title}</h3>
              <p className="mt-2 sm:mt-3 text-sm text-[#6B7280] leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 sm:mt-12 text-center text-[#6B7280] text-sm"
        >
          技術知識は不要。LINEが使えれば、誰でも始められます。
        </motion.p>
      </div>
    </section>
  );
}
