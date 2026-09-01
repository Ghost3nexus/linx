"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const industries = [
  { slug: "gym", name: "パーソナルジム・フィットネス", note: "入退館・月会費・体験からの入会" },
  { slug: "salon", name: "美容室・ヘアサロン", note: "指名予約・施術後のアフターケア" },
  { slug: "yoga", name: "ヨガスタジオ", note: "少人数クラスの定員・キャンセル待ち" },
  { slug: "pilates", name: "ピラティススタジオ", note: "マシン台数×講師×時間帯の枠管理" },
  { slug: "clinic", name: "クリニック・整体院", note: "事前問診・来院リマインド" },
  { slug: "sauna", name: "サウナ・スパ施設", note: "時間制予約・混雑状況の配信" },
  { slug: "studio", name: "ダンス・カルチャースタジオ", note: "クラス予約・出席管理・月謝" },
  { slug: "pickleball", name: "ピックルボール施設", note: "コート予約・大会エントリー" },
];

export default function Industries() {
  return (
    <section id="industries" className="py-[60px] sm:py-[90px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          どの業界に、売れますか。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[15px] leading-[1.85] max-w-[680px] mx-auto"
        >
          業種ごとに、想定される課題と機能を書き分けた提案ページを用意しています。
          <br className="hidden sm:block" />
          そのまま御社の商談資料としてお使いいただけます。
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {industries.map((ind, i) => (
            <motion.a
              key={ind.slug}
              href={`/solutions/${ind.slug}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="group border border-[#E8E8E8] rounded-xl p-5 hover:border-[#06C755] hover:shadow-[0_6px_24px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-snug">{ind.name}</h3>
                <ArrowUpRight
                  size={17}
                  className="text-[#CCCCCC] group-hover:text-[#06C755] transition-colors shrink-0 mt-0.5"
                />
              </div>
              <p className="mt-2.5 text-[13px] text-[#777777] leading-relaxed">{ind.note}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
