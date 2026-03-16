"use client";

import { motion } from "framer-motion";

function DashboardMockup() {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#E8E8E8] shadow-xl overflow-hidden w-full">
      {/* Title bar */}
      <div className="bg-[#FAFAFA] border-b border-[#E8E8E8] px-4 py-2.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] text-[#999999]">LINX ダッシュボード</span>
        </div>
      </div>

      <div className="flex min-h-[260px]">
        {/* Sidebar */}
        <div className="w-[52px] sm:w-[60px] bg-[#F8F8F8] border-r border-[#E8E8E8] py-3 flex flex-col items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#06C755] flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">L</span>
          </div>
          <div className="w-6 h-1 bg-[#E0E0E0] rounded-full" />
          {["📊", "📅", "👥", "💬", "⚙️"].map((icon, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-[14px] ${
                i === 0 ? "bg-[#E8F5E9]" : "hover:bg-[#F0F0F0]"
              }`}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-4 space-y-3">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "今日の予約", value: "8", color: "#06C755" },
              { label: "未対応", value: "0", color: "#06C755" },
              { label: "友だち数", value: "234", color: "#06C755" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#F8F8F8] rounded-xl p-2.5 text-center">
                <p className="text-[20px] sm:text-[24px] font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[10px] text-[#999999] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Reservation list */}
          <div className="bg-[#F8F8F8] rounded-xl p-3">
            <p className="text-[11px] font-bold text-[#666666] mb-2">今日の予約一覧</p>
            {[
              { time: "10:00", name: "田中さま", menu: "カット" },
              { time: "11:30", name: "鈴木さま", menu: "カット+カラー" },
              { time: "14:00", name: "佐藤さま", menu: "パーマ" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-1.5 border-b border-[#E8E8E8] last:border-0"
              >
                <span className="text-[11px] font-bold text-[#06C755] w-[40px]">{r.time}</span>
                <span className="text-[12px] text-[#1A1A1A] font-medium">{r.name}</span>
                <span className="text-[10px] text-[#999999] ml-auto">{r.menu}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LineChatMockup() {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#E8E8E8] shadow-xl overflow-hidden w-full">
      {/* LINE header */}
      <div className="bg-[#06C755] px-4 py-2.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-[12px] font-bold">AI</span>
        </div>
        <div>
          <p className="text-white text-[13px] font-bold">Hair Salon BLOOM</p>
          <p className="text-white/70 text-[10px]">AIスタッフが対応中</p>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-[#7494A5] p-3 space-y-2 min-h-[220px]">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-[#A4DB59] text-[#1a1a1a] rounded-2xl rounded-tr-sm px-3 py-2 text-[12px] max-w-[75%]" style={{ lineHeight: 1.5 }}>
            明日の午後、カットできますか？
          </div>
        </div>
        {/* Bot message */}
        <div className="flex justify-start">
          <div className="bg-white text-[#1a1a1a] rounded-2xl rounded-tl-sm px-3 py-2 text-[12px] max-w-[80%]" style={{ lineHeight: 1.6 }}>
            明日の午後の空き状況です！
            <br /><br />
            💇 3/17（月）
            <br />
            ・13:00〜 ○
            <br />
            ・15:00〜 ○
            <br /><br />
            ご希望の時間はありますか？
          </div>
        </div>
        {/* User reply */}
        <div className="flex justify-end">
          <div className="bg-[#A4DB59] text-[#1a1a1a] rounded-2xl rounded-tr-sm px-3 py-2 text-[12px] max-w-[75%]" style={{ lineHeight: 1.5 }}>
            13時でお願いします！
          </div>
        </div>
        {/* Bot confirm */}
        <div className="flex justify-start">
          <div className="bg-white text-[#1a1a1a] rounded-2xl rounded-tl-sm px-3 py-2 text-[12px] max-w-[80%]" style={{ lineHeight: 1.6 }}>
            13:00〜 カット、ご予約完了です！✨
            <br />
            お待ちしております。
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-[#EFF0F2] px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-gray-400">
          メッセージを入力...
        </div>
        <div className="w-7 h-7 rounded-full bg-[#06C755] flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <section className="py-[60px] sm:py-[80px] px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="section-label text-center mb-3"
        >
          プロダクト
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-[24px] sm:text-[32px] md:text-[40px] font-bold text-center text-[#1A1A1A]"
          style={{ lineHeight: 1.4 }}
        >
          管理画面もLINE対応も、これひとつ。
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-center text-[16px] sm:text-[18px] text-[#666666] max-w-[600px] mx-auto"
          style={{ lineHeight: 1.8 }}
        >
          ダッシュボードで予約・顧客・会話ログを一元管理
        </motion.p>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <DashboardMockup />
            <p className="mt-3 text-center text-[13px] text-[#999999]">
              📊 ダッシュボード &#8212; 予約・顧客を一目で確認
            </p>
          </motion.div>

          {/* LINE chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-[360px] mx-auto lg:mx-0 lg:mt-8"
          >
            <LineChatMockup />
            <p className="mt-3 text-center text-[13px] text-[#999999]">
              💬 LINE &#8212; AIスタッフがお客様に即対応
            </p>
          </motion.div>
        </div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {[
            "予約の自動確定",
            "顧客カルテ管理",
            "会話ログ閲覧",
            "AIナレッジ登録",
            "通知設定",
            "売上レポート",
          ].map((feature) => (
            <span
              key={feature}
              className="bg-[#F5FBF7] border border-[#D4EDD8] text-[#1A1A1A] text-[13px] sm:text-[14px] font-medium px-4 py-2 rounded-full"
            >
              {feature}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
