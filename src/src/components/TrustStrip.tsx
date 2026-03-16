"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 5, unit: "分", label: "で導入完了" },
  { value: 70, unit: "%", label: "問い合わせ自動化" },
  { value: 24, unit: "時間", label: "365日対応" },
  { value: 0, unit: "円", label: "からはじめられる" },
];

function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (target === 0) { setCount(0); return; }
    let start = 0;
    const step = Math.ceil(target / (duration * 60));
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

export default function TrustStrip() {
  return (
    <section className="py-14 sm:py-20 px-6" style={{ background: "linear-gradient(180deg, #F5FBF7 0%, #FFFFFF 100%)" }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[1000px] mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[56px] sm:text-[72px] font-bold text-gradient-green count-up-number" style={{ lineHeight: 1 }}>
                  <CountUp target={s.value} />
                </span>
                <span className="text-[20px] sm:text-[24px] font-bold text-[#06C755]">
                  {s.unit}
                </span>
              </div>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#666666] font-medium">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
