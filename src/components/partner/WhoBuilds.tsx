"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

const rows = [
  ["会社名", "株式会社TomorrowProof"],
  ["法人番号", "9010401192344"],
  ["設立", "2025年8月8日"],
  ["所在地", "東京都港区南青山7-1-27-702"],
  ["代表取締役", "上月 貴博（こうづき たかひろ）"],
  ["事業内容", "AIエージェントの受託開発、業務システムの設計・実装、AI活用の顧問支援"],
  [
    "セキュリティ",
    "保存データはAES-256で暗号化。全通信はSSL。APIレスポンスに秘密鍵を含めない設計で、ログに個人情報を記録しません。カード情報はStripeが直接処理し、当社のサーバーを通過しません",
  ],
];

export default function WhoBuilds() {
  return (
    <section className="py-[60px] sm:py-[90px] px-6 bg-white">
      <div className="max-w-[860px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          誰が作っているのか。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-center text-[#666666] text-[15px] leading-[1.85]"
        >
          御社の名前で出すものです。誰が裏側にいるのかは、はっきりさせておきます。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mt-10 border border-[#EAEAEA] rounded-2xl overflow-hidden"
        >
          <dl>
            {rows.map(([k, v], i) => (
              <div
                key={k}
                className={`grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] gap-4 px-5 sm:px-7 py-4 ${
                  i % 2 === 0 ? "bg-[#FAFAFA]" : "bg-white"
                }`}
              >
                <dt className="text-[13px] sm:text-[14px] text-[#777777]">{k}</dt>
                <dd className="text-[13px] sm:text-[14px] text-[#1A1A1A] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <p className="mt-6 text-center text-[14px] text-[#666666]">
          <a href={SITE.companyUrl} className="text-[#06C755] font-bold hover:underline">
            会社サイトを見る
          </a>
        </p>
      </div>
    </section>
  );
}
