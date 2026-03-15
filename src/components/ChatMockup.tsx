"use client";

import { motion } from "framer-motion";

const messages = [
  {
    sender: "user",
    text: "明日の予約って空いてますか？",
    delay: 0,
  },
  {
    sender: "bot",
    text: "明日3/17（月）の空き状況です！\n\n🕐 10:00〜 ○\n🕐 14:00〜 ○\n🕐 16:00〜 △（残り1枠）\n\nご希望のお時間はありますか？",
    delay: 0.8,
  },
  {
    sender: "user",
    text: "14時でお願いします！",
    delay: 1.6,
  },
  {
    sender: "bot",
    text: "14:00〜のご予約、承りました！✨\n担当は山田が対応いたします。\nお待ちしております！",
    delay: 2.4,
  },
];

export default function ChatMockup() {
  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] mx-auto">
      {/* Phone frame */}
      <div className="relative bg-white border-2 border-[#E0E0E0] rounded-[2.5rem] overflow-hidden shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-white rounded-b-2xl z-20" />

        {/* LINE header */}
        <div className="bg-[#06C755] px-4 py-3 pt-7 flex items-center gap-3 relative z-10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span className="text-white text-[14px] font-bold flex-1 text-center pr-5">
            Hair Salon 公式LINE
          </span>
        </div>

        {/* Chat area */}
        <div className="bg-[#7494A5] p-3 sm:p-4 space-y-2.5 min-h-[300px] sm:min-h-[320px]">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: msg.delay + 0.8 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-[#A4DB59] text-[#1a1a1a] rounded-tr-sm"
                    : "bg-white text-[#1a1a1a] rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className="bg-[#EFF0F2] px-3 py-2.5 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-4 py-2 text-[13px] text-gray-400">
            メッセージを入力...
          </div>
          <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
        </div>

        {/* Home indicator */}
        <div className="bg-[#EFF0F2] pb-2 flex justify-center">
          <div className="w-28 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
