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
    <section className="py-[50px] sm:py-[80px] md:py-[100px] px-6 section-alt">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          ご利用者の声
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          導入された方の感想
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#999999] text-[14px] sm:text-[15px]"
        >
          ※ ベータ版テスターの方々のご感想です
        </motion.p>

        <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white border border-[#E8E8E8] border-l-[4px] border-l-[#06C755] rounded-2xl p-8 sm:p-9 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ transition: "all 0.3s cubic-bezier(.25,1,.5,1)" }}
            >
              {/* Stars - bigger */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={20} className="text-[#F9A825] fill-[#F9A825]" />
                ))}
              </div>

              <p
                className="text-[15px] sm:text-[16px] text-[#333333] flex-1"
                style={{ lineHeight: 1.8 }}
              >
                {t.quote}
              </p>

              <div className="mt-7 pt-6 border-t border-[#F0F0F0]">
                <p className="text-[15px] sm:text-[16px] font-bold text-[#1A1A1A]">{t.name}</p>
                <p className="text-[13px] sm:text-[14px] text-[#999999]">{t.role}</p>
                <div className="mt-3 inline-block bg-[#E8F5E9] text-[#06C755] text-[13px] sm:text-[14px] font-bold px-4 py-1.5 rounded-full">
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
