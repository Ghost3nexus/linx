"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  {
    label: "グループチャット対応",
    linx: true,
    lineAi: false,
    lstep: false,
    pecochat: false,
    chatplus: false,
  },
  {
    label: "生成AI（自由応答）",
    linx: true,
    lineAi: false,
    lstep: false,
    pecochat: true,
    chatplus: true,
  },
  {
    label: "ナレッジ学習",
    linx: true,
    lineAi: false,
    lstep: false,
    pecochat: true,
    chatplus: true,
  },
  {
    label: "導入時間",
    linx: "5分",
    lineAi: "30分",
    lstep: "数時間",
    pecochat: "10分",
    chatplus: "数週間",
  },
  {
    label: "月額",
    linx: "0円〜",
    lineAi: "3,000円〜",
    lstep: "0円〜",
    pecochat: "9,800円〜",
    chatplus: "150,000円〜",
  },
];

const competitors = [
  { key: "linx", label: "LINX", highlight: true },
  { key: "lineAi", label: "LINE公式AI", highlight: false },
  { key: "lstep", label: "Lステップ", highlight: false },
  { key: "pecochat", label: "PecoChat", highlight: false },
  { key: "chatplus", label: "ChatPlus AI", highlight: false },
];

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check size={18} className="text-primary mx-auto" />
    ) : (
      <X size={18} className="text-error/60 mx-auto" />
    );
  }
  return <span className="text-xs">{value}</span>;
}

export default function Comparison() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          他のツールと、何が違うのか。
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-sm text-sub font-normal p-3" />
                {competitors.map((c) => (
                  <th
                    key={c.key}
                    className={`text-center text-sm font-semibold p-3 ${
                      c.highlight
                        ? "text-primary bg-primary/5 rounded-t-xl"
                        : "text-sub"
                    }`}
                  >
                    {c.highlight ? (
                      <>
                        LIN<span className="text-primary">X</span>
                      </>
                    ) : (
                      c.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={feature.label} className="border-t border-border">
                  <td className="text-sm text-text p-3 font-medium">
                    {feature.label}
                  </td>
                  {competitors.map((c) => (
                    <td
                      key={c.key}
                      className={`text-center p-3 ${
                        c.highlight ? "bg-primary/5" : ""
                      } ${
                        i === features.length - 1 && c.highlight
                          ? "rounded-b-xl"
                          : ""
                      }`}
                    >
                      <CellValue
                        value={
                          feature[c.key as keyof typeof feature] as
                            | boolean
                            | string
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-text font-semibold text-base"
        >
          LINXだけが「グループチャット × 生成AI」を実現。
        </motion.p>
      </div>
    </section>
  );
}
