"use client";

import { motion } from "framer-motion";

type Brand = {
  name: string;
  accent: string;
  bubble: string;
  ask: string;
  reply: string;
};

/** すべて架空の店名です。実在の導入先ではありません */
const brands: Brand[] = [
  {
    name: "BEYOND FITNESS",
    accent: "#1F2937",
    bubble: "#DCF0FF",
    ask: "明日の体験、空いてますか？",
    reply: "明日18:00〜に空きがございます。\nご予約されますか？",
  },
  {
    name: "aria pilates",
    accent: "#B08968",
    bubble: "#F4E9DE",
    ask: "リフォーマー予約したいです",
    reply: "本日15:00〜、残り2枠です。\nお名前を教えてください。",
  },
  {
    name: "整体院 このは",
    accent: "#2E6E8E",
    bubble: "#DDEDF5",
    ask: "腰が痛くて診てほしいです",
    reply: "初回カウンセリングの空きです。\n明日10:00〜／16:00〜",
  },
];

function Phone({ brand, index }: { brand: Brand; index: number }) {
  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full max-w-[260px] mx-auto"
    >
      <div className="relative bg-white border border-[#E2E8F0] rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(15,23,42,0.10)]">
        {/* ブランドごとのヘッダー */}
        <div
          className="px-4 pt-6 pb-3 flex items-center justify-center"
          style={{ background: brand.accent }}
        >
          <span className="text-white text-[13px] font-bold tracking-wide truncate">
            {brand.name}
          </span>
        </div>

        {/* トーク */}
        <div className="bg-[#8CA7B8] px-3 py-4 space-y-2.5 min-h-[210px]">
          <div className="flex justify-end">
            <p
              className="max-w-[85%] rounded-2xl rounded-tr-sm px-3 py-2 text-[11.5px] leading-relaxed text-[#1A1A1A]"
              style={{ background: brand.bubble }}
            >
              {brand.ask}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="max-w-[88%] bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-[11.5px] leading-relaxed text-[#1A1A1A] whitespace-pre-line">
              {brand.reply}
            </p>
          </div>
          <div className="flex justify-start">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold text-white"
              style={{ background: brand.accent }}
            >
              予約を確定する
            </span>
          </div>
        </div>

        {/* 入力欄 */}
        <div className="bg-white px-3 py-2.5 flex items-center gap-2 border-t border-[#EEEEEE]">
          <span className="flex-1 h-6 rounded-full bg-[#F1F5F9]" />
          <span
            className="w-6 h-6 rounded-full shrink-0"
            style={{ background: brand.accent }}
          />
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-[#94A3B8]">{brand.name}</p>
    </motion.div>
  );
}

export default function WhiteLabelProof() {
  return (
    <section className="py-[60px] sm:py-[95px] px-6 bg-white overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          White label
        </motion.p>
        <h2 className="mt-4 text-[26px] sm:text-[38px] font-bold text-center text-[#1A1A1A] leading-[1.35]">
          この3つは、同じシステムです。
        </h2>
        <p className="mt-5 text-center text-[#666666] text-[15px] sm:text-[16px] leading-[1.85] max-w-[620px] mx-auto">
          お客様に見えるのは、御社が決めた名前と色だけ。
          <br className="hidden sm:block" />
          LINXという文字は、どこにも出てきません。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mt-14">
          {brands.map((b, i) => (
            <Phone key={b.name} brand={b} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] text-[#A0AEC0]">
          ※ 店名・配色はいずれも表示例です。実在の導入先ではありません。
        </p>
      </div>
    </section>
  );
}
