"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, CalendarCheck, UserCheck, Timer } from "lucide-react";

const items = [
  {
    icon: MessageSquare,
    before: "毎朝30件の未読LINE",
    after: "AIが24時間自動応答",
    color: "#E53935",
  },
  {
    icon: CalendarCheck,
    before: "予約はExcel手入力",
    after: "AIが自動で予約確定",
    color: "#2196F3",
  },
  {
    icon: UserCheck,
    before: "返信忘れでお客様を逃す",
    after: "取りこぼしゼロ",
    color: "#F59E0B",
  },
  {
    icon: Timer,
    before: "事務作業に1日2時間",
    after: "事務作業ほぼゼロ",
    color: "#9333EA",
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-[80px] sm:py-[120px] md:py-[160px] px-6 bg-[#F8F9FA]">
      <div className="max-w-[960px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          Before → After
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          LINXを導入すると、こう変わります
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[16px] sm:text-[18px] text-[#666666] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          面倒な作業はAIに任せて、本業に集中できます
        </motion.p>

        <div className="mt-12 sm:mt-16 space-y-5 sm:space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.before}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8E8E8] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                {/* Before */}
                <div className="flex-1 w-full sm:w-auto flex items-center gap-4 bg-[#FFF5F5] rounded-xl px-5 py-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#CC3333] tracking-wider uppercase">Before</span>
                    <p className="text-[15px] sm:text-[17px] font-bold text-[#993333] mt-0.5" style={{ lineHeight: 1.5 }}>
                      {item.before}
                    </p>
                  </div>
                </div>

                {/* Arrow with progress bar */}
                <div className="shrink-0 flex flex-col items-center justify-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-[#06C755] flex items-center justify-center shadow-md rotate-90 sm:rotate-0">
                    <ArrowRight size={20} className="text-white" />
                  </div>
                  {/* Horizontal progress bar (desktop only) */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="hidden sm:block w-8 h-[3px] bg-[#06C755] rounded-full origin-left"
                  />
                </div>

                {/* After */}
                <div className="flex-1 w-full sm:w-auto flex items-center gap-4 bg-[#E8F5E9] rounded-xl px-5 py-4">
                  <div className="w-10 h-10 rounded-xl bg-[#06C755] flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#06C755] tracking-wider uppercase">After</span>
                    <p className="text-[15px] sm:text-[17px] font-bold text-[#1A1A1A] mt-0.5" style={{ lineHeight: 1.5 }}>
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
