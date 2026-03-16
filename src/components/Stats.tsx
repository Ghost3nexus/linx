"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  {
    value: 80,
    suffix: "%",
    label: "事務作業削減",
    description: "LINE対応にかけていた時間を大幅カット",
  },
  {
    value: 3,
    suffix: "秒",
    label: "応答速度",
    description: "お客様を待たせない即時レスポンス",
  },
  {
    value: 24,
    suffix: "時間",
    label: "365日対応",
    description: "夜中も休日もAIが自動で応答",
  },
  {
    value: 5,
    suffix: "分",
    label: "で導入完了",
    description: "むずかしい設定は一切不要",
  },
];

function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration * 60)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Stats() {
  return (
    <section className="py-[80px] sm:py-[120px] md:py-[160px] px-6 bg-[#1A1A1A]">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[14px] font-bold tracking-[0.1em] uppercase text-[#06C755] text-center mb-4"
        >
          導入効果
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-white"
          style={{ lineHeight: 1.3 }}
        >
          数字で見る、LINXの効果
        </motion.h2>

        <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[64px] sm:text-[80px] md:text-[96px] font-bold text-gradient-green count-up-number" style={{ lineHeight: 1 }}>
                  <CountUp target={stat.value} />
                </span>
                <span className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#06C755]">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-3 text-[16px] sm:text-[18px] font-bold text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-[13px] sm:text-[14px] text-[#999999]" style={{ lineHeight: 1.5 }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
