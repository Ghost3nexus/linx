"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "本当に5分で導入できますか？",
    a: "はい。管理画面でナレッジ情報（PDF or テキスト）をアップロードし、LINEグループにLINXを招待するだけです。プログラミングの知識は一切不要です。",
  },
  {
    q: "AIが間違った回答をしたらどうなりますか？",
    a: "LINXはあなたが登録した情報をもとに回答します。登録していない内容については「担当者に確認します」と返答し、あなたに通知を送ります。",
  },
  {
    q: "お客様の個人情報は安全ですか？",
    a: "会話データは暗号化して保存されます。第三者への提供は一切行いません。詳しくはプライバシーポリシーをご確認ください。",
  },
  {
    q: "既存のLINE公式アカウントと併用できますか？",
    a: "はい。LINXは独立したLINE公式アカウントとして動作するため、既存のアカウントに影響はありません。",
  },
  {
    q: "無料プランに期限はありますか？",
    a: "ありません。無料プランは期間の制限なくお使いいただけます。グループ数や応答回数を増やしたくなったら、有料プランへアップグレードできます。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい。管理画面からいつでも解約できます。解約金はありません。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#1A1A2E]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left gap-3 sm:gap-4 touch-manipulation"
      >
        <span className="text-[#FAFAFA] font-semibold text-sm sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`text-[#6B7280] shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48 pb-4 sm:pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[#6B7280] text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-24 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          よくある質問
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 sm:mt-12"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
