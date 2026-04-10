"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MessageCircle, Clock, UserX, ArrowRight } from "lucide-react";

function AnimatedNumber({ value, suffix }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setShow(true), 200);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <span ref={ref} className="inline-block">
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="inline-block"
      >
        {value}
        {suffix && <span className="text-[60%]">{suffix}</span>}
      </motion.span>
    </span>
  );
}

const transforms = [
  {
    icon: MessageCircle,
    pain: "毎朝30件のLINE未読",
    solve: "AIが即回答。未読ゼロへ",
    metric: "80",
    suffix: "%",
    metricLabel: "対応時間削減",
  },
  {
    icon: Clock,
    pain: "夜の問い合わせを全部逃す",
    solve: "24時間365日、自動で受付",
    metric: "24",
    suffix: "h",
    metricLabel: "無人対応",
  },
  {
    icon: UserX,
    pain: "予約はExcel。返信忘れも",
    solve: "予約確定→リマインドまで自動",
    metric: "0",
    suffix: "件",
    metricLabel: "取りこぼし",
  },
];

export default function BeforeAfter() {
  return (
    <section className="py-[60px] sm:py-[100px] px-6 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[38px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          その悩み、LINXが解決します
        </motion.h2>

        <div className="mt-10 sm:mt-16 space-y-5 sm:space-y-6">
          {transforms.map((t, i) => (
            <motion.div
              key={t.pain}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="group flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden border border-[#E8E8E8] hover:border-[#06C755]/40 hover:shadow-xl transition-all duration-500"
            >
              {/* Pain */}
              <div className="flex-1 flex items-center gap-4 sm:gap-5 px-6 sm:px-8 py-5 sm:py-6 bg-[#FAFAFA]">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-[#E53935]/10 flex items-center justify-center shrink-0"
                >
                  <t.icon size={24} className="text-[#E53935]" />
                </motion.div>
                <p className="text-[17px] sm:text-[19px] text-[#999] line-through decoration-[#E53935]/40 decoration-2">
                  {t.pain}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center px-4 py-3 lg:py-0 bg-[#06C755] group-hover:bg-[#05B04A] transition-colors duration-300">
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight size={22} className="text-white rotate-90 lg:rotate-0" />
                </motion.div>
              </div>

              {/* Solve + Metric */}
              <div className="flex-1 flex items-center gap-5 sm:gap-6 px-6 sm:px-8 py-5 sm:py-6 bg-white">
                <p className="text-[17px] sm:text-[19px] font-bold text-[#1A1A1A] flex-1" style={{ lineHeight: 1.5 }}>
                  {t.solve}
                </p>
                <div className="text-right shrink-0">
                  <p className="text-[36px] sm:text-[44px] font-bold text-[#06C755] leading-none">
                    <AnimatedNumber value={t.metric} suffix={t.suffix} />
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-[#999] mt-1">{t.metricLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
