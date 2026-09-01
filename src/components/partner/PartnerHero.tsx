"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LinxChip from "./LinxChip";
import {
  AI_UNIT_WHOLESALE,
  MARGIN_RATE,
  WHOLESALE_MONTHLY,
  yen,
} from "@/lib/wholesale";

/** チップを囲む8業種。中央のチップが、これらをまとめて動かしていることを示す */
const stores = [
  { name: "ジム", image: "/images/hero-gym.png" },
  { name: "ヨガ", image: "/images/usecase-yoga.png" },
  { name: "美容室", image: "/images/hero-salon.png" },
  { name: "ピラティス", image: "/images/usecase-pilates.png" },
  { name: "サウナ", image: "/images/usecase-sauna.png" },
  { name: "クリニック", image: "/images/usecase-clinic.png" },
  { name: "スタジオ", image: "/images/usecase-studio.png" },
  { name: "ピックルボール", image: "/images/usecase-pickleball.png" },
];

const facts = [
  { v: yen(WHOLESALE_MONTHLY), l: "卸値／1店舗・月" },
  { v: `${Math.round(MARGIN_RATE * 100)}%`, l: "御社の取り分" },
  { v: `¥${AI_UNIT_WHOLESALE}`, l: "AI応答／1回" },
];

/** ヒーローの絵はJSに依存させない。opacity を落とすと、
    スクリプトが動くまで何も見えない状態になる */
function StoreTile({ s }: { s: (typeof stores)[number] }) {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
      <Image
        src={s.image}
        alt={`${s.name}の店舗`}
        fill
        priority
        sizes="(max-width: 1024px) 30vw, 150px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <span className="absolute left-2 bottom-1.5 text-white text-[11px] sm:text-[12px] font-bold drop-shadow">
        {s.name}
      </span>
    </div>
  );
}

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0C0E]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[720px] h-[720px] bg-[#06C755]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-160px] right-1/4 w-[560px] h-[560px] bg-[#2C7BE5]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-12 items-center">
          {/* 左：何のサービスか */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] sm:text-[13px] font-bold tracking-wide text-white/85">
              初期費用 0円
              <span className="text-white/25">／</span>
              取り分 {Math.round(MARGIN_RATE * 100)}%
            </p>

            <h1 className="mt-6 text-white text-[32px] sm:text-[44px] md:text-[52px] font-extrabold leading-[1.2] tracking-tight">
              あらゆる店舗を動かす
              <br />
              <span className="text-[#06C755]">店舗管理AI OS</span>を、
              <br />
              御社の名前で。
            </h1>

            <p className="mt-6 text-[#9CA3AF] text-[15px] sm:text-[17px] leading-[1.9] max-w-[500px]">
              ジム、美容室、ヨガ、ピラティス、クリニック、サウナ。
              予約管理・顧客管理・入退館・決済を、公式LINE上のAIがまとめて引き受けます。
              価格も契約期間も、御社が決められます。
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mt-9">
              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-colors"
              >
                卸値表を見る
                <ArrowRight size={18} />
              </a>
              <a
                href="#tryit"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/45 text-white font-bold px-8 py-4 rounded-full text-[16px] transition-colors"
              >
                実際のLINEで試す
              </a>
            </div>

            <dl className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-10 pt-7 border-t border-white/10">
              {facts.map((f) => (
                <div key={f.l} className="flex items-baseline gap-2">
                  <dt className="sr-only">{f.l}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="text-white text-[18px] font-bold tabular-nums">{f.v}</span>
                    <span className="text-[#6B7280] text-[12px]">{f.l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 右：店舗が並び、中央でLINXが動かしている */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <StoreTile s={stores[0]} />
              <StoreTile s={stores[1]} />
              <StoreTile s={stores[2]} />

              <StoreTile s={stores[3]} />
              {/* 中央：チップ */}
              <div className="relative aspect-square flex items-center justify-center">
                <LinxChip className="w-full h-full animate-[chipPulse_3.2s_ease-in-out_infinite]" />
              </div>
              <StoreTile s={stores[4]} />

              <StoreTile s={stores[5]} />
              <StoreTile s={stores[6]} />
              <StoreTile s={stores[7]} />
            </div>

            <p className="mt-4 text-center text-[12px] sm:text-[13px] text-white/45">
              業種はちがっても、動かしている仕組みは同じです。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
