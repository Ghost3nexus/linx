"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Server } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "SSL暗号化通信",
    description: "全通信を256bit SSL/TLSで保護",
  },
  {
    icon: BadgeCheck,
    label: "LINE公式API連携",
    description: "LINE Messaging API正規パートナー",
  },
  {
    icon: Server,
    label: "データ国内保管",
    description: "日本国内サーバーで安全に管理",
  },
];

export default function SecurityBadges() {
  return (
    <section className="py-10 sm:py-14 px-6 border-t border-[#1A1A2E]/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[900px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0A0A0F] border border-[#1A1A2E] flex items-center justify-center shrink-0">
                <badge.icon size={18} className="text-[#06C755]" />
              </div>
              <div>
                <p className="text-[14px] text-[#D1D5DB] font-medium">
                  {badge.label}
                </p>
                <p className="text-[11px] text-[#4B5563]">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
