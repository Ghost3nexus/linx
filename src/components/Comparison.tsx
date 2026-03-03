"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  {
    label: "グループチャット対応",
    linx: true,
    lineAi: false,
    lstep: false,
    chatplus: false,
  },
  {
    label: "生成AI（自由応答）",
    linx: true,
    lineAi: false,
    lstep: false,
    chatplus: true,
  },
  {
    label: "ナレッジ学習",
    linx: true,
    lineAi: false,
    lstep: false,
    chatplus: true,
  },
  {
    label: "導入時間",
    linx: "5分",
    lineAi: "30分",
    lstep: "数時間",
    chatplus: "数週間",
  },
  {
    label: "月額",
    linx: "0円〜",
    lineAi: "3,000円〜",
    lstep: "0円〜",
    chatplus: "15万円〜",
  },
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
      <Check size={16} className="text-[#06C755] mx-auto" />
    ) : (
      <X size={16} className="text-[#FF3366]/60 mx-auto" />
    );
  }
  return <span className="text-xs sm:text-sm">{value}</span>;
}

/* Mobile: card layout / Desktop: table */
export default function Comparison() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 border-t border-[#1A1A2E]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          他のツールと、何が違うのか。
        </motion.h2>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-12 hidden sm:block"
        >
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full min-w-[540px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-sm text-[#6B7280] font-normal p-3" />
                  {competitors.map((c) => (
                    <th
                      key={c.key}
                      className={`text-center text-sm font-semibold p-3 ${
                        c.highlight
                          ? "text-[#06C755] bg-[#06C755]/5 rounded-t-xl"
                          : "text-[#6B7280]"
                      }`}
                    >
                      {c.highlight ? (
                        <>LIN<span className="text-[#06C755]">X</span></>
                      ) : (
                        c.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={feature.label} className="border-t border-[#1A1A2E]">
                    <td className="text-sm text-[#FAFAFA] p-3 font-medium">
                      {feature.label}
                    </td>
                    {competitors.map((c) => (
                      <td
                        key={c.key}
                        className={`text-center p-3 ${
                          c.highlight ? "bg-[#06C755]/5" : ""
                        } ${
                          i === features.length - 1 && c.highlight
                            ? "rounded-b-xl"
                            : ""
                        }`}
                      >
                        <CellValue
                          value={feature[c.key as keyof typeof feature] as boolean | string}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile card layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:hidden space-y-3"
        >
          {/* LINX card (highlighted) */}
          <div className="bg-[#0D1117] border-2 border-[#06C755] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-[#FAFAFA]">
                LIN<span className="text-[#06C755]">X</span>
              </span>
              <span className="text-[10px] font-semibold bg-[#06C755] text-white px-2 py-0.5 rounded-full">
                おすすめ
              </span>
            </div>
            <div className="space-y-2.5">
              {features.map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">{f.label}</span>
                  <span className="text-sm font-medium text-[#FAFAFA] flex items-center gap-1">
                    {typeof f.linx === "boolean" ? (
                      f.linx ? <Check size={16} className="text-[#06C755]" /> : <X size={16} className="text-[#FF3366]/60" />
                    ) : (
                      <span className="text-[#06C755] font-semibold">{f.linx}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other competitors */}
          {competitors.filter((c) => !c.highlight).map((comp) => (
            <div key={comp.key} className="bg-[#0D1117] border border-[#1A1A2E] rounded-2xl p-4">
              <div className="text-sm font-semibold text-[#6B7280] mb-3">{comp.label}</div>
              <div className="space-y-2">
                {features.map((f) => {
                  const val = f[comp.key as keyof typeof f];
                  return (
                    <div key={f.label} className="flex items-center justify-between">
                      <span className="text-xs text-[#6B7280]">{f.label}</span>
                      <span className="text-xs text-[#6B7280] flex items-center gap-1">
                        {typeof val === "boolean" ? (
                          val ? <Check size={14} className="text-[#06C755]" /> : <X size={14} className="text-[#FF3366]/60" />
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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 sm:mt-8 text-center text-[#FAFAFA] font-semibold text-sm sm:text-base"
        >
          LINXだけが「グループチャット × 生成AI」を実現。
        </motion.p>
      </div>
    </section>
  );
}
