"use client";

import { motion } from "framer-motion";
import { Shield, Cpu, MessageSquare, Zap } from "lucide-react";

const badges = [
  { icon: Cpu, label: "Claude AI搭載", sub: "by Anthropic" },
  { icon: MessageSquare, label: "LINE公式API連携", sub: "Messaging API" },
  { icon: Shield, label: "SSL暗号化通信", sub: "256-bit" },
  { icon: Zap, label: "平均応答 3秒以内", sub: "リアルタイム" },
];

export default function TrustStrip() {
  return (
    <section className="py-10 sm:py-14 px-6 border-t border-[#1A1A2E]/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[1000px] mx-auto"
      >
        <p className="text-center text-[12px] text-[#4B5563] tracking-[0.1em] uppercase font-medium mb-8">
          Powered by
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <badge.icon size={20} className="text-[#4B5563]" />
              <div>
                <p className="text-[14px] text-[#9CA3AF] font-medium">{badge.label}</p>
                <p className="text-[11px] text-[#4B5563]">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
