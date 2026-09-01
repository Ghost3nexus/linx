"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items: { image: string; title: string; body: string; tag: string; note?: string }[] = [
  {
    image: "/images/phone-line-chat.png",
    title: "公式LINEの中で、会話が完結する",
    body: "問い合わせに答えるだけでなく、空き枠を照会して予約を確定します。お客様は新しいアプリを入れる必要がありません。",
    tag: "AI応対・予約確定",
    note: "画像は当社の検証環境です。表示名は導入先ごとに設定できます。",
  },
  {
    image: "/images/smartlock-entry.png",
    title: "LINEから、鍵が開く",
    body: "会員証をLINEに置き、本人確認を済ませたうえでスマートロックを解錠します。入退館の記録も同時に残ります。",
    tag: "入退館・スマートロック",
  },
  {
    image: "/images/members-checkin.png",
    title: "会員の状態が、そのまま台帳になる",
    body: "チェックイン、来店履歴、会員ステータス。現場の操作がそのままデータになるので、別途の入力作業が発生しません。",
    tag: "会員管理・チェックイン",
  },
  {
    image: "/images/staff-dashboard.png",
    title: "店舗側の画面も、ひととおり揃っている",
    body: "予約カレンダー、顧客、スタッフ、レポート。導入先の店舗がその日から使える状態で渡せます。",
    tag: "管理画面",
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
          予約を確定し、会員を管理し、鍵を開けるところまで繋がっています。
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
