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
    title: "LINXを公式LINEに追加",
    description: "あなたの公式LINEにLINXを招待。設定は不要です。",
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "AIが応答開始",
    description: "お客様がメッセージを送るだけ。AIがすぐにお答えします。",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-[80px] sm:py-[100px] px-6 border-t border-[#1A1A2E]">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-center"
          style={{ lineHeight: 1.4 }}
        >
          導入は、3ステップ。5分で完了。
        </motion.h2>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-[64px] h-[64px] rounded-2xl bg-[#0A0A0F] border border-[#1A1A2E] mb-6">
                <step.icon size={28} className="text-[#06C755]" />
              </div>
              <div className="text-[#06C755] font-bold text-[13px] tracking-[0.15em] mb-3">
                STEP {step.num}
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-white" style={{ lineHeight: 1.4 }}>
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] text-[#9CA3AF] max-w-[300px] mx-auto" style={{ lineHeight: 1.8 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center text-[#6B7280] text-[15px]"
        >
          技術知識は不要。LINEが使えれば、誰でも始められます。
        </motion.p>
      </div>
    </section>
  );
}
