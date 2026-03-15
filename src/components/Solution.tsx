"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Bell, Clock, Sparkles } from "lucide-react";

const points = [
  { icon: Bot, text: "よくある質問はAIが自動で回答", sub: "同じ質問に何度も答える必要なし" },
  { icon: Clock, text: "24時間365日、すぐに返信", sub: "夜中も休日も、お客様を待たせません" },
  { icon: Bell, text: "大事な質問はあなたに通知", sub: "AIが判断できないときは即座にお知らせ" },
  { icon: Sparkles, text: "あなたのお店の情報で回答", sub: "登録した内容をもとに正確に答えます" },
];

export default function Solution() {
  return (
    <section id="solution" className="py-[60px] sm:py-[80px] px-6 section-alt">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          LINXでできること
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          LINXが、あなたの代わりに答えます。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[16px] sm:text-[18px] max-w-[600px] mx-auto"
          style={{ lineHeight: 1.9 }}
        >
          あなたの公式LINEにAIスタッフが参加。
          <br className="hidden sm:block" />
          お客様の質問に、すぐに・正確に・24時間回答します。
        </motion.p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[720px] mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 bg-white border border-[#E8E8E8] rounded-2xl px-6 py-5 hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <point.icon size={22} className="text-[#06C755]" />
              </div>
              <div>
                <span className="text-[16px] text-[#1A1A1A] font-bold" style={{ lineHeight: 1.5 }}>
                  {point.text}
                </span>
                <p className="text-[14px] text-[#999999] mt-0.5">{point.sub}</p>
              </div>
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
            無料ではじめる
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
