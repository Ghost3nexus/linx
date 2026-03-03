"use client";

import { motion } from "framer-motion";
import { UserPlus, Bot, Bell, Clock } from "lucide-react";

const points = [
  { icon: UserPlus, text: "グループLINEにBotを追加するだけ" },
  { icon: Bot, text: "よくある質問はAIが自動で回答" },
  { icon: Bell, text: "判断が必要なときはあなたに通知" },
  { icon: Clock, text: "24時間365日、即レス" },
];

export default function Solution() {
  return (
    <section id="solution" className="py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          LINXが、あなたの代わりに答えます。
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 sm:mt-6 text-center text-[#6B7280] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          LINXは、あなたのLINEグループに参加するAIスタッフ。
          <br className="hidden sm:block" />
          お客様が「@LINX」と呼びかけるだけで、
          <br className="hidden sm:block" />
          あなたが登録した情報をもとにAIが即座に回答します。
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 sm:mt-4 text-center text-[#FAFAFA] text-sm sm:text-base font-medium"
        >
          あなたは、本当に必要なときだけ会話に参加すればいい。
        </motion.p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 bg-[#0D1117] border border-[#1A1A2E] rounded-xl px-4 sm:px-5 py-3.5 sm:py-4"
            >
              <point.icon size={20} className="text-[#06C755] shrink-0" />
              <span className="text-[#FAFAFA] text-sm font-medium">
                {point.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
