"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "kindergarten" | "salon" | "ec" | "consulting";

const tabs: { id: Tab; label: string }[] = [
  { id: "kindergarten", label: "幼稚園" },
  { id: "salon", label: "美容院" },
  { id: "ec", label: "EC" },
  { id: "consulting", label: "コンサル" },
];

const groupNames: Record<Tab, string> = {
  kindergarten: "ひまわり幼稚園 公式LINE",
  salon: "美容院 公式LINE",
  ec: "STORE ファンコミュニティ",
  consulting: "〇〇様 プロジェクト",
};

const conversations: Record<Tab, { sender: string; text: string }[]> = {
  kindergarten: [
    { sender: "user", text: "@LINX 明日の持ち物を教えてください" },
    { sender: "bot", text: "明日3/4（火）の持ち物です\n\n・上履き\n・お弁当（おはし付き）\n・スモック\n\n※雨予報のため、レインコートもお持ちください。" },
    { sender: "user", text: "ありがとうございます！助かります" },
  ],
  salon: [
    { sender: "user", text: "@LINX 来週の水曜日、カットできますか？" },
    { sender: "bot", text: "来週水曜3/11の空き状況です\n\n10:00〜  ○\n13:00〜  ○\n15:00〜  △（残り1枠）\n\nご希望の時間はありますか？" },
    { sender: "user", text: "13時でお願いします！" },
    { sender: "bot", text: "13:00〜のご予約、承りました。\n担当は佐藤が対応いたします。" },
  ],
  ec: [
    { sender: "user", text: "@LINX Mサイズのブラックはまだありますか？" },
    { sender: "bot", text: "「オーバーサイズTee / Black / M」\n\n現在 残り3点 です。\nご注文はこちらから →\nshop.example.com/item/123" },
  ],
  consulting: [
    { sender: "user", text: "@LINX 先月の報告書はどこで見れますか？" },
    { sender: "bot", text: "2月度の月次報告書はこちらです。\n\n月次レポート（2月）\n→ drive.google.com/...\n\nご不明点があれば担当の小塚にお繋ぎします。" },
  ],
};

export default function Demo() {
  const [activeTab, setActiveTab] = useState<Tab>("salon");

  return (
    <section id="demo" className="py-[80px] sm:py-[100px] px-6 border-t border-[#1A1A2E]">
      <div className="max-w-[800px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[22px] sm:text-[28px] md:text-[34px] font-bold text-center"
          style={{ lineHeight: 1.4 }}
        >
          実際の画面を見てみてください。
        </motion.h2>

        <div className="mt-10 flex justify-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 touch-manipulation ${activeTab === tab.id
                  ? "bg-[#06C755]/15 text-[#06C755] border border-[#06C755]/30"
                  : "text-[#6B7280] hover:text-white border border-transparent hover:border-[#1A1A2E]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-[380px] mx-auto"
        >
          <div className="bg-[#0D1117] border border-[#1A1A2E] rounded-[20px] overflow-hidden">
            <div className="bg-[#06C755] px-5 py-3 text-center">
              <span className="text-white text-[13px] font-semibold">
                {groupNames[activeTab]}
              </span>
            </div>

            <div className="p-4 space-y-3 min-h-[280px] bg-[#7494A5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {conversations[activeTab].map((msg, i) => (
                    <motion.div
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.15 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] whitespace-pre-line ${msg.sender === "user"
                            ? "bg-[#A4DB59] text-[#1a1a1a] rounded-tr-sm"
                            : "bg-white text-[#1a1a1a] rounded-tl-sm"
                          }`}
                        style={{ lineHeight: 1.6 }}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
