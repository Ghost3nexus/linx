"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, CalendarDays, Users, TrendingUp } from "lucide-react";

function DashboardMockup() {
  return (
    <div className="relative w-full">
      {/* Browser frame */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E0E0E0] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Browser top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F8F8F8] border-b border-[#E8E8E8]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-white rounded-md border border-[#E0E0E0] px-3 py-1 text-[11px] text-[#AAAAAA] text-center truncate">
              linx-rouge.vercel.app/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex min-h-[260px] sm:min-h-[300px]">
          {/* Sidebar */}
          <div className="hidden sm:flex w-[140px] bg-[#FAFAFA] border-r border-[#F0F0F0] flex-col py-4 px-3 gap-1">
            <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
              <div className="w-5 h-5 rounded bg-[#06C755] flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">L</span>
              </div>
              <span className="text-[11px] font-bold text-[#1A1A1A]">LINX</span>
            </div>
            {[
              { label: "ダッシュボード", active: true },
              { label: "予約管理", active: false },
              { label: "顧客管理", active: false },
              { label: "お店の情報", active: false },
              { label: "会話ログ", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`px-2 py-1.5 rounded-md text-[10px] ${
                  item.active
                    ? "bg-[#06C755]/10 text-[#06C755] font-bold"
                    : "text-[#999999]"
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 sm:p-5">
            <p className="text-[12px] sm:text-[13px] font-bold text-[#1A1A1A] mb-3">ダッシュボード</p>
            {/* Stats cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
              {[
                { icon: MessageSquare, label: "月間応答", value: "1,248", color: "#06C755" },
                { icon: CalendarDays, label: "今月の予約", value: "89", color: "#06C755" },
                { icon: Users, label: "顧客数", value: "342", color: "#06C755" },
                { icon: TrendingUp, label: "自動化率", value: "94%", color: "#06C755" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#F9FAFB] rounded-lg p-2.5 sm:p-3 border border-[#F0F0F0]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <stat.icon size={12} style={{ color: stat.color }} />
                    <span className="text-[9px] sm:text-[10px] text-[#999999]">{stat.label}</span>
                  </div>
                  <span className="text-[16px] sm:text-[20px] font-bold text-[#1A1A1A]">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Recent reservations */}
            <div className="bg-[#F9FAFB] rounded-lg p-3 border border-[#F0F0F0]">
              <p className="text-[10px] font-bold text-[#666666] mb-2">直近の予約</p>
              {[
                { time: "14:00", name: "田中様", service: "体験トレーニング", status: "確定" },
                { time: "15:30", name: "佐藤様", service: "セミパーソナル", status: "確定" },
                { time: "17:00", name: "山田様", service: "マンツーマン", status: "確定" },
              ].map((res) => (
                <div key={res.time} className="flex items-center justify-between py-1.5 border-b border-[#F0F0F0] last:border-b-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#06C755]">{res.time}</span>
                    <span className="text-[10px] text-[#1A1A1A]">{res.name}</span>
                    <span className="text-[9px] text-[#999999]">{res.service}</span>
                  </div>
                  <span className="text-[8px] font-bold text-[#06C755] bg-[#E8F5E9] px-1.5 py-0.5 rounded-full">{res.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating LINE chat card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 w-[200px] sm:w-[240px] bg-white rounded-xl border border-[#E0E0E0] shadow-[0_12px_40px_rgba(0,0,0,0.1)] overflow-hidden"
      >
        <div className="bg-[#06C755] px-3 py-1.5 text-center">
          <span className="text-white text-[10px] font-bold">公式LINE</span>
        </div>
        <div className="p-2.5 space-y-1.5 bg-[#7494A5]">
          <div className="flex justify-end">
            <div className="bg-[#A4DB59] text-[#1A1A1A] text-[9px] px-2.5 py-1.5 rounded-xl rounded-tr-sm max-w-[85%]">
              体験予約できますか？
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white text-[#1A1A1A] text-[9px] px-2.5 py-1.5 rounded-xl rounded-tl-sm max-w-[85%] leading-relaxed">
              はい！🕐 空き枠はこちら<br />14:00〜 ○ 残り3名<br />17:00〜 ○ 残り2名
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-[100px] pb-[80px] px-6 overflow-hidden">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(6,199,85,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 60%, rgba(200,200,200,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-start gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#06C755] text-[14px] font-bold px-5 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#06C755] rounded-full animate-pulse" />
                無料ではじめられます
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] font-bold text-[#1A1A1A]"
              style={{ lineHeight: 1.15, letterSpacing: "-0.03em" }}
            >
              公式LINEに、
              <br />
              <span className="text-gradient-green">AIスタッフ</span>を。
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-[16px] sm:text-[18px] md:text-[20px] text-[#666666] max-w-[540px] mx-auto lg:mx-0"
              style={{ lineHeight: 1.9 }}
            >
              お客様からの質問に、AIが即座に回答。
              <br className="hidden sm:block" />
              予約・在庫・よくある質問を<strong className="text-[#1A1A1A]">24時間自動</strong>で対応します。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="/login"
                className="btn-primary w-full sm:w-auto text-[17px] px-12 py-[20px]"
              >
                無料ではじめる
                <ArrowRight size={18} className="btn-arrow" />
              </a>
              <a
                href="#demo"
                className="btn-secondary w-full sm:w-auto text-[17px] px-10 py-[18px]"
              >
                デモを見る
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-6 flex flex-wrap gap-5 justify-center lg:justify-start text-[14px] text-[#999999]"
            >
              <span>✓ クレジットカード不要</span>
              <span>✓ 5分で導入</span>
              <span>✓ ずっと無料プランあり</span>
            </motion.div>
          </div>

          {/* Right: CSS Product Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex-shrink-0 w-full max-w-[580px] lg:max-w-[560px] relative"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
