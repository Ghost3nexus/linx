"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "restaurant" | "salon" | "clinic" | "ec";

const tabs: { id: Tab; label: string; emoji: string }[] = [
  { id: "restaurant", label: "飲食店", emoji: "🍽️" },
  { id: "salon", label: "美容院", emoji: "💇" },
  { id: "clinic", label: "クリニック", emoji: "🏥" },
  { id: "ec", label: "ネットショップ", emoji: "🛒" },
];

const groupNames: Record<Tab, string> = {
  restaurant: "イタリアン SORA 公式LINE",
  salon: "Hair Salon BLOOM 公式LINE",
  clinic: "さくら歯科 公式LINE",
  ec: "STYLE STORE 公式LINE",
};

const conversations: Record<Tab, { sender: string; text: string }[]> = {
  restaurant: [
    { sender: "user", text: "今日の夜、2名で予約できますか？" },
    { sender: "bot", text: "本日のご予約ありがとうございます！\n\n🕐 本日の空き状況\n・18:00〜 ○（テーブル席）\n・19:30〜 ○（カウンター席）\n・20:00〜 △（残り1席）\n\nご希望のお時間はございますか？" },
    { sender: "user", text: "19:30でお願いします！" },
    { sender: "bot", text: "19:30〜2名様、テーブル席でご予約承りました！✨\n\n当日のキャンセルはお電話ください。\nお待ちしております！" },
  ],
  salon: [
    { sender: "user", text: "来週の水曜日、カットできますか？" },
    { sender: "bot", text: "来週水曜の空き状況です！\n\n💇 3/19（水）\n・10:00〜 ○\n・13:00〜 ○\n・15:00〜 △（残り1枠）\n\nご希望の時間はありますか？" },
    { sender: "user", text: "13時でお願いします！" },
    { sender: "bot", text: "13:00〜のカット、ご予約承りました！\n担当は佐藤が対応いたします。\n\nお待ちしております😊" },
  ],
  clinic: [
    { sender: "user", text: "虫歯の治療って保険使えますか？" },
    { sender: "bot", text: "はい、虫歯の治療は保険適用です！🦷\n\n初診の場合の目安：\n・初診料 + レントゲン：約3,000円\n・治療費（1回）：約1,500〜3,000円\n\n※ 3割負担の場合の目安です。\n\nご予約はお電話またはこちらから承ります。" },
  ],
  ec: [
    { sender: "user", text: "Mサイズのブラックはまだありますか？" },
    { sender: "bot", text: "お問い合わせありがとうございます！\n\n「オーバーサイズTee / Black / M」\n📦 現在 残り3点 です！\n\nご注文はこちらから▼\nstylestore.example.com/item/123\n\n売り切れ前にぜひどうぞ！" },
  ],
};

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white text-[#1a1a1a] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
        <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
        <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot" />
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState<Tab>("salon");
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const msgs = conversations[activeTab];

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    const showNext = (index: number) => {
      if (index >= msgs.length) return;

      if (msgs[index].sender === "bot" && index > 0) {
        setShowTyping(true);
        timerRef.current = setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(index + 1);
          timerRef.current = setTimeout(() => showNext(index + 1), 800);
        }, 1200);
      } else {
        setVisibleCount(index + 1);
        timerRef.current = setTimeout(() => showNext(index + 1), 600);
      }
    };

    timerRef.current = setTimeout(() => showNext(0), 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab]);

  return (
    <section id="demo" className="py-[60px] sm:py-[80px] px-6 section-alt">
      <div className="max-w-[800px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          デモ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          実際の会話を見てみましょう
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-[16px] text-[#999999]"
        >
          業種をタップすると、会話の例が変わります
        </motion.p>

        {/* Tab buttons */}
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-[15px] font-bold transition-all duration-200 touch-manipulation ${
                activeTab === tab.id
                  ? "bg-[#06C755] text-white shadow-md"
                  : "bg-white text-[#666666] border border-[#E0E0E0] hover:border-[#06C755] hover:text-[#06C755]"
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Chat mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-[380px] mx-auto"
        >
          <div className="bg-white border-2 border-[#E8E8E8] rounded-[24px] overflow-hidden shadow-lg">
            {/* LINE header */}
            <div className="bg-[#06C755] px-5 py-3 text-center">
              <span className="text-white text-[14px] font-bold">
                {groupNames[activeTab]}
              </span>
            </div>

            {/* Chat area */}
            <div className="p-4 space-y-3 min-h-[280px] bg-[#7494A5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {msgs.slice(0, visibleCount).map((msg, i) => (
                    <motion.div
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[14px] whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-[#A4DB59] text-[#1a1a1a] rounded-tr-sm"
                            : "bg-white text-[#1a1a1a] rounded-tl-sm"
                        }`}
                        style={{ lineHeight: 1.6 }}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="bg-[#EFF0F2] px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-4 py-2 text-[14px] text-gray-400">
                メッセージを入力...
              </div>
              <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center text-[13px] text-[#AAAAAA]"
        >
          ※ デモ用のサンプル会話です。実際のAI応答は登録した情報をもとに回答します。
        </motion.p>
      </div>
    </section>
  );
}
