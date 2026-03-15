"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

const features = [
  { label: "月額料金", linx: "0円〜", lineAi: "3,000円〜", pecochat: "9,800円〜" },
  { label: "AIの賢さ（生成AI）", linx: true, lineAi: false, pecochat: true },
  { label: "グループチャット対応", linx: true, lineAi: false, pecochat: false },
  { label: "ナレッジ学習", linx: true, lineAi: false, pecochat: true },
  { label: "Web検索回答", linx: true, lineAi: false, pecochat: false },
  { label: "担当者への通知", linx: true, lineAi: false, pecochat: true },
  { label: "導入にかかる時間", linx: "5分", lineAi: "30分〜", pecochat: "数分" },
  { label: "無料プラン", linx: "あり", lineAi: "なし", pecochat: "14日間のみ" },
];

const competitors = [
  { key: "linx", label: "LINX", highlight: true },
  { key: "lineAi", label: "LINE公式 AIチャットボット", highlight: false },
  { key: "pecochat", label: "PecoChat", highlight: false },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E8F5E9]">
        <Check size={16} className="text-[#06C755]" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FFF0F0]">
        <X size={16} className="text-[#E53935]" />
      </span>
    );
  }
  return <span className="text-[15px] font-medium">{value}</span>;
}

export default function Comparison() {
  return (
    <section className="py-[60px] sm:py-[80px] px-6">
      <div className="max-w-[900px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          他サービスとの比較
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          LINXが選ばれる理由
        </motion.h2>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 hidden sm:block"
        >
          <div className="overflow-x-auto bg-white rounded-2xl border border-[#E8E8E8] shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#F0F0F0]">
                  <th className="text-left text-[14px] text-[#999999] font-medium p-5 w-[200px]" />
                  {competitors.map((c) => (
                    <th
                      key={c.key}
                      className={`text-center text-[15px] font-bold p-5 ${
                        c.highlight
                          ? "text-[#06C755] bg-[#F5FBF7]"
                          : "text-[#666666]"
                      }`}
                    >
                      {c.highlight && (
                        <span className="block text-[11px] bg-[#06C755] text-white px-3 py-1 rounded-full mb-2 mx-auto w-fit">
                          おすすめ
                        </span>
                      )}
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature.label} className="border-b border-[#F5F5F5] last:border-b-0">
                    <td className="text-[15px] text-[#333333] p-5 font-medium">{feature.label}</td>
                    {competitors.map((c) => (
                      <td
                        key={c.key}
                        className={`text-center p-5 ${c.highlight ? "bg-[#F5FBF7]" : ""}`}
                      >
                        <CellValue value={feature[c.key as keyof typeof feature] as boolean | string} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile: LINX card only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:hidden"
        >
          <div className="bg-white border-2 border-[#06C755] rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[20px] font-bold text-[#1A1A1A]">
                LIN<span className="text-[#06C755]">X</span>
              </span>
              <span className="text-[12px] font-bold bg-[#06C755] text-white px-3 py-1 rounded-full">
                おすすめ
              </span>
            </div>
            <div className="space-y-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-[15px] text-[#666666]">{f.label}</span>
                  <span className="text-[15px] font-bold text-[#1A1A1A]">
                    {typeof f.linx === "boolean" ? (
                      f.linx ? <Check size={18} className="text-[#06C755]" /> : <X size={18} className="text-[#E53935]" />
                    ) : (
                      <span className="text-[#06C755]">{f.linx}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold px-8 py-4 rounded-full text-[16px] transition-all active:scale-95 cta-glow"
          >
            無料ではじめる
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
