"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  AI_UNIT_WHOLESALE,
  MARGIN_RATE,
  WHOLESALE_MONTHLY,
  yen,
} from "@/lib/wholesale";

const facts = [
  { v: yen(WHOLESALE_MONTHLY), l: "卸値／1店舗・月" },
  { v: `${Math.round(MARGIN_RATE * 100)}%`, l: "御社の取り分" },
  { v: `¥${AI_UNIT_WHOLESALE}`, l: "AI応答／1回" },
];

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0C0E]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/3 w-[720px] h-[720px] bg-[#06C755]/12 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-160px] right-1/4 w-[560px] h-[560px] bg-[#2C7BE5]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-10 items-center">
          {/* 左：コピー */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] sm:text-[13px] font-bold tracking-wide text-white/85">
              初期費用 0円
              <span className="text-white/25">／</span>
              取り分 {Math.round(MARGIN_RATE * 100)}%
            </p>

            <h1 className="mt-6 text-white text-[32px] sm:text-[44px] md:text-[54px] font-extrabold leading-[1.18] tracking-tight">
              御社の名前で売る、
              <br />
              <span className="text-[#06C755]">店舗管理AI OS</span>。
            </h1>

            <p className="mt-6 text-[#9CA3AF] text-[15px] sm:text-[17px] leading-[1.9] max-w-[500px]">
              多店舗の予約管理・顧客管理・入退館・決済を、公式LINE上のAIでひとつにつなぐ基盤です。
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

            {/* 数字は細く一列に置く */}
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

          {/* 右：製品を重ねて見せる（奥＝本部の管理画面 / 手前＝お客様のLINE） */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[16/11] w-full">
              {/* 奥：管理画面 */}
              <div className="absolute inset-y-0 left-0 right-[8%] rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)] bg-[#12141A]">
                <Image
                  src="/images/staff-dashboard.png"
                  alt="多店舗の予約と会員を本部から一元管理する管理画面"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover object-left-top opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0C0E]/70 via-transparent to-transparent" />
              </div>

              {/* 手前：お客様のLINE */}
              <div className="absolute -bottom-[6%] right-0 w-[38%] rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.6)] bg-white">
                <Image
                  src="/images/phone-line-chat.png"
                  alt="公式LINE上でAIが予約を受け付けている画面"
                  width={512}
                  height={768}
                  sizes="(max-width: 1024px) 40vw, 240px"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* 関係を一言で示す */}
              <p className="absolute left-3 bottom-3 text-[11px] sm:text-[12px] text-white/55 bg-black/45 backdrop-blur rounded-full px-3 py-1.5">
                奥：本部の管理画面　／　手前：お客様が触る公式LINE
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
