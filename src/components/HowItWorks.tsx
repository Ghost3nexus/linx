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
    <section className="py-[60px] sm:py-[80px] px-6">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          かんたん3ステップ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          パソコンが苦手でも大丈夫。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-center text-[16px] text-[#999999]"
        >
          むずかしい設定は一切なし。ガイドに沿って進めるだけで完了します。
        </motion.p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center relative"
            >
              {/* Step number circle */}
              <div className="inline-flex items-center justify-center w-[64px] h-[64px] rounded-full bg-[#06C755] mb-5">
                <span className="text-white text-[28px] font-bold">{step.num}</span>
              </div>

              {/* Arrow between steps (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[32px] -right-4 w-8 text-center">
                  <ArrowRight size={20} className="text-[#CCCCCC]" />
                </div>
              )}

              <h3
                className="text-[18px] sm:text-[20px] font-bold text-[#1A1A1A]"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all active:scale-95 cta-glow"
          >
            今すぐ無料ではじめる
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
