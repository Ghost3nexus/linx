"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const facts = [
  {
    title: "お客様が触るのは、その店の公式LINEです",
    body: "アカウントごとにLINEチャネルの資格情報を保持する構成のため、エンドユーザーの画面にLINXという名称は一切出ません。新しいアプリのインストールも発生しません。",
    live: true,
  },
  {
    title: "AIの名前も、店舗ごとに変えられます",
    body: "応対するAIの表示名を店舗単位で設定できます。御社のサービス名でも、店舗のスタッフ名でも構いません。",
    live: true,
  },
  {
    title: "顧客データは、テナントごとに分かれています",
    body: "会員情報・予約・会話ログはすべてアカウント単位で分離されています。他の導入先のデータと混ざることはありません。",
    live: true,
  },
  {
    title: "価格も契約期間も、御社が決めます",
    body: "当社にお支払いいただくのは卸値のみです。エンドユーザーへの販売価格、プラン構成、契約期間、請求方法はすべて御社の設計です。",
    live: true,
  },
];

export default function WhatYouGet() {
  return (
    <section id="whatyouget" className="py-[60px] sm:py-[90px] px-6 bg-[#FAFAFA]">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#06C755] text-center"
        >
          What you get
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          いま、この時点でできること。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[#666666] text-[15px] sm:text-[16px] leading-relaxed"
        >
          構想ではなく、すでに動いている仕様だけを書いています。
          <br className="hidden sm:block" />
          まだできないことは、この下に分けて書きました。
        </motion.p>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {facts.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white border border-[#EAEAEA] rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-[#06C755] flex items-center justify-center shrink-0">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] leading-snug">{f.title}</h3>
                  <p className="mt-3 text-[14px] text-[#555555] leading-[1.85]">{f.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
