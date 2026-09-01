"use client";

import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Headphones } from "lucide-react";

const rules = [
  {
    icon: MapPin,
    title: "地域と業種で、パートナー数を絞ります",
    body: "同じ商圏で複数の代理店が同じ商材を提案し、値崩れが起きる状態を避けます。具体的な区分けは個別にご相談のうえ、契約書に明記します。",
  },
  {
    icon: ShieldCheck,
    title: "当社はエンドユーザーに直接売りません",
    body: "御社が獲得したお客様に、当社が後から直接アプローチすることはありません。契約書で明確にします。",
  },
  {
    icon: Headphones,
    title: "一次サポートは御社、二次サポートは当社",
    body: "エンドユーザーからのお問い合わせは御社にお願いしています。当社は御社向けに、技術的な調査・不具合対応・機能相談を担当します。この線引きが、厚い掛け率を成立させています。",
  },
];

export default function Territory() {
  return (
    <section id="territory" className="py-[60px] sm:py-[90px] px-6 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          誰にでも卸すわけでは、ありません。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[15px] leading-[1.85] max-w-[640px] mx-auto"
        >
          先に売った方の商圏を守れなければ、卸す意味がないと考えています。
        </motion.p>

        <div className="mt-10 max-w-[720px] mx-auto bg-[#1A1A1A] rounded-2xl p-6 sm:p-7">
          <p className="text-[13px] font-bold tracking-wide text-[#06C755]">
            現在の条件について
          </p>
          <p className="mt-3 text-[14px] sm:text-[15px] text-[#DDDDDD] leading-[1.9]">
            掲載している卸値と掛け率は、<strong className="text-white">立ち上げ期のパートナー向けの条件</strong>です。
            地域・業種ごとの枠が埋まり次第、条件を見直します。
            すでにご契約いただいた分は、契約期間中そのまま据え置きます。
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-[860px] gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-7">
            <h3 className="text-[16px] font-bold text-[#1A1A1A]">お取引の条件</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "法人であること",
                "販売を担当される方がいること",
                "自社の商材として扱う意思があること",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed text-[#333333]">
                  <span className="shrink-0 font-bold text-[#06C755]">—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[#94A3B8]">
              契約主体として成立するかの確認です。
            </p>
          </div>

          <div className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-7">
            <h3 className="text-[16px] font-bold text-[#1A1A1A]">打ち合わせで一緒に見ること</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "すでにお取引のある店舗が何件あるか",
                "その店舗が予約制・会員制か",
                "その店舗が公式LINEを運用しているか",
                "商圏が空いているか",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-[14px] leading-relaxed text-[#333333]">
                  <span className="shrink-0 font-bold text-[#06C755]">—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] leading-relaxed text-[#94A3B8]">
              売れるかどうかを決めるのは、御社そのものよりも御社がすでにお取引されている店舗です。
              噛み合わないと分かった場合、無理にお勧めしません。
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {rules.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-[#EAEAEA] rounded-2xl p-6 sm:p-7 flex gap-5"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] flex items-center justify-center shrink-0">
                <r.icon size={21} className="text-[#06C755]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#1A1A1A] leading-snug">{r.title}</h3>
                <p className="mt-2.5 text-[14px] text-[#555555] leading-[1.85]">{r.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
