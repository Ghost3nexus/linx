"use client";

import { motion } from "framer-motion";

const messages = [
  {
    sender: "user",
    name: "田中さん",
    text: "@LINX 明日の予約空いてますか？",
    delay: 0,
  },
  {
    sender: "bot",
    name: "LINX",
    text: "明日3/4（火）の空き状況です。\n10:00〜 ○\n14:00〜 ○\n16:00〜 ○\nご希望の時間はありますか？",
    delay: 0.8,
  },
  {
    sender: "user",
    name: "田中さん",
    text: "14時でお願いします",
    delay: 1.6,
  },
  {
    sender: "bot",
    name: "LINX",
    text: "14:00〜のご予約、承りました。担当は山田が対応いたします。お待ちしております。",
    delay: 2.4,
  },
];

export default function ChatMockup() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
        {/* LINE header */}
        <div className="bg-[#06C755] px-4 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <span className="text-white text-sm font-semibold flex-1 text-center">
            美容院 お客様グループ
          </span>
          <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>

        {/* Chat area */}
        <div className="bg-[#7494A5] p-4 space-y-3 min-h-[360px]">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: msg.delay + 0.8 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[80%]">
                <span
                  className={`text-[10px] mb-0.5 block ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  } text-white/70`}
                >
                  {msg.name}
                </span>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-[#A4DB59] text-black rounded-tr-sm"
                      : "bg-white text-black rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className="bg-[#EFF0F2] px-4 py-3 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-gray-400">
            @LINX で質問...
          </div>
          <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
