"use client";

import { motion } from "framer-motion";
import { UserPlus, Link2, MessageCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    time: "約5分",
    title: "アカウント作成とナレッジ登録",
    description:
      "メールアドレスで登録。よくある質問・商品情報・営業時間などをPDFまたはテキストで登録します。",
  },
  {
    num: "02",
    icon: Link2,
    time: "約20分",
    title: "LINE公式アカウントと接続",
    description:
      "LINE Developersでチャンネルを作成し、Channel IDとAccess Tokenを入力。Webhook URLをコピーして設定するだけです。",
  },
  {
    num: "03",
    icon: MessageCircle,
    time: "完了",
    title: "AIが自動応答を開始",
    description:
      "設定完了後、お客様からのLINEメッセージにAIがリアルタイムで対応します。",
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
          導入は3ステップ。最短30分で完了。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center text-[14px] text-[#6B7280]"
        >
          ※ LINE公式アカウント（Messaging API対応）が事前に必要です
        </motion.p>

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
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-[#06C755] font-bold text-[13px] tracking-[0.15em]">
                  STEP {step.num}
                </span>
                <span className="text-[11px] text-[#4B5563] bg-[#0A0A0F] border border-[#1A1A2E] px-2 py-0.5 rounded-full">
                  {step.time}
                </span>
              </div>
              <h3
                className="text-[18px] sm:text-[20px] font-semibold text-white"
                style={{ lineHeight: 1.4 }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 text-[15px] text-[#9CA3AF] max-w-[300px] mx-auto"
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
          className="mt-12 text-center"
        >
          <p className="text-[#6B7280] text-[15px]">
            技術知識は不要。ガイドに沿って進めるだけで完了します。
          </p>
          <a
            href="/login"
            className="inline-block mt-6 bg-[#06C755] hover:bg-[#08E065] text-white font-semibold px-8 py-3 rounded-xl text-[15px] transition-all active:scale-95"
          >
            無料で始める
          </a>
        </motion.div>
      </div>
    </section>
  );
}
