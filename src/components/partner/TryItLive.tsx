"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, MonitorPlay, ArrowRight } from "lucide-react";
import { DEMO_LINE_URL, meetingHref } from "@/lib/site";
import Demo from "@/components/Demo";

export default function TryItLive() {
  return (
    <section id="tryit" className="py-[60px] sm:py-[90px] px-6 bg-white">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          Try it
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          導入実績の話は、あとにします。
          <br />
          まず、動くものを触ってください。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[15px] sm:text-[16px] leading-[1.85] max-w-[680px] mx-auto"
        >
          有償での提供実績は、まだありません。だからこそ地域と業種のテリトリーが空いています。
          <br className="hidden sm:block" />
          実績の代わりに置いているのが、これです。
        </motion.p>
      </div>

      <div className="mt-4">
        <Demo embedded />
      </div>

      <div className="mx-auto max-w-[880px] px-0 sm:px-6">
        <div className="rounded-2xl border border-[#E8E8E8] p-6 sm:p-8">
          <h3 className="text-center text-[19px] font-bold text-[#1A1A1A] sm:text-[21px]">
            商談では、2つの画面を見せることになります
          </h3>
          <p className="mx-auto mt-3 max-w-[600px] text-center text-[14px] leading-[1.85] text-[#666666]">
            お客様が触る公式LINEと、店舗が使う管理画面。
            どちらもそのままお見せいただけるよう用意しています。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* お客様側 */}
            <div className="rounded-xl border border-[#EAEAEA] p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <MessageCircle size={21} className="text-[#06C755]" />
              </div>
              <h4 className="mt-4 text-[16px] font-bold text-[#1A1A1A]">お客様が触る公式LINE</h4>
              <p className="mt-2.5 text-[13.5px] leading-[1.85] text-[#666666]">
                実機のLINEは、打ち合わせの場でお見せします。問い合わせから予約が確定するところまで、
                実際に動かしてご確認いただけます。
              </p>
              <Link
                href={DEMO_LINE_URL ?? meetingHref()}
                {...(DEMO_LINE_URL ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#05B04A]"
              >
                打ち合わせを申し込む
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* 店舗側 */}
            <div className="rounded-xl border border-[#EAEAEA] p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5E9]">
                <MonitorPlay size={21} className="text-[#06C755]" />
              </div>
              <h4 className="mt-4 text-[16px] font-bold text-[#1A1A1A]">店舗が使う管理画面</h4>
              <p className="mt-2.5 text-[13.5px] leading-[1.85] text-[#666666]">
                ログイン不要で開きます。架空の店舗のサンプルデータで、予約・会員・入退館・シフトを触れます。
              </p>
              <Link
                href="/demo"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#05B04A]"
              >
                管理画面デモを開く
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-[12px] text-[#94A3B8]">
            ※ どちらも架空の店舗です。実在の導入先ではありません。
          </p>
        </div>
      </div>
    </section>
  );
}
