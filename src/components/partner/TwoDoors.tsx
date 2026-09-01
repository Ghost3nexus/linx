"use client";

import { motion } from "framer-motion";
import { Store, Building2 } from "lucide-react";

const doors = [
  {
    icon: Store,
    tag: "販売代理店の方へ",
    title: "売る商材が、ひとつ増えます。",
    body:
      "すでに店舗のお客様を抱えている会社に向いています。LINE構築、広告運用、業種特化のコンサルティング。既存の取引先へそのままご案内でき、開発も在庫も要りません。",
    points: [
      "仕入れは卸値のみ。初期費用も最低販売数もありません",
      "販売価格と契約期間は、御社が決めます",
      "AI応答は実費で仕入れ、上乗せ幅も御社が決めます",
    ],
    href: "#simulator",
    cta: "取り分を試算する",
    type: "reseller" as const,
  },
  {
    icon: Building2,
    tag: "自社のシステムとして持ちたい方へ",
    title: "作らずに、自社のOSを持てます。",
    body:
      "複数店舗を運営する企業、FC本部、チェーン本部、業界団体に向いています。多店舗の予約管理と会員管理を本部から一元管理できる基盤を、自社の名前で持てます。開発期間も開発チームも要りません。",
    points: [
      "エンドユーザーの画面に、当社の名前は出ません",
      "店舗数無制限の固定枠プランをご用意しています",
      "既存の予約システムを残したまま、追加で導入できます",
    ],
    href: "#simulator",
    cta: "固定枠で試算する",
    type: "inhouse" as const,
  },
];

export default function TwoDoors() {
  return (
    <section className="py-[60px] sm:py-[90px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[36px] font-bold text-center text-[#1A1A1A] leading-[1.35]"
        >
          どちらの立場で、お考えですか。
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {doors.map((d, i) => (
            <motion.div
              key={d.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="border border-[#E8E8E8] rounded-2xl p-7 sm:p-9 hover:border-[#06C755] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                <d.icon size={24} className="text-[#06C755]" />
              </div>
              <p className="mt-5 text-[13px] font-bold text-[#06C755] tracking-wide">{d.tag}</p>
              <h3 className="mt-2 text-[21px] sm:text-[24px] font-bold text-[#1A1A1A] leading-snug">
                {d.title}
              </h3>
              <p className="mt-4 text-[15px] text-[#555555] leading-[1.85]">{d.body}</p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {d.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[14px] text-[#333333] leading-relaxed">
                    <span className="text-[#06C755] font-bold shrink-0">—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a
                href={d.href}
                className="mt-7 inline-flex items-center justify-center bg-[#1A1A1A] hover:bg-[#333333] text-white font-bold px-6 py-3 rounded-full text-[15px] transition-colors"
              >
                {d.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
