"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, CalendarCheck } from "lucide-react";
import { meetingHref, documentsHref } from "@/lib/site";

export default function PartnerCTA() {
  return (
    <section className="py-[70px] sm:py-[110px] px-6 bg-[#1A1A1A]">
      <div className="max-w-[860px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[40px] font-bold text-white leading-[1.35]"
        >
          テリトリーが空いているうちに。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-[#AAAAAA] text-[15px] sm:text-[17px] leading-[1.9]"
        >
          どちらからでも構いません。話が早いのは打ち合わせのほうです。
          <br className="hidden sm:block" />
          商圏が空いているかどうかも、その場でお答えできます。
        </motion.p>

        <div className="mx-auto mt-10 grid max-w-[720px] gap-4 sm:grid-cols-2">
          <Link
            href={meetingHref()}
            className="group rounded-2xl border border-[#06C755] bg-[#06C755] p-6 text-left transition-colors hover:bg-[#05B04A] sm:p-7"
          >
            <div className="flex items-center gap-2.5">
              <CalendarCheck size={20} className="text-white" />
              <span className="text-[17px] font-bold text-white">打ち合わせを申し込む</span>
              <ArrowRight size={17} className="ml-auto text-white/70 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.85] text-white/85">
              実際のLINEと管理画面を動かしながら、御社の商圏で成り立つかを一緒に見ます。
              日程はこちらから折り返します。
            </p>
          </Link>

          <Link
            href={documentsHref()}
            className="group rounded-2xl border border-[#3A3A3A] bg-[#161616] p-6 text-left transition-colors hover:border-[#06C755] sm:p-7"
          >
            <div className="flex items-center gap-2.5">
              <FileText size={20} className="text-[#06C755]" />
              <span className="text-[17px] font-bold text-white">資料を受け取る</span>
              <ArrowRight size={17} className="ml-auto text-white/40 transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.85] text-[#AAAAAA]">
              卸値表、契約条件、導入の流れをまとめた資料をお送りします。
              社内で回してご検討ください。
            </p>
          </Link>
        </div>

        <p className="mt-8 text-[13px] text-[#777777]">
          製品そのものをご覧になりたい場合は{" "}
          <Link href="/product" className="text-[#06C755] hover:underline font-bold">
            店舗向けの紹介ページ
          </Link>{" "}
          をご確認ください。
        </p>
      </div>
    </section>
  );
}
