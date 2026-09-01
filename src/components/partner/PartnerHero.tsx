"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import {
  AI_UNIT_WHOLESALE,
  MARGIN_RATE,
  SUGGESTED_RETAIL,
  WHOLESALE_MONTHLY,
  yen,
} from "@/lib/wholesale";

const partnerShare = SUGGESTED_RETAIL - WHOLESALE_MONTHLY;

export default function PartnerHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#06C755]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#5B9BD5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
          {/* 左：コピー */}
          <div>
            <p
              className="inline-block bg-[#1A1A1A] text-white text-[12px] sm:text-[13px] font-bold tracking-wider px-4 py-2 rounded-full"
            >
              初期費用 0円 ／ 取り分 {Math.round(MARGIN_RATE * 100)}%
            </p>

            <h1
              className="mt-6 text-[#0F172A] text-[32px] sm:text-[44px] md:text-[54px] font-extrabold leading-[1.18] tracking-tight"
            >
              御社の名前で売る、
              <br />
              <span className="text-[#06C755]">店舗のAIシステム</span>。
            </h1>

            <p
              className="mt-6 text-[#475569] text-[16px] sm:text-[18px] leading-[1.85] max-w-[520px]"
            >
              公式LINEに入るAIを、御社のブランドで。
              <br className="hidden sm:block" />
              価格も契約期間も、御社が決められます。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <a
                href="#simulator"
                className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(6,199,85,0.35)]"
              >
                卸値表を見る
                <ArrowRight size={18} />
              </a>
              <a
                href="#tryit"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#E2E8F0] hover:border-[#06C755] text-[#0F172A] font-bold px-8 py-4 rounded-full text-[16px] transition-all duration-300 hover:bg-[#06C755]/5"
              >
                実際のLINEで試す
              </a>
            </div>
          </div>

          {/* 右：卸値の流れ */}
          <motion.div
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-white border border-[#E5E7EB] rounded-3xl shadow-[0_12px_50px_rgba(15,23,42,0.08)] p-6 sm:p-8"
          >
            <p className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#94A3B8]">
              1店舗あたり・月
            </p>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] sm:text-[14px] text-[#475569]">
                  エンドユーザーの支払い
                </span>
                <span className="text-[#0F172A] text-[26px] sm:text-[30px] font-extrabold tabular-nums leading-none">
                  {yen(SUGGESTED_RETAIL)}
                </span>
              </div>
              <p className="mt-1.5 text-right text-[11px] text-[#94A3B8]">
                想定価格。御社が自由に決められます
              </p>
            </div>

            <div className="flex justify-center my-4" aria-hidden="true">
              <ArrowDown size={18} className="text-[#CBD5E1]" />
            </div>

            <div className="rounded-2xl bg-[#F0FBF4] border border-[#06C755]/25 p-4 sm:p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] sm:text-[14px] font-bold text-[#047A34]">
                  御社の取り分
                </span>
                <span className="text-[#06C755] text-[26px] sm:text-[30px] font-extrabold tabular-nums leading-none">
                  {yen(partnerShare)}
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#D6F2E0] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#06C755]"
                  style={{ width: `${MARGIN_RATE * 100}%` }}
                />
              </div>
              <p className="mt-2 text-right text-[12px] font-bold text-[#047A34] tabular-nums">
                {Math.round(MARGIN_RATE * 100)}%
              </p>
            </div>

            <div className="mt-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 sm:p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] sm:text-[14px] text-[#475569]">
                  当社への卸値
                </span>
                <span className="text-[#334155] text-[20px] sm:text-[22px] font-bold tabular-nums leading-none">
                  {yen(WHOLESALE_MONTHLY)}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-dashed border-[#E5E7EB]">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-[#475569]">
                  ＋ AI応答（実費で仕入れ）
                </span>
                <span className="text-[#334155] text-[16px] font-bold tabular-nums">
                  ¥{AI_UNIT_WHOLESALE} / 回
                </span>
              </div>
              <p className="mt-2 text-[11.5px] text-[#94A3B8] leading-relaxed">
                エンドユーザーへは従量のまま請求しても、月額に含めて売っても構いません。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
