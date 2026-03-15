"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "本当に無料で使えますか？",
    a: "はい、無料プランは期限なしでずっとお使いいただけます。月50回までのAI回答と、お店情報の登録1件が含まれます。クレジットカードの登録も不要です。",
  },
  {
    q: "パソコンが苦手でも使えますか？",
    a: "はい、むずかしい操作は一切ありません。画面の案内に沿って進めるだけで、5分ほどで設定が完了します。わからないことがあれば、サポートチームがお手伝いします。",
  },
  {
    q: "AIが間違った答えをしたらどうなりますか？",
    a: "LINXは、あなたが登録した情報をもとに回答します。登録していない内容については「担当者に確認します」と回答し、あなたにLINEで通知を送ります。勝手にでたらめな回答をすることはありません。",
  },
  {
    q: "今使っているLINE公式アカウントで使えますか？",
    a: "はい、お使いのLINE公式アカウントにそのまま追加できます。今までの友だちリストやトーク履歴はそのまま残りますのでご安心ください。",
  },
  {
    q: "お客様の情報は安全ですか？",
    a: "はい、すべての通信はSSL暗号化で保護されています。お客様の会話データを第三者に提供することは一切ありません。詳しくはプライバシーポリシーをご確認ください。",
  },
  {
    q: "途中でプランを変えたり、解約はできますか？",
    a: "はい、いつでもプラン変更・解約ができます。解約金はゼロ。管理画面からワンクリックで手続きできます。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#F0F0F0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 min-h-[44px] text-left gap-4 touch-manipulation"
      >
        <span className="text-[#1A1A1A] font-bold text-[16px] sm:text-[17px]" style={{ lineHeight: 1.5 }}>
          {q}
        </span>
        <ChevronDown
          size={22}
          className={`text-[#AAAAAA] shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#06C755]" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[300px] pb-6" : "max-h-0"}`}>
        <p className="text-[#666666] text-[15px] sm:text-[16px]" style={{ lineHeight: 1.8 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-[60px] sm:py-[80px] px-6">
      <div className="max-w-[760px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          よくある質問
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          気になることはありますか？
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 bg-white rounded-2xl border border-[#E8E8E8] px-6 sm:px-8 shadow-sm"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
