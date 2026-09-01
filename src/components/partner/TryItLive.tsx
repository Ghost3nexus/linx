"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { DEMO_LINE_URL } from "@/lib/site";
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

      <div className="max-w-[680px] mx-auto px-0 sm:px-6">
        <div className="border border-[#E8E8E8] rounded-2xl p-6 sm:p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mx-auto">
            <MessageCircle size={24} className="text-[#06C755]" />
          </div>
          <h3 className="mt-5 text-[19px] sm:text-[21px] font-bold text-[#1A1A1A]">
            実機のLINEでも、そのままお試しいただけます
          </h3>
          <p className="mt-3 text-[14px] text-[#666666] leading-[1.85]">
            上は画面上の再現です。実際のLINE上で、予約が確定するところまでご確認いただけます。
          </p>
          {DEMO_LINE_URL ? (
            <a
              href={DEMO_LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors"
            >
              デモ用LINEを友だち追加する
              <ArrowRight size={17} />
            </a>
          ) : (
            <Link
              href="/documents"
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors"
            >
              デモ環境のご案内を受け取る
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
