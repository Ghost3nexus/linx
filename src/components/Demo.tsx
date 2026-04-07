"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "gym" | "yoga" | "pilates" | "clinic" | "sauna";

const tabs: { id: Tab; label: string }[] = [
  { id: "gym", label: "ジム" },
  { id: "yoga", label: "ヨガ" },
  { id: "pilates", label: "ピラティス" },
  { id: "clinic", label: "クリニック" },
  { id: "sauna", label: "サウナ" },
];

const groupNames: Record<Tab, string> = {
  gym: "パーソナルジム 公式LINE",
  yoga: "ヨガスタジオ 公式LINE",
  pilates: "ピラティススタジオ 公式LINE",
  clinic: "整体院 公式LINE",
  sauna: "サウナ施設 公式LINE",
};

const conversations: Record<Tab, { sender: string; text: string }[]> = {
  gym: [
    { sender: "user", text: "体験トレーニングを受けたいです" },
    { sender: "bot", text: "ありがとうございます！\n無料体験レッスンのご案内です。\n\n・料金: 無料\n・時間: 約60分\n・持ち物: 運動着・室内シューズ・タオル\n\n直近の空き枠はこちらです：\n1. 4/10（木）14:00〜\n2. 4/10（木）18:00〜\n3. 4/11（金）10:00〜\n\nご希望の番号とお名前を教えてください。" },
    { sender: "user", text: "2番でお願いします。田中太郎です" },
    { sender: "bot", text: "ご予約を承りました！\n\n4/10（木）18:00〜19:00\n無料体験レッスン\n田中太郎様\n\n前日にリマインドをお送りします。\nお会いできることを楽しみにしております！" },
  ],
  yoga: [
    { sender: "user", text: "明日の朝ヨガに参加できますか？" },
    { sender: "bot", text: "明日の朝ヨガクラスの空き状況です。\n\n1. 7:00〜 モーニングフロー（残3名）\n2. 9:00〜 ハタヨガ（残5名）\n3. 10:30〜 リストラティブ（残2名）\n\nご希望の番号とお名前をお願いします。" },
    { sender: "user", text: "1番、鈴木花子です" },
    { sender: "bot", text: "ご予約完了です！\n\n明日 7:00〜 モーニングフロー\n鈴木花子様\n\nヨガマットは無料レンタルございます。\nお待ちしております！" },
  ],
  pilates: [
    { sender: "user", text: "リフォーマーの体験したいです" },
    { sender: "bot", text: "リフォーマーピラティス体験のご案内です。\n\n・料金: 3,300円（税込）\n・時間: 50分\n・定員: 4名\n\n空き枠：\n1. 4/9（水）11:00〜\n2. 4/9（水）15:00〜\n3. 4/10（木）13:00〜\n\nご希望の番号とお名前をお願いします。" },
    { sender: "user", text: "3でお願いします。山田美咲" },
    { sender: "bot", text: "ご予約完了です！\n\n4/10（木）13:00〜13:50\nリフォーマー体験\n山田美咲様\n\nグリップソックスをお持ちください。\n当日お待ちしております！" },
  ],
  clinic: [
    { sender: "user", text: "腰痛がひどいのですが予約できますか" },
    { sender: "bot", text: "お辛い状況ですね。\n初回カウンセリングのご案内です。\n\n・料金: 初回 3,980円\n・時間: 約60分（検査+施術）\n\n空き枠：\n1. 4/9（水）14:00〜\n2. 4/10（木）10:00〜\n3. 4/10（木）16:00〜\n\nご希望の番号とお名前をお願いします。" },
    { sender: "user", text: "2番で。佐藤健一です" },
    { sender: "bot", text: "ご予約完了です！\n\n4/10（木）10:00〜\n初回カウンセリング\n佐藤健一様\n\n事前アンケートをお送りしますので\nご来院前にご記入ください。" },
  ],
  sauna: [
    { sender: "user", text: "今日の混雑状況を教えてください" },
    { sender: "bot", text: "現在の状況です。\n\n・サウナ室: 空き（現在3名/定員10名）\n・水風呂: 空き\n・外気浴: 空き\n\n本日の予約状況：\n・14:00〜 空きあり\n・16:00〜 空きあり\n・18:00〜 混雑予想\n\nご予約されますか？" },
    { sender: "user", text: "14時で1名お願いします。中村です" },
    { sender: "bot", text: "ご予約完了です！\n\n本日 14:00〜（2時間）\n中村様 1名\n\nタオルセットは受付でお渡しします。\nごゆっくりお過ごしください！" },
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
  const [activeTab, setActiveTab] = useState<Tab>("gym");
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
    <section id="demo" className="py-[80px] sm:py-[120px] md:py-[160px] px-6 section-alt">
      <div className="max-w-[800px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-4"
        >
          デモ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[28px] sm:text-[36px] md:text-[48px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.3 }}
        >
          実際の会話を見てみましょう
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[16px] sm:text-[18px] text-[#666666] max-w-[640px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          業種をタップすると、会話の例が変わります
        </motion.p>

        {/* Tab buttons - bigger */}
        <div className="mt-10 grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[48px] px-6 py-3 rounded-full text-[15px] sm:text-[16px] font-bold transition-all duration-300 touch-manipulation ${
                activeTab === tab.id
                  ? "bg-[#06C755] text-white shadow-md"
                  : "bg-white text-[#666666] border border-[#E0E0E0] hover:border-[#06C755] hover:text-[#06C755]"
              }`}
              style={{ transition: "all 0.3s cubic-bezier(.25,1,.5,1)" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chat mockup - more immersive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-[360px] sm:max-w-[400px] mx-auto"
        >
          <div
            className="bg-white border-2 border-[#E8E8E8] rounded-[24px] overflow-hidden"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)",
              transform: "perspective(1200px) rotateY(-1deg)",
            }}
          >
            {/* LINE header */}
            <div className="bg-[#06C755] px-5 py-3.5 text-center">
              <span className="text-white text-[14px] font-bold">
                {groupNames[activeTab]}
              </span>
            </div>

            {/* Chat area */}
            <div className="p-4 space-y-3 min-h-[300px] bg-[#7494A5]">
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
          className="mt-8 text-center text-[13px] text-[#AAAAAA]"
        >
          ※ デモ用のサンプル会話です。実際のAI応答は登録した情報をもとに回答します。
        </motion.p>
      </div>
    </section>
  );
}
