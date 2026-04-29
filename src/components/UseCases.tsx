"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function UseCases() {
  return (
    <section className="py-[80px] sm:py-[120px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[#06C755] font-bold text-[14px] tracking-wider text-center mb-3"
        >
          USE CASES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-center text-[#0F172A] leading-tight"
        >
          業種を問わず、店舗運営をまるごと自動化
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#475569] text-[16px] max-w-[560px] mx-auto leading-[1.8]"
        >
          ジム・サロン・クリニックから飲食・小売まで。
          <br className="hidden sm:block" />
          LINE公式アカウントを軸にした店舗運営の自動化を、すべての業種で。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 sm:mt-16 relative"
        >
          <div className="relative aspect-[3/2] w-full max-w-[960px] mx-auto">
            <Image
              src="/images/industry-logos.png"
              alt="あらゆる店舗業務にLINX — ジム / サロン / サウナ / ピラティス / ヨガ / クリニック / 飲食店 / 小売店"
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center text-[#64748B] text-[13px]"
        >
          ※ 業種別の活用事例は <a href="/solutions" className="text-[#06C755] hover:underline font-medium">業種別ソリューション</a> をご覧ください
        </motion.p>
      </div>
    </section>
  );
}
