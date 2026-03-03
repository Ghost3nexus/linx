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

const conversations: Record<Tab, { sender: string; text: string }[]> = {
  kindergarten: [
    { sender: "user", text: "@LINX 明日の持ち物を教えてください" },
    {
      sender: "bot",
      text: "明日3/4（火）の持ち物です\n\n・上履き\n・お弁当（おはし付き）\n・スモック\n\n※雨予報のため、レインコートもお持ちください。",
    },
    { sender: "user", text: "ありがとうございます！助かります" },
  ],
  salon: [
    { sender: "user", text: "@LINX 来週の水曜日、カットできますか？" },
    {
      sender: "bot",
      text: "来週水曜3/11の空き状況です\n\n10:00〜  ○\n13:00〜  ○\n15:00〜  △（残り1枠）\n\nご希望の時間はありますか？",
    },
    { sender: "user", text: "13時でお願いします！" },
    {
      sender: "bot",
      text: "13:00〜のご予約、承りました。担当は佐藤が対応いたします。お待ちしております。",
    },
  ],
  ec: [
    {
      sender: "user",
      text: "@LINX Mサイズのブラックはまだありますか？",
    },
    {
      sender: "bot",
      text: "「オーバーサイズTee / Black / M」の在庫状況です\n\n現在 残り3点 です。\nご注文はこちらから → shop.example.com/item/123",
    },
  ],
  consulting: [
    {
      sender: "user",
      text: "@LINX 先月の報告書はどこで見れますか？",
    },
    {
      sender: "bot",
      text: "2月度の月次報告書はこちらです。\n\n📄 月次レポート（2月）\n→ drive.google.com/...\n\nご不明点があれば担当の小塚にお繋ぎします。",
    },
  ],
};

export default function Demo() {
  const [activeTab, setActiveTab] = useState<Tab>("salon");

  return (
    <section id="demo" className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          実際の画面を見てみてください。
        </motion.h2>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-sub hover:text-text border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chat demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl overflow-hidden relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/3 pointer-events-none" />

            {/* LINE header */}
            <div className="bg-[#06C755] px-4 py-2.5 text-center relative z-10">
              <span className="text-white text-xs font-semibold">
                {activeTab === "kindergarten" && "ひまわり幼稚園 保護者グループ"}
                {activeTab === "salon" && "美容院 お客様グループ"}
                {activeTab === "ec" && "STORE ファンコミュニティ"}
                {activeTab === "consulting" && "〇〇様 プロジェクト"}
              </span>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[280px] bg-[#7494A5] relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {conversations[activeTab].map((msg, i) => (
                    <motion.div
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.2 }}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-[#A4DB59] text-black rounded-tr-sm"
                            : "bg-white text-black rounded-tl-sm"
                        }`}
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
