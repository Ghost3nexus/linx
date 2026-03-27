"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Bell, Clock, Sparkles } from "lucide-react";

const points = [
  { icon: Bot, text: "よくある質問はAIが自動で回答", sub: "同じ質問に何度も答える必要なし" },
  { icon: Clock, text: "24時間365日、すぐに返信", sub: "夜中も休日も、お客様を待たせません" },
  { icon: Bell, text: "体験後のフォローアップも自動", sub: "体験完了→入会案内→3日後リマインドまで全自動" },
  { icon: Sparkles, text: "あなたのお店の情報で回答", sub: "登録した内容をもとに正確に答えます" },
];

export default function Solution() {
  return (
    <section id="solution" className="py-[80px] sm:py-[120px] md:py-[160px] px-6 section-alt">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          LINXでできること
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          LINXが、あなたの代わりに答えます。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[16px] sm:text-[18px] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.9 }}
        >
          あなたの公式LINEにAIスタッフが参加。
          <br className="hidden sm:block" />
          お客様の質問に、すぐに・正確に・24時間回答します。
        </motion.p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[760px] mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-5 bg-white border border-[#E8E8E8] rounded-2xl px-7 py-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #06C755 0%, #00B048 100%)" }}>
                <point.icon size={26} className="text-white" />
              </div>
              <div>
                <span className="text-[16px] sm:text-[17px] text-[#1A1A1A] font-bold" style={{ lineHeight: 1.5 }}>
                  {point.text}
                </span>
                <p className="text-[14px] text-[#999999] mt-1">{point.sub}</p>
              </div>
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
          <a
            href="/login"
            className="btn-primary text-[16px] px-10 py-[18px]"
          >
            無料ではじめる
            <ArrowRight size={16} className="btn-arrow" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
