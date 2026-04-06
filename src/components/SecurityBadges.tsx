"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Server } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "AES-256暗号化 + SSL通信" },
  { icon: BadgeCheck, label: "LINE公式API連携" },
  { icon: Server, label: "顧客情報の漏洩防止対策済み" },
];

export default function SecurityBadges() {
  return (
    <section className="py-10 sm:py-12 px-6">
      <div className="section-divider mb-10 sm:mb-12" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[800px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <badge.icon size={20} className="text-[#06C755]" />
              </div>
              <p className="text-[14px] sm:text-[15px] text-[#666666] font-medium">
                {badge.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
