"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AboutCompany() {
  return (
    <section className="py-[50px] sm:py-[70px] px-6 bg-[#F9FAFB] border-t border-[#E8E8E8]">
      <div className="max-w-[680px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-[14px] font-bold tracking-[0.1em] uppercase text-[#06C755] mb-4"
        >
          運営会社
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[22px] sm:text-[26px] font-bold text-[#1A1A1A] tracking-tight">
            株式会社TomorrowProof
          </p>
          <p className="mt-2 text-[14px] text-[#999999]">
            AIエージェント技術専門 — 東京・南青山
          </p>

          <div className="mt-8 inline-block text-left">
            <table className="text-[14px]">
              <tbody>
                {[
                  ["所在地", "東京都港区南青山7-1-27-702"],
                  ["代表", "KOZUKI TAKAHIRO"],
                  ["設立", "2025年8月"],
                  ["資格", "生成AIパスポート保有（JDLA認定）"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-2 pr-6 text-[#999999] whitespace-nowrap">{label}</td>
                    <td className="py-2 text-[#1A1A1A] font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <a
              href="https://tomorrowproof-ai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#06C755] hover:underline"
            >
              会社HPを見る
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
