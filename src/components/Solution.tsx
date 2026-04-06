"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Bell, Clock, Sparkles, Users, CreditCard, CalendarDays, Send } from "lucide-react";

const points = [
  { icon: Bot, text: "AIが24時間自動で回答・予約受付", sub: "夜中も休日も、お客様を待たせません" },
  { icon: Bell, text: "体験→入会の自動化", sub: "体験完了→入会案内→決済リンク→3日後リマインドまで全自動" },
  { icon: Users, text: "会員管理・出席チェックイン", sub: "ステータス管理（アクティブ/休会/退会）と来店記録を一元化" },
  { icon: CreditCard, text: "Stripe決済で入会金+月額を自動課金", sub: "セミパーソナル・マンツーマンの入会がLINE上で完結" },
  { icon: CalendarDays, text: "スタッフ管理・シフト・予約カレンダー", sub: "週間カレンダーで予約一覧。シフトと休みも簡単管理" },
  { icon: Send, text: "会員へのLINE一斉配信", sub: "キャンペーン・お知らせを会員ステータス別に配信" },
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
