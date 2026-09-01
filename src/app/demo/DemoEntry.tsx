"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { enterDemoMode } from "@/lib/apiClient";
import { DEMO_STORE_NAME } from "@/lib/demoData";

export default function DemoEntry() {
  const router = useRouter();
  useEffect(() => {
    enterDemoMode();
    const t = setTimeout(() => router.replace("/dashboard"), 900);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-[#0B0C0E] px-6">
      <div className="max-w-[440px] text-center">
        <p className="text-[22px] font-bold tracking-tight text-white">
          LIN<span className="text-[#06C755]">X</span>
          <span className="ml-2 align-middle text-[11px] font-bold tracking-widest text-white/45">
            DEMO
          </span>
        </p>
        <h1 className="mt-6 text-[22px] font-bold leading-snug text-white sm:text-[26px]">
          管理画面をそのままご覧いただけます
        </h1>
        <p className="mt-4 text-[14px] leading-[1.9] text-[#9CA3AF]">
          ログインは不要です。架空の店舗「{DEMO_STORE_NAME}」のサンプルデータで、
          予約管理・会員管理・入退館・シフトの画面をひととおり触れます。
          入力しても保存はされません。
        </p>
        <p className="mt-8 text-[13px] text-white/50">
          管理画面へ移動しています…
        </p>
      </div>
    </main>
  );
}
