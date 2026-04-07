"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, UserX } from "lucide-react";

const pains = [
  {
    icon: MessageCircle,
    color: "#E53935",
    title: "同じ質問に何度も答えてる",
    description: "「予約できますか？」「営業時間は？」毎日同じ質問に手を止めて返信していませんか？",
  },
  {
    icon: Clock,
    color: "#F59E0B",
    title: "夜や休みの問い合わせを逃してる",
    description: "朝起きたらLINE通知が大量。返信が遅れて、お客様が他のお店に行ってしまうことも。",
  },
  {
    icon: UserX,
    color: "#9333EA",
    title: "対応に追われて本業ができない",
    description: "LINE対応だけで午前が終わる。本当にやりたい仕事に集中できていますか？",
  },
];

export default function Pain() {
  return (
    <section className="py-[80px] sm:py-[120px] px-6 bg-[#FAFAFA]">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[#E53935] font-bold text-[14px] tracking-wider text-center mb-3"
        >
          PAIN POINTS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-center text-[#1A1A1A] leading-tight"
        >
          こんなお悩み、ありませんか？
        </motion.h2>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className="relative bg-white rounded-2xl p-8 sm:p-10 text-center overflow-hidden transition-all duration-300 shadow-sm"
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ backgroundColor: pain.color }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              />

              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
                style={{ backgroundColor: `${pain.color}10` }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <pain.icon size={28} style={{ color: pain.color }} />
              </motion.div>

              <h3 className="mt-6 text-[18px] sm:text-[20px] font-extrabold text-[#1A1A1A] leading-snug">
                {pain.title}
              </h3>
              <p className="mt-3 text-[14px] sm:text-[15px] text-[#666] leading-relaxed">
                {pain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
