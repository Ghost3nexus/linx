"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const industries = [
  { slug: "gym", name: "パーソナルジム", image: "/images/hero-gym.png", note: "入退館・月会費・体験からの入会" },
  { slug: "salon", name: "美容室・サロン", image: "/images/hero-salon.png", note: "指名予約・施術後のアフターケア" },
  { slug: "yoga", name: "ヨガスタジオ", image: "/images/usecase-yoga.png", note: "少人数クラスの定員・キャンセル待ち" },
  { slug: "pilates", name: "ピラティス", image: "/images/usecase-pilates.png", note: "マシン台数×講師×時間帯の枠管理" },
  { slug: "clinic", name: "クリニック・整体院", image: "/images/usecase-clinic.png", note: "事前問診・来院リマインド" },
  { slug: "sauna", name: "サウナ・スパ", image: "/images/usecase-sauna.png", note: "時間制予約・混雑状況の配信" },
  { slug: "studio", name: "ダンス・スタジオ", image: "/images/usecase-studio.png", note: "クラス予約・出席管理・月謝" },
  { slug: "pickleball", name: "ピックルボール", image: "/images/usecase-pickleball.png", note: "コート予約・大会エントリー" },
];

export default function Industries() {
  return (
    <section id="industries" className="py-[60px] sm:py-[95px] px-6 bg-white">
      <div className="max-w-[1150px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          Industries
        </motion.p>
        <h2 className="mt-4 text-[26px] sm:text-[38px] font-bold text-center text-[#1A1A1A] leading-[1.35]">
          8業種ぶんの提案ページが、ついてきます。
        </h2>
        <p className="mt-5 text-center text-[#666666] text-[15px] sm:text-[16px] leading-[1.85] max-w-[660px] mx-auto">
          業種ごとに、想定される課題と機能を書き分けたページを用意しています。
          <br className="hidden sm:block" />
          そのまま御社の商談で見せていただけます。
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-14">
          {industries.map((ind, i) => (
            <motion.a
              key={ind.slug}
              href={`/solutions/${ind.slug}`}
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="group block rounded-2xl overflow-hidden border border-[#E8E8E8] hover:border-[#06C755] hover:shadow-[0_10px_34px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] bg-[#F4F7F9] overflow-hidden">
                <Image
                  src={ind.image}
                  alt={`${ind.name}向けLINX提案ページのイメージ`}
                  fill
                  sizes="(max-width: 640px) 50vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between gap-2">
                  <h3 className="text-white text-[14px] sm:text-[15px] font-bold leading-snug drop-shadow">
                    {ind.name}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-white/80 group-hover:text-white shrink-0 mb-0.5"
                  />
                </div>
              </div>
              <p className="px-3.5 py-3 text-[12px] text-[#777777] leading-relaxed">{ind.note}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
