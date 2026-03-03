"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, UserX } from "lucide-react";

const pains = [
  {
    icon: MessageCircle,
    title: "同じ質問に何度も答えてる",
    description: "「明日の持ち物は？」「予約空いてる？」「在庫ある？」——繰り返される質問に、毎回手を止めて返信。",
  },
  {
    icon: Clock,
    title: "営業時間外の問い合わせが溜まる",
    description: "朝起きたらLINE通知が30件。返信だけで午前が終わる。本業の時間が削られていく。",
  },
  {
    icon: UserX,
    title: "返信忘れでお客様を逃した",
    description: "たった1時間の返信遅れで、競合に流れてしまった。LINEは便利だが、速さが命。",
  },
];

export default function Pain() {
  return (
    <section className="py-[80px] sm:py-[100px] px-6">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-center"
          style={{ lineHeight: 1.4 }}
        >
          こんな毎日、続けられますか？
        </motion.h2>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-5 sm:gap-6">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-2xl p-7 sm:p-8"
            >
              <pain.icon size={28} className="text-[#6B7280]" />
              <h3 className="mt-5 text-[17px] sm:text-[18px] font-semibold text-white" style={{ lineHeight: 1.5 }}>
                {pain.title}
              </h3>
              <p className="mt-3 text-[15px] text-[#9CA3AF]" style={{ lineHeight: 1.8 }}>
                {pain.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center text-[#6B7280] text-[15px] sm:text-[16px]"
        >
          LINEは便利。でも、対応工数が人間のボトルネックになっている。
        </motion.p>
      </div>
    </section>
  );
}
