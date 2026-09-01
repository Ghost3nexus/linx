"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, MessageSquare } from "lucide-react";

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
          卸値表、契約条件、導入の流れをまとめた資料をお送りします。
          <br className="hidden sm:block" />
          具体的な商圏のご相談は、個別に承ります。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <Link
            href="/documents"
            className="inline-flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(6,199,85,0.35)]"
          >
            <FileText size={18} />
            パートナー資料を請求する
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/documents"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#3A3A3A] hover:border-[#06C755] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all duration-300"
          >
            <MessageSquare size={18} />
            個別に相談する
          </Link>
        </motion.div>

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
