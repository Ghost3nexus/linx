"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Server, Eye } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "AES-256暗号化", sub: "データを軍事レベルで保護" },
  { icon: Lock, label: "SSL/TLS通信", sub: "全通信を暗号化" },
  { icon: Eye, label: "PII保護", sub: "個人情報をログに記録しない" },
  { icon: Server, label: "PCI DSS準拠", sub: "カード情報はStripe/Square経由" },
];

export default function SecurityBadges() {
  return (
    <section className="py-16 sm:py-20 px-6 bg-[#1A1A1A]">
      <div className="max-w-[900px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-white/40 text-[13px] font-bold tracking-wider mb-8"
        >
          SECURITY
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <badge.icon size={22} className="text-[#06C755]" />
              </div>
              <p className="text-white text-[14px] font-bold">{badge.label}</p>
              <p className="text-white/40 text-[12px] mt-1">{badge.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
