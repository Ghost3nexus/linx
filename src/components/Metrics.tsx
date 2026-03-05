"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "3", unit: "秒", prefix: "<", label: "平均応答時間" },
  { value: "70", unit: "%", prefix: "", label: "問い合わせ自動化率" },
  { value: "24", unit: "h", prefix: "", label: "365日休まず対応" },
  { value: "5", unit: "分", prefix: "", label: "導入完了まで" },
];

export default function Metrics() {
  return (
    <section className="py-14 sm:py-20 px-6">
      <div className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                {m.prefix && (
                  <span className="text-[20px] sm:text-[24px] text-[#06C755] font-bold">
                    {m.prefix}
                  </span>
                )}
                <span className="text-[40px] sm:text-[56px] font-bold text-white tracking-tight" style={{ lineHeight: 1 }}>
                  {m.value}
                </span>
                <span className="text-[18px] sm:text-[22px] text-[#06C755] font-semibold">
                  {m.unit}
                </span>
              </div>
              <p className="mt-2 text-[13px] sm:text-[14px] text-[#6B7280]">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
