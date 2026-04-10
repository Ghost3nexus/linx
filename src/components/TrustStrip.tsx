"use client";

import { motion } from "framer-motion";

const partners = [
  {
    name: "LINE",
    logo: (
      <svg width="80" height="30" viewBox="0 0 80 30" fill="currentColor">
        <path d="M40 2C21.6 2 6.7 13.4 6.7 27.2c0 6.2 3.1 11.8 8.1 16.1.4.3.6.8.5 1.3l-.8 4.7c-.1.4.4.8.8.6l5.3-3.1c.4-.2.8-.2 1.2-.1 2.8.8 5.9 1.2 9.1 1.2h0" transform="scale(0.45) translate(5, -5)" opacity="0.9" />
        <text x="28" y="21" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif">LINE</text>
      </svg>
    ),
  },
  {
    name: "Stripe",
    logo: (
      <svg width="80" height="30" viewBox="0 0 80 30" fill="currentColor">
        <text x="8" y="21" fontSize="16" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.5">Stripe</text>
      </svg>
    ),
  },
  {
    name: "SwitchBot",
    logo: (
      <span className="text-[15px] sm:text-[16px] font-bold tracking-tight">SwitchBot</span>
    ),
  },
  {
    name: "Claude AI",
    logo: (
      <span className="text-[15px] sm:text-[16px] font-bold tracking-tight">Claude AI</span>
    ),
  },
];

const badges = [
  {
    icon: "🛡️",
    title: "LINE×AI自動応答 業界唯一*",
    sub: "*2026年4月 自社調べ",
  },
  {
    icon: "🎓",
    title: "生成AIパスポート保有開発者",
    sub: "JDLA認定",
  },
  {
    icon: "🔒",
    title: "AES-256暗号化 + SSL通信",
    sub: "PII保護準拠",
  },
];

export default function TrustStrip() {
  return (
    <section
      className="py-14 sm:py-20 px-6"
      style={{ background: "linear-gradient(180deg, #F5FBF7 0%, #FFFFFF 100%)" }}
    >
      <div className="max-w-[1000px] mx-auto">
        {/* 段1: 連携パートナーロゴバー */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-[13px] sm:text-[14px] text-[#999999] mb-6 tracking-wide">
            信頼のテクノロジーパートナーと連携
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-[#BBBBBB] hover:text-[#06C755] transition-colors duration-300 cursor-default select-none"
              >
                {p.logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 区切り線 */}
        <div className="my-10 sm:my-12 border-t border-[#F0F0F0]" />

        {/* 段2: 信頼バッジ3つ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 sm:gap-4 bg-white border border-[#D6F0DB] rounded-full px-5 sm:px-6 py-3.5 sm:py-4 shadow-sm"
            >
              <span className="text-[24px] sm:text-[28px] shrink-0">{b.icon}</span>
              <div className="min-w-0">
                <p className="text-[13px] sm:text-[14px] font-bold text-[#1A1A1A] leading-snug">
                  {b.title}
                </p>
                <p className="text-[11px] sm:text-[12px] text-[#999999] mt-0.5">
                  {b.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
