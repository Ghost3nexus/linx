"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  { label: "グループチャット対応", linx: true, lineAi: false, lstep: false, chatplus: false },
  { label: "生成AI（自由応答）", linx: true, lineAi: false, lstep: false, chatplus: true },
  { label: "ナレッジ学習", linx: true, lineAi: false, lstep: false, chatplus: true },
  { label: "Web検索AI（RAG）", linx: true, lineAi: false, lstep: false, chatplus: false },
  { label: "導入時間", linx: "5分", lineAi: "30分", lstep: "数時間", chatplus: "数週間" },
  { label: "月額", linx: "0円〜", lineAi: "3,000円〜", lstep: "0円〜", chatplus: "15万円〜" },
];

const competitors = [
  { key: "linx", label: "LINX", highlight: true },
  { key: "lineAi", label: "LINE公式AI", highlight: false },
  { key: "lstep", label: "Lステップ", highlight: false },
  { key: "chatplus", label: "ChatPlus", highlight: false },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="text-[#06C755] mx-auto" />
    ) : (
      <X size={18} className="text-[#FF3366]/50 mx-auto" />
    );
  }
  return <span className="text-[14px]">{value}</span>;
}

export default function Comparison() {
  return (
    <section className="py-[80px] sm:py-[100px] px-6 border-t border-[#1A1A2E]">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          Comparison
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[26px] sm:text-[34px] md:text-[44px] font-bold text-center"
          style={{ lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          他のツールと、何が違うのか。
        </motion.h2>

        {/* Desktop: table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 hidden sm:block"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[14px] text-[#6B7280] font-normal p-4" />
                  {competitors.map((c) => (
                    <th
                      key={c.key}
                      className={`text-center text-[14px] font-semibold p-4 ${c.highlight ? "text-[#06C755] bg-[#06C755]/5 rounded-t-xl" : "text-[#6B7280]"
                        }`}
                    >
                      {c.highlight ? <>LIN<span className="text-[#06C755]">X</span></> : c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={feature.label} className="border-t border-[#1A1A2E]">
                    <td className="text-[15px] text-[#E5E7EB] p-4 font-medium">{feature.label}</td>
                    {competitors.map((c) => (
                      <td
                        key={c.key}
                        className={`text-center p-4 ${c.highlight ? "bg-[#06C755]/5" : ""} ${i === features.length - 1 && c.highlight ? "rounded-b-xl" : ""
                          }`}
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

        {/* Mobile: cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:hidden space-y-4"
        >
          {/* LINX highlighted */}
          <div className="bg-[#0A0A0F] border-2 border-[#06C755] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[18px] font-bold text-white">
                LIN<span className="text-[#06C755]">X</span>
              </span>
              <span className="text-[12px] font-semibold bg-[#06C755] text-white px-3 py-1 rounded-full">
                おすすめ
              </span>
            </div>
            <div className="space-y-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-[15px] text-[#9CA3AF]">{f.label}</span>
                  <span className="text-[15px] font-medium text-white flex items-center gap-1">
                    {typeof f.linx === "boolean" ? (
                      f.linx ? <Check size={18} className="text-[#06C755]" /> : <X size={18} className="text-[#FF3366]/50" />
                    ) : (
                      <span className="text-[#06C755] font-semibold">{f.linx}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {competitors.filter((c) => !c.highlight).map((comp) => (
            <div key={comp.key} className="bg-[#0A0A0F] border border-[#1A1A2E] rounded-2xl p-6">
              <div className="text-[16px] font-semibold text-[#6B7280] mb-4">{comp.label}</div>
              <div className="space-y-3">
                {features.map((f) => {
                  const val = f[comp.key as keyof typeof f];
                  return (
                    <div key={f.label} className="flex items-center justify-between">
                      <span className="text-[14px] text-[#6B7280]">{f.label}</span>
                      <span className="text-[14px] text-[#6B7280]">
                        {typeof val === "boolean" ? (
                          val ? <Check size={16} className="text-[#06C755]" /> : <X size={16} className="text-[#FF3366]/50" />
                        ) : (
                          val
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-white font-semibold text-[15px] sm:text-[16px]"
        >
          LINXだけが「公式LINE × 生成AI × 中小企業価格」を実現。
        </motion.p>
      </div>
    </section>
  );
}
