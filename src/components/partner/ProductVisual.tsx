"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items: { image: string; title: string; body: string; tag: string; note?: string }[] = [
  {
    image: "/images/ui-reservations.jpg",
    tag: "LINE予約管理・AI自動応対",
    title: "24時間、予約が埋まっていく",
    body:
      "公式LINE上のAIが問い合わせに答え、空き枠を照会して予約まで自動で確定します。確定した予約は、この週間カレンダーにそのまま入ります。営業時間外の取りこぼしがなくなります。",
  },
  {
    image: "/images/ui-entry.jpg",
    tag: "入退館管理・スマートロック",
    title: "来館が、その場で記録に変わる",
    body:
      "会員証をLINEに置き、本人確認を済ませたうえでスマートロックを解錠します。チェックインは同時に記録されるので、会員ごとの利用頻度と来館率がそのまま見えます。",
  },
  {
    image: "/images/ui-customers.jpg",
    tag: "会員管理・顧客カルテ",
    title: "予約と顧客を、一元管理する",
    body:
      "会員ステータス、来店回数、最終来店日、顧客カルテ。予約履歴の管理まで同じ画面に集まります。台帳への転記も、ツール間の行き来も発生しません。CSVで一括取り込みできます。",
  },
  {
    image: "/images/ui-schedule.jpg",
    tag: "スタッフ管理・多店舗管理",
    title: "誰がいつ入るかを、先に決めておく",
    body:
      "スタッフ×時間で枠を組み、そこに予約が入る形です。複数店舗の状況は本部から横断で確認できます。既存の予約システムとはAPIで連携し、決済はStripeとSquareに対応します。",
  },
];

export default function ProductVisual() {
  return (
    <section id="whatyouget" className="py-[60px] sm:py-[95px] px-6 bg-[#FAFAFA]">
      <div className="max-w-[1150px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          What you sell
        </motion.p>
        <h2 className="mt-4 text-[26px] sm:text-[38px] font-bold text-center text-[#1A1A1A] leading-[1.35]">
          御社が売るのは、これです。
        </h2>
        <p className="mt-5 text-center text-[#666666] text-[15px] sm:text-[16px] leading-[1.85] max-w-[640px] mx-auto">
          FAQに答えるだけのチャットボットではありません。
          <br className="hidden sm:block" />
          店舗の予約管理・顧客管理・入退館・決済までを、ひとつの仕組みでつなぎます。
        </p>

        <p className="mt-4 text-center text-[12px] text-[#94A3B8]">
          ※ 以下はすべて実際の管理画面です。表示しているデータはサンプルです。
        </p>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mt-12">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="bg-white border border-[#EAEAEA] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative w-full bg-[#F4F7F9] aspect-[3/2]">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-contain p-3"
                />
              </div>
              <div className="p-6 sm:p-7">
                <span className="inline-block text-[11.5px] font-bold tracking-wide text-[#06C755] bg-[#E8F5E9] rounded-full px-3 py-1">
                  {it.tag}
                </span>
                <h3 className="mt-3.5 text-[18px] sm:text-[20px] font-bold text-[#1A1A1A] leading-snug">
                  {it.title}
                </h3>
                <p className="mt-3 text-[14px] text-[#555555] leading-[1.85]">{it.body}</p>
                {it.note && (
                  <p className="mt-3 text-[12px] text-[#94A3B8] leading-relaxed">{it.note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
