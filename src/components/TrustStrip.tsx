"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5", unit: "分", label: "で導入完了" },
  { value: "70", unit: "%", label: "問い合わせ自動化" },
  { value: "24", unit: "時間", label: "365日対応" },
  { value: "0", unit: "円", label: "からはじめられる" },
];

export default function TrustStrip() {
  return (
    <section className="py-10 sm:py-14 px-6 bg-[#F5FBF7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[900px] mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-[36px] sm:text-[48px] font-bold text-[#06C755]" style={{ lineHeight: 1 }}>
                  {s.value}
                </span>
                <span className="text-[16px] sm:text-[18px] font-bold text-[#06C755]">
                  {s.unit}
                </span>
              </div>
              <p className="mt-1 text-[14px] text-[#666666] font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
