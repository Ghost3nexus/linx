"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "T.S. さん",
    role: "カフェオーナー（渋谷）",
    quote:
      "夜中の問い合わせにも自動で返信してくれるので、朝の返信ラッシュがなくなりました。設定もかんたんで、5分で使い始められました。",
    metric: "LINE対応の時間 80%削減",
  },
  {
    name: "M.K. さん",
    role: "美容サロン経営（表参道）",
    quote:
      "「空いてますか？」「メニューは？」の質問を全部AIが答えてくれます。予約の取りこぼしがゼロになって、売上も上がりました。",
    metric: "問い合わせ自動化 95%",
  },
  {
    name: "Y.I. さん",
    role: "歯科クリニック院長",
    quote:
      "患者さんの質問に24時間答えられるようになって、受付スタッフの負担が激減。AIが判断できないときはちゃんと通知が来るのも安心です。",
    metric: "受付スタッフの負担 1日2時間削減",
  },
];

export default function SocialProof() {
  return (
    <section className="py-[60px] sm:py-[80px] px-6 section-alt">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          ご利用者の声
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          導入された方の感想
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-[#999999] text-[14px]"
        >
          ※ ベータ版テスターの方々のご感想です
        </motion.p>

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-[#E8E8E8] rounded-2xl p-7 sm:p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-[#F9A825] fill-[#F9A825]" />
                ))}
              </div>

              <p
                className="text-[15px] text-[#333333] flex-1"
                style={{ lineHeight: 1.8 }}
              >
                {t.quote}
              </p>

              <div className="mt-6 pt-5 border-t border-[#F0F0F0]">
                <p className="text-[15px] font-bold text-[#1A1A1A]">{t.name}</p>
                <p className="text-[13px] text-[#999999]">{t.role}</p>
                <div className="mt-3 inline-block bg-[#E8F5E9] text-[#06C755] text-[13px] font-bold px-3 py-1.5 rounded-full">
                  {t.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
