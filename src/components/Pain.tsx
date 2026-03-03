"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, UserX } from "lucide-react";

const pains = [
  {
    icon: MessageCircle,
    title: "同じ質問に何度も答えてる",
    description: "「明日の持ち物は？」「予約空いてる？」「在庫ある？」",
  },
  {
    icon: Clock,
    title: "営業時間外の問い合わせが溜まる",
    description: "朝起きたらLINE通知が30件。返信だけで午前が終わる。",
  },
  {
    icon: UserX,
    title: "返信忘れでお客様を逃した",
    description: "1時間の返信遅れで、競合に流れてしまった。",
  },
];

export default function Pain() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          こんな毎日、続けられますか？
        </motion.h2>

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0D1117] border border-[#1A1A2E] rounded-2xl p-5 sm:p-6"
            >
              <pain.icon size={32} className="text-[#6B7280]" />
              <h3 className="mt-4 text-base sm:text-lg font-semibold text-[#FAFAFA]">
                {pain.title}
              </h3>
              <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                {pain.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-10 text-center text-[#6B7280] text-sm sm:text-base"
        >
          LINEは便利。でも、対応工数が人間のボトルネックになっている。
        </motion.p>
      </div>
    </section>
  );
}
