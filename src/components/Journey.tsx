"use client";

import { motion } from "framer-motion";

const steps = [
  {
    emoji: "",
    title: "LP・SNSを見る",
    description: "あなたのお店を見つける",
  },
  {
    emoji: "",
    title: "LINEで友だち追加",
    description: "ワンタップで友だちに",
  },
  {
    emoji: "",
    title: "AIチャットで予約",
    description: "24時間いつでも予約可能",
  },
  {
    emoji: "",
    title: "来店・体験",
    description: "お店でサービスを満喫",
  },
  {
    emoji: "💳",
    title: "LINEで入会・決済",
    description: "リピーターに自動転換",
  },
];

export default function Journey() {
  return (
    <section className="py-[50px] sm:py-[80px] md:py-[100px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          カスタマージャーニー
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          お客様の体験はこうなります
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[16px] sm:text-[18px] text-[#666666] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          集客からリピーター化まで、LINXがお客様の体験をつなぎます
        </motion.p>

        {/* Desktop: horizontal */}
        <div className="mt-14 sm:mt-20 hidden md:block">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div className="absolute top-[36px] left-[60px] right-[60px] h-[3px] bg-[#06C755]/15 rounded-full z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="h-full bg-[#06C755] rounded-full origin-left"
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center w-[180px]"
              >
                {/* Circle with gradient green border */}
                <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #06C755 0%, #00B048 100%)", padding: "3px" }}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-[30px]">{step.emoji}</span>
                  </div>
                </div>

                {/* Step number */}
                <div className="mt-3 w-7 h-7 rounded-full bg-[#06C755] flex items-center justify-center">
                  <span className="text-white text-[12px] font-bold">{i + 1}</span>
                </div>

                <h3 className="mt-3 text-[15px] sm:text-[16px] font-bold text-[#1A1A1A]" style={{ lineHeight: 1.4 }}>
                  {step.title}
                </h3>
                <p className="mt-1 text-[13px] text-[#666666]" style={{ lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="mt-12 md:hidden">
          <div className="relative pl-12">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-[3px] bg-[#06C755]/15 rounded-full">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="w-full h-full bg-[#06C755] rounded-full origin-top"
              />
            </div>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Circle node with gradient border */}
                  <div className="absolute -left-12 w-[48px] h-[48px] rounded-full flex items-center justify-center shadow-sm shrink-0" style={{ background: "linear-gradient(135deg, #06C755 0%, #00B048 100%)", padding: "3px" }}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-[20px]">{step.emoji}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-[#E8E8E8] p-5 flex-1 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#06C755] flex items-center justify-center shrink-0">
                        <span className="text-white text-[10px] font-bold">{i + 1}</span>
                      </span>
                      <h3 className="text-[15px] font-bold text-[#1A1A1A]">{step.title}</h3>
                    </div>
                    <p className="mt-1 text-[13px] text-[#666666]" style={{ lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
