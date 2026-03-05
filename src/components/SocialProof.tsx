"use client";

import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

const testimonials = [
  {
    name: "T.S.",
    role: "渋谷 カフェオーナー",
    quote:
      "営業時間外の予約問い合わせが多くて、朝起きたら返信だけで1時間。LINXを入れてから、予約対応はほぼAI任せ。自分は仕込みに集中できるようになった。",
    metric: "LINE対応時間 -80%",
  },
  {
    name: "M.K.",
    role: "美容サロン経営者",
    quote:
      "「空いてる時間ありますか？」「メニューは？」の質問が毎日30件以上。LINXが全部即レスしてくれて、取りこぼしもゼロに。導入は本当に5分で終わった。",
    metric: "問い合わせ対応 自動化率 95%",
  },
  {
    name: "Y.I.",
    role: "歯科クリニック 院長",
    quote:
      "患者さんの質問に24時間答えられるのが大きい。「この症状は診てもらえますか？」といった問い合わせも、AIが的確に振り分けてくれる。スタッフの負担が激減した。",
    metric: "受付スタッフ工数 1日2時間削減",
  },
];

export default function SocialProof() {
  return (
    <section className="py-[80px] sm:py-[100px] px-6 border-t border-[#1A1A2E]">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          Voice
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[34px] md:text-[44px] font-bold text-center"
          style={{ lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          導入者の声
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-center text-[#6B7280] text-[14px]"
        >
          ※ ベータ版テスターの方々のご感想です
        </motion.p>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-2xl p-7 sm:p-8 flex flex-col card-glow transition-all duration-300"
            >
              <Quote size={24} className="text-[#06C755]/40 mb-4 shrink-0" />

              <p
                className="text-[15px] text-[#D1D5DB] flex-1"
                style={{ lineHeight: 1.8 }}
              >
                {t.quote}
              </p>

              <div className="mt-6 pt-5 border-t border-[#1A1A2E]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A2E] flex items-center justify-center shrink-0">
                    <User size={18} className="text-[#4B5563]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 inline-block bg-[#06C755]/10 text-[#06C755] text-[12px] font-semibold px-3 py-1 rounded-full">
                  {t.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
