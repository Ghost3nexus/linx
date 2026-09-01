"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LinxChip from "./LinxChip";


/** 背景に敷く店舗。業種の広さを、読ませるのでなく見せる */
const backdrop = [
  { image: "/images/hero-gym.jpg", alt: "ジム" },
  { image: "/images/usecase-yoga.jpg", alt: "ヨガスタジオ" },
  { image: "/images/hero-salon.jpg", alt: "美容室" },
  { image: "/images/usecase-pilates.jpg", alt: "ピラティススタジオ" },
  { image: "/images/usecase-sauna.jpg", alt: "サウナ施設" },
  { image: "/images/usecase-clinic.jpg", alt: "クリニック" },
  { image: "/images/usecase-studio.jpg", alt: "ダンススタジオ" },
  { image: "/images/usecase-pickleball.jpg", alt: "ピックルボール施設" },
];

/** 出すのは条件だけ。金額と掛け率は相手ごとに組むので、資料と打ち合わせで渡す */
const facts = [
  { v: "0円", l: "初期費用・最低販売数" },
  { v: "御社", l: "販売価格と契約期間を決めるのは" },
  { v: "非公開", l: "エンドユーザーに当社の名前は" },
];

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0C0E]">
      {/* 背景：店舗のモザイク */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="grid h-full w-full grid-cols-2 grid-rows-4 sm:grid-cols-4 sm:grid-rows-2">
          {backdrop.map((b) => (
            <div key={b.image} className="relative">
              <Image
                src={b.image}
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {/* 覆い。左は文字が乗るので濃く、右は店舗が見える程度に薄く残す */}
        <div className="absolute inset-0 bg-[#0B0C0E]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/92 via-45% to-[#0B0C0E]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/45" />
        <div className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-[#06C755]/12 blur-[150px]" />
      </div>

      {/* 手前：チップと文字 */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-8 pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.75fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-bold tracking-wide text-white/85 backdrop-blur sm:text-[13px]">
              初期費用 0円
              <span className="text-white/25">／</span>
              御社のブランドで販売
            </p>

            <h1 className="mt-6 text-[32px] font-extrabold leading-[1.2] tracking-tight text-white sm:text-[44px] md:text-[52px]">
              あらゆる店舗を動かす
              <br />
              <span className="text-[#06C755]">店舗管理AI OS</span>を、
              <br />
              御社の名前で。
            </h1>

            <p className="mt-6 max-w-[520px] text-[15px] leading-[1.9] text-[#B6BCC6] sm:text-[17px]">
              ジム、美容室、ヨガ、ピラティス、クリニック、サウナ。
              予約管理・顧客管理・入退館・決済を、公式LINE上のAIがまとめて引き受けます。
              価格も契約期間も、御社が決められます。
            </p>

            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <a
                href="#revenue"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-8 py-4 text-[16px] font-bold text-white transition-colors hover:bg-[#05B04A]"
              >
                収益の立ち方を見る
                <ArrowRight size={18} />
              </a>
              <a
                href="#tryit"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-[16px] font-bold text-white backdrop-blur transition-colors hover:border-white/50"
              >
                デモを触ってみる
              </a>
            </div>

            <dl className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-7">
              {facts.map((f) => (
                <div key={f.l} className="flex items-baseline gap-2">
                  <dt className="sr-only">{f.l}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="tabular-nums text-[18px] font-bold text-white">{f.v}</span>
                    <span className="text-[12px] text-[#8A919C]">{f.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* チップ */}
          <div className="flex flex-col items-center">
            <LinxChip className="w-[210px] sm:w-[260px] lg:w-full lg:max-w-[300px] animate-[chipPulse_3.2s_ease-in-out_infinite] drop-shadow-[0_20px_60px_rgba(6,199,85,0.28)]" />
            <p className="mt-5 text-center text-[12px] leading-relaxed text-white/50 sm:text-[13px]">
              業種はちがっても、
              <br className="hidden sm:block" />
              動かしている仕組みは同じです。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
