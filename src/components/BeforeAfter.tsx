"use client";

import { motion } from "framer-motion";
import { MessageCircle, Clock, UserX, Zap } from "lucide-react";

const transforms = [
  {
    icon: MessageCircle,
    pain: "毎朝30件のLINE未読",
    solve: "AIが即回答。未読ゼロへ",
    metric: "80%",
    metricLabel: "対応時間削減",
  },
  {
    icon: Clock,
    pain: "夜の問い合わせを全部逃す",
    solve: "24時間365日、自動で受付",
    metric: "24h",
    metricLabel: "無人対応",
  },
  {
    icon: UserX,
    pain: "予約はExcel。返信忘れも",
    solve: "予約確定→リマインドまで自動",
    metric: "0件",
    metricLabel: "取りこぼし",
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-[60px] sm:py-[90px] px-6 bg-white">
      <div className="max-w-[960px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[36px] md:text-[44px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          その悩み、LINXが解決します
        </motion.h2>

        <div className="mt-10 sm:mt-14 space-y-4 sm:space-y-5">
          {transforms.map((t, i) => (
            <motion.div
              key={t.pain}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden border border-[#E8E8E8] hover:shadow-lg transition-shadow duration-300"
            >
              {/* Pain */}
              <div className="flex-1 flex items-center gap-4 px-6 py-5 bg-[#FAFAFA]">
                <div className="w-10 h-10 rounded-xl bg-[#E53935]/10 flex items-center justify-center shrink-0">
                  <t.icon size={20} className="text-[#E53935]" />
                </div>
                <p className="text-[15px] sm:text-[16px] text-[#999] line-through decoration-[#E53935]/40">
                  {t.pain}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center px-3 py-2 sm:py-0 bg-[#06C755]">
                <Zap size={18} className="text-white" />
              </div>

              {/* Solve */}
              <div className="flex-1 flex items-center gap-4 px-6 py-5 bg-white">
                <p className="text-[15px] sm:text-[16px] font-bold text-[#1A1A1A] flex-1">
                  {t.solve}
                </p>
                <div className="text-right shrink-0">
                  <p className="text-[24px] sm:text-[28px] font-bold text-[#06C755] leading-none">{t.metric}</p>
                  <p className="text-[11px] text-[#999] mt-0.5">{t.metricLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
