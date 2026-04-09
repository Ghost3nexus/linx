"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, X, MessageSquare, Calendar } from "lucide-react";

export default function PhonePopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShow(true);
    }, 20000);

    const handleScroll = () => {
      if (dismissed) return;
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4) setShow(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed]);

  function handleDismiss() {
    setShow(false);
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px]"
        >
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E8E8E8] overflow-hidden">
            {/* Header */}
            <div className="bg-[#06C755] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Video size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-[15px]">無料オンライン相談</p>
                  <p className="text-white/80 text-[12px]">Google Meetで30分無料デモ</p>
                </div>
              </div>
              <button onClick={handleDismiss} className="text-white/60 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <p className="text-[#1A1A1A] text-[14px] leading-relaxed">
                導入のご相談、実際の管理画面デモ、お見積もりなど、専門スタッフが丁寧にご案内します。
              </p>

              {/* Google Meet CTA */}
              <a
                href="https://calendar.app.google/2aFsQTibv5HJKivE9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05B04A] text-white font-bold py-3.5 rounded-xl text-[15px] transition-all duration-300 hover:shadow-lg"
              >
                <Calendar size={18} />
                無料デモを予約する
              </a>
              <p className="text-center text-[11px] text-[#999] mt-2">所要時間 約30分 / 平日 10:00〜18:00</p>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#E8E8E8]" />
                <span className="text-[11px] text-[#999]">または</span>
                <div className="flex-1 h-px bg-[#E8E8E8]" />
              </div>

              {/* Document CTA */}
              <a
                href="/documents"
                className="flex items-center justify-center gap-2 border-2 border-[#E8E8E8] hover:border-[#06C755] text-[#1A1A1A] hover:text-[#06C755] font-bold py-3 rounded-xl text-[14px] transition-all duration-300"
              >
                <MessageSquare size={16} />
                資料請求・お問い合わせ
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
