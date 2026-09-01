"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items: { image: string; title: string; body: string; tag: string; note?: string }[] = [
  {
    image: "/images/phone-line-chat.png",
    tag: "LINE予約管理・AI自動応対",
    title: "24時間、予約を受け付ける",
    body:
      "公式LINE上のAIが問い合わせに答え、空き枠を照会して予約まで自動で確定します。営業時間外の取りこぼしがなくなり、電話と手作業の予約受付から離れられます。",
    note: "画像は当社の検証環境です。表示名は導入先ごとに設定できます。",
  },
  {
    image: "/images/smartlock-entry.png",
    tag: "入退館管理・スマートロック",
    title: "LINEから、鍵が開く",
    body:
      "会員証をLINEに置き、本人確認を済ませたうえでスマートロックを解錠します。入退館の記録も同時に残るため、会員ごとの利用頻度がそのまま見えます。",
  },
  {
    image: "/images/members-checkin.png",
    tag: "会員管理・顧客カルテ",
    title: "予約と顧客を、一元管理する",
    body:
      "チェックイン、来店履歴、会員ステータス、顧客カルテ。予約履歴の管理まで同じ画面に集まります。台帳への転記も、ツール間の行き来も発生しません。",
  },
  {
    image: "/images/staff-dashboard.png",
    tag: "多店舗管理・本部管理",
    title: "複数店舗を、本部から見る",
    body:
      "店舗ごとの予約状況と会員数を、横断で確認できます。既存の会員データはCSVで一括取り込み、既存の予約システムとはAPIで連携します。決済はStripeとSquareに対応します。",
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

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mt-14">
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
