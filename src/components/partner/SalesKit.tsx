"use client";

import { motion } from "framer-motion";
import { FileText, MonitorPlay, MessageCircle } from "lucide-react";

const kit = [
  {
    icon: FileText,
    title: "業種別の提案ページ 8本",
    body: "ジム・美容室・ヨガ・ピラティス・クリニック・サウナ・スタジオ・ピックルボール。業種ごとに課題と機能を書き分けてあります。商談でそのまま開けます。",
  },
  {
    icon: MonitorPlay,
    title: "紹介動画",
    body: "店舗オーナー向けに、深夜の問い合わせからAIが予約を確定するまでを60秒で説明する動画です。現状は当社名義のため、御社名義版はご契約時に個別でご用意します。",
  },
  {
    icon: MessageCircle,
    title: "デモ環境",
    body: "商談の場で実際のLINEを触っていただけます。実績の話より、動くものを見せたほうが早い場面で使えます。",
  },
];

export default function SalesKit() {
  return (
    <section className="py-[60px] sm:py-[95px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          Sales kit
        </motion.p>
        <h2 className="mt-4 text-[26px] sm:text-[38px] font-bold text-center text-[#1A1A1A] leading-[1.35]">
          売る道具も、一緒に渡します。
        </h2>
        <p className="mt-5 text-center text-[#666666] text-[15px] sm:text-[16px] leading-[1.85] max-w-[620px] mx-auto">
          ホワイトラベルは開発の負担を消しますが、売る仕事は消しません。
          <br className="hidden sm:block" />
          そこで使えるものを、最初から揃えてあります。
        </p>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-12 rounded-2xl overflow-hidden border border-[#E8E8E8] bg-[#0E0E0E]"
        >
          <video
            className="w-full h-auto block"
            controls
            playsInline
            preload="none"
            poster="/media/linx-intro-poster.jpg"
          >
            <source src="/media/linx-intro-60s.mp4" type="video/mp4" />
            この動画を再生するには、動画に対応したブラウザが必要です。
          </video>
        </motion.div>
        <p className="mt-3 text-center text-[12px] text-[#94A3B8]">
          ※ 動画内の店名・料金はすべて表示例です。実在の導入先ではありません。
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {kit.map((k, i) => (
            <motion.div
              key={k.title}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="border border-[#EAEAEA] rounded-2xl p-6 sm:p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <k.icon size={21} className="text-[#06C755]" />
              </div>
              <h3 className="mt-5 text-[17px] font-bold text-[#1A1A1A] leading-snug">{k.title}</h3>
              <p className="mt-3 text-[14px] text-[#555555] leading-[1.85]">{k.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
