"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, CalendarCheck, UserCheck, Timer } from "lucide-react";

const items = [
  {
    icon: MessageSquare,
    before: "毎朝30件の未読LINE",
    after: "AIが24時間自動応答",
    emoji: "📩",
  },
  {
    icon: CalendarCheck,
    before: "予約はExcel手入力",
    after: "AIが自動で予約確定",
    emoji: "📅",
  },
  {
    icon: UserCheck,
    before: "返信忘れでお客様を逃す",
    after: "取りこぼしゼロ",
    emoji: "🤝",
  },
  {
    icon: Timer,
    before: "事務作業に1日2時間",
    after: "事務作業ほぼゼロ",
    emoji: "⏱️",
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-[60px] sm:py-[80px] px-6 bg-[#F5FBF7]">
      <div className="max-w-[960px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          LINXを導入すると、こう変わります
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[16px] text-[#666666]"
          style={{ lineHeight: 1.8 }}
        >
          面倒な作業はAIに任せて、本業に集中できます
        </motion.p>

        <div className="mt-10 sm:mt-14 space-y-4 sm:space-y-5">
          {items.map((item, i) => (
            <motion.div
              key={item.before}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8E8E8] p-5 sm:p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Before */}
                <div className="flex-1 w-full sm:w-auto flex items-center gap-4 bg-[#FFF5F5] rounded-xl px-5 py-4">
                  <span className="text-[28px] shrink-0">{item.emoji}</span>
                  <div>
                    <span className="text-[11px] font-bold text-[#CC3333] tracking-wider uppercase">Before</span>
                    <p className="text-[15px] sm:text-[16px] font-bold text-[#993333] mt-0.5" style={{ lineHeight: 1.5 }}>
                      {item.before}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#06C755] flex items-center justify-center shadow-md rotate-90 sm:rotate-0">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>

                {/* After */}
                <div className="flex-1 w-full sm:w-auto flex items-center gap-4 bg-[#E8F5E9] rounded-xl px-5 py-4">
                  <div className="w-10 h-10 rounded-xl bg-[#06C755] flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#06C755] tracking-wider uppercase">After</span>
                    <p className="text-[15px] sm:text-[16px] font-bold text-[#1A1A1A] mt-0.5" style={{ lineHeight: 1.5 }}>
                      {item.after}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
