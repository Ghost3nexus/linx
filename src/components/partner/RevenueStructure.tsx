"use client";

import { motion } from "framer-motion";
import { Repeat, Zap, Wrench } from "lucide-react";

/**
 * 金額と掛け率はここに書かない。
 * B2Bは相手ごとに条件を組むため、率を公開すると規模に応じた組み方ができなくなる。
 * ここで示すのは「何が収益になるか」の構造だけ。実額は資料と打ち合わせで渡す。
 */
const sources = [
  {
    icon: Repeat,
    tag: "毎月",
    title: "月額の卸差益",
    body:
      "卸値で仕入れて、御社が決めた価格で販売します。差額がそのまま毎月積み上がります。初期費用も最低販売数もありません。",
  },
  {
    icon: Zap,
    tag: "使った分だけ",
    title: "AI応答の上乗せ",
    body:
      "AIの応答は実費で仕入れていただきます。エンドユーザーへ従量のまま請求しても、月額に含めたパッケージに変換しても構いません。仕入れは従量、販売は定額という変換自体が、御社の利益になります。",
  },
  {
    icon: Wrench,
    tag: "都度",
    title: "導入支援と運用代行",
    body:
      "初期設定、ナレッジの整備、LINEの配信設計。店舗が自分でやりたがらない部分は、そのまま御社の工数として請求できます。ここは当社が関与しません。",
  },
];

export default function RevenueStructure() {
  return (
    <section id="revenue" className="bg-[#0B0C0E] px-6 py-[60px] sm:py-[100px]">
      <div className="mx-auto max-w-[1050px]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-[13px] font-bold uppercase tracking-[0.12em] text-[#06C755]"
        >
          Revenue
        </motion.p>
        <h2 className="mt-4 text-center text-[26px] font-bold leading-[1.35] text-white sm:text-[38px]">
          御社の収益は、3つから立ちます。
        </h2>
        <p className="mt-5 text-center text-[14px] leading-[1.9] text-[#9CA3AF] sm:text-[15px]">
          月額だけの商売ではありません。
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {sources.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ y: 18 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#141619] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06C755]/12">
                  <s.icon size={21} className="text-[#06C755]" />
                </span>
                <span className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-bold tracking-wide text-white/55">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-5 text-[18px] font-bold leading-snug text-white">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.85] text-[#9CA3AF]">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-[760px] rounded-2xl border border-[#06C755]/25 bg-[#06C755]/[0.06] p-6 sm:p-7">
          <h3 className="text-[17px] font-bold text-white sm:text-[18px]">
            条件は、御社に合わせて組みます。
          </h3>
          <p className="mt-3 text-[14px] leading-[1.9] text-[#B6BCC6]">
            商圏、想定される店舗数、サポートを担える体制。ここが違えば適正な条件も変わるため、
            同じ数字を全員に出すことはしていません。
            卸値と掛け率、契約の条件は、打ち合わせでそのままお伝えします。
          </p>
        </div>
      </div>
    </section>
  );
}
