"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Server } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "SSL暗号化で安全" },
  { icon: BadgeCheck, label: "LINE公式API連携" },
  { icon: Server, label: "国内サーバーで管理" },
];

export default function SecurityBadges() {
  return (
    <section className="py-8 px-6 border-t border-[#F0F0F0]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[800px] mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-full bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <badge.icon size={18} className="text-[#06C755]" />
              </div>
              <p className="text-[14px] text-[#666666] font-medium">
                {badge.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
