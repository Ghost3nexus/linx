"use client";

import { motion } from "framer-motion";
import { UserPlus, Bot, Bell, Clock } from "lucide-react";

const points = [
  { icon: UserPlus, text: "公式LINEにBotを追加するだけ" },
  { icon: Bot, text: "よくある質問はAIが自動で回答" },
  { icon: Bell, text: "判断が必要なときはあなたに通知" },
  { icon: Clock, text: "24時間365日、即レス" },
];

export default function Solution() {
  return (
    <section id="solution" className="py-[80px] sm:py-[100px] px-6 border-t border-[#1A1A2E]">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          Solution
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[34px] md:text-[44px] font-bold text-center"
          style={{ lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          LINXが、あなたの代わりに答えます。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 sm:mt-8 text-center text-[#9CA3AF] text-[16px] sm:text-[18px] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.9 }}
        >
          LINXは、あなたの公式LINEに参加するAIスタッフ。
          お客様が「@LINX」と呼びかけるだけで、あなたが登録した情報をもとにAIが即座に回答します。
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-center text-white text-[15px] sm:text-[17px] font-medium"
        >
          あなたは、本当に必要なときだけ会話に参加すればいい。
        </motion.p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[640px] mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl px-6 py-5 card-glow transition-all duration-300"
            >
              <point.icon size={22} className="text-[#06C755] shrink-0" />
              <span className="text-[15px] text-[#E5E7EB] font-medium" style={{ lineHeight: 1.6 }}>
                {point.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
