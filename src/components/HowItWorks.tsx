"use client";

import { motion } from "framer-motion";
import { UserPlus, FileText, MessageCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "1",
    icon: UserPlus,
    title: "アカウントを作る",
    description: "メールアドレスだけで登録完了。むずかしい操作は一切ありません。",
  },
  {
    num: "2",
    icon: FileText,
    title: "お店の情報を登録する",
    description: "よくある質問や営業時間、メニューなどをテキストやPDFで登録するだけ。",
  },
  {
    num: "3",
    icon: MessageCircle,
    title: "AIが自動で回答スタート",
    description: "公式LINEとつなげれば、すぐにAIがお客様の質問に答えはじめます。",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-[50px] sm:py-[80px] md:py-[100px] px-6 bg-[#F8F9FA]">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          かんたん3ステップ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          パソコンが苦手でも大丈夫。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center text-[16px] sm:text-[18px] text-[#666666] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          むずかしい設定は一切なし。ガイドに沿って進めるだけで完了します。
        </motion.p>

        <div className="mt-14 sm:mt-20 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] z-0">
            <div className="h-[3px] bg-[#06C755]/15 rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="h-full bg-[#06C755] rounded-full origin-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative z-10"
              >
                {/* Step number circle - bigger */}
                <div className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[#06C755] mb-6 shadow-lg" style={{ boxShadow: "0 8px 24px rgba(6,199,85,0.25)" }}>
                  <span className="text-white text-[36px] font-bold">{step.num}</span>
                </div>

                <h3
                  className="text-[18px] sm:text-[22px] font-bold text-[#1A1A1A]"
                  style={{ lineHeight: 1.4 }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-[15px] text-[#666666] max-w-[280px] mx-auto"
                  style={{ lineHeight: 1.8 }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="/login"
            className="btn-primary text-[16px] px-10 py-[18px]"
          >
            今すぐ無料ではじめる
            <ArrowRight size={16} className="btn-arrow" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
