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
    title: "LINXをグループに追加する",
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
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          導入は、3ステップ。5分で完了。
        </motion.h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px border-t border-dashed border-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card border border-border mb-6">
                <step.icon size={28} className="text-primary" />
              </div>
              <div className="text-primary font-bold text-sm tracking-widest mb-2">
                STEP {step.num}
              </div>
              <h3 className="text-xl font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-sub leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center text-sub text-sm"
        >
          技術知識は不要。LINEが使えれば、誰でも始められます。
        </motion.p>
      </div>
    </section>
  );
}
