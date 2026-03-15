"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, UserX } from "lucide-react";

const pains = [
  {
    icon: MessageCircle,
    emoji: "😩",
    title: "同じ質問に何度も答えてる",
    description: "「予約できますか？」「営業時間は？」毎日同じ質問に手を止めて返信していませんか？",
  },
  {
    icon: Clock,
    emoji: "😰",
    title: "夜や休みの問い合わせを逃してる",
    description: "朝起きたらLINE通知が大量。返信が遅れて、お客様が他のお店に行ってしまうことも。",
  },
  {
    icon: UserX,
    emoji: "😫",
    title: "対応に追われて本業ができない",
    description: "LINE対応だけで午前が終わる。本当にやりたい仕事に集中できていますか？",
  },
];

export default function Pain() {
  return (
    <section className="py-[60px] sm:py-[80px] px-6">
      <div className="max-w-[960px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          こんなお悩み、ありませんか？
        </motion.h2>

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-3 gap-5 sm:gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border-2 border-[#F0F0F0] rounded-2xl p-7 sm:p-8 hover:border-[#06C755]/30 transition-all duration-300 text-center"
            >
              <span className="text-[40px]">{pain.emoji}</span>
              <h3 className="mt-4 text-[18px] font-bold text-[#1A1A1A]" style={{ lineHeight: 1.5 }}>
                {pain.title}
              </h3>
              <p className="mt-3 text-[15px] text-[#666666]" style={{ lineHeight: 1.8 }}>
                {pain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
