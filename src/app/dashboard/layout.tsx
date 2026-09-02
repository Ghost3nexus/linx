"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, BookOpen, MessageSquare, Settings, LogOut, Zap, CalendarDays, CalendarClock, Users, ClipboardList, HelpCircle, DoorOpen, Sparkles, Menu, X } from "lucide-react";
import { isLoggedIn, getMe, clearAuth, isDemoMode, exitDemoMode, type Me } from "@/lib/apiClient";

const navItems = [
    { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
    { href: "/dashboard/knowledge", label: "お店の情報", icon: BookOpen },
    { href: "/dashboard/schedule", label: "スケジュール", icon: CalendarClock },
    { href: "/dashboard/reservations", label: "予約管理", icon: CalendarDays },
    { href: "/dashboard/staff", label: "スタッフ管理", icon: Zap },
    { href: "/dashboard/entry", label: "入退館管理", icon: DoorOpen },
    { href: "/dashboard/customers", label: "会員管理", icon: Users },
    { href: "/dashboard/services", label: "メニュー管理", icon: ClipboardList },
    { href: "/dashboard/aftercare", label: "AfterCare配信", icon: Sparkles },
    { href: "/dashboard/logs", label: "会話ログ", icon: MessageSquare },
    { href: "/dashboard/settings", label: "設定", icon: Settings },
    { href: "/dashboard/guide", label: "取扱説明書", icon: HelpCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [demo, setDemo] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // LINEログインからのリダイレクト: cookieからトークンをlocalStorageに移動
        const params = new URLSearchParams(window.location.search);
        if (params.get("linx_auth") === "1") {
            // cookieからトークン取得
            const cookies = document.cookie.split(";").reduce((acc, c) => {
                const [k, v] = c.trim().split("=");
                acc[k] = v;
                return acc;
            }, {} as Record<string, string>);
            if (cookies.linx_token && cookies.linx_account_id) {
                localStorage.setItem("linx_token", cookies.linx_token);
                localStorage.setItem("linx_account_id", cookies.linx_account_id);
                // cookieを削除
                document.cookie = "linx_token=; path=/; max-age=0";
                document.cookie = "linx_account_id=; path=/; max-age=0";
            }
            window.history.replaceState({}, "", pathname);
        }

        // JWTの存在チェック（クライアント側）
        if (!isLoggedIn()) {
            router.replace("/login");
            return;
        }
        // サーバーでトークン検証
        getMe()
            .then((data) => {
                setDemo(isDemoMode());
                setMe(data);
                setAuthChecked(true);
                // セットアップ未完了の場合はウィザードへ
                if (!data.setupComplete && !data.lineConnected && pathname === "/dashboard") {
                    router.push("/dashboard/setup");
                }
            })
            .catch(() => {
                // トークン無効 → ログアウト
                clearAuth();
                router.replace("/login");
            });
    }, [pathname, router]);

    function handleLogout() {
        clearAuth();
        router.push("/login");
    }

    // 認証確認中はスピナー表示
    if (!authChecked) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-white flex">
            {demo && (
                <div className="fixed inset-x-0 top-0 z-40 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-[#0B0C0E] px-4 py-2 text-center text-[12px] text-white/85 sm:text-[13px]">
                    <span>
                        <strong className="font-bold text-[#06C755]">デモ表示中</strong>
                        ／ 架空の店舗のサンプルデータです。入力しても保存されません
                    </span>
                    <button
                        onClick={() => {
                            exitDemoMode();
                            window.location.href = "/";
                        }}
                        className="rounded-full border border-white/25 px-3 py-1 text-[11px] font-bold transition-colors hover:border-white/60"
                    >
                        デモを終了する
                    </button>
                </div>
            )}
            {/* モバイル用のトップバー。サイドバーは画面幅が足りないので引き出しにする */}
            <div
                className={`fixed inset-x-0 z-30 flex h-[56px] items-center justify-between border-b border-[#E8E8E8] bg-white px-4 lg:hidden ${demo ? "top-11" : "top-0"}`}
                style={{ paddingTop: demo ? undefined : "env(safe-area-inset-top)" }}
            >
                <Link href="/" className="text-[18px] font-bold tracking-tight text-[#1A1A1A]">
                    LIN<span className="text-[#06C755]">X</span>
                </Link>
                <button
                    onClick={() => setNavOpen(true)}
                    aria-label="メニューを開く"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#1A1A1A]"
                >
                    <Menu size={22} />
                </button>
            </div>

            {navOpen && (
                <button
                    aria-label="メニューを閉じる"
                    onClick={() => setNavOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed z-50 flex h-full w-[240px] flex-col border-r border-[#E8E8E8] bg-white transition-transform duration-300 lg:z-20 lg:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"} ${demo ? "pt-11" : ""}`}
            >
                <button
                    onClick={() => setNavOpen(false)}
                    aria-label="メニューを閉じる"
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] lg:hidden"
                    style={{ top: demo ? undefined : "max(env(safe-area-inset-top), 0.75rem)" }}
                >
                    <X size={20} />
                </button>
                <div className="p-5 border-b border-[#E8E8E8]">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-7 h-7 rounded-lg bg-[#06C755] flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                        </div>
                        <span className="text-[#1A1A1A]">LINX</span>
                    </Link>
                    <p className="text-[11px] text-[#AAAAAA] mt-1">管理画面</p>
                </div>

                <nav className="flex-1 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setNavOpen(false)}
                                className={`flex items-center gap-3 px-5 py-3 text-[14px] transition-colors ${isActive
                                    ? "text-[#06C755] bg-[#06C755]/8 border-r-2 border-[#06C755]"
                                    : "text-[#666666] hover:text-[#1A1A1A] hover:bg-gray-50"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Account info + Logout */}
                <div className="p-5 border-t border-[#E8E8E8]">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-full bg-[#06C755]/20 flex items-center justify-center text-[11px] font-bold text-[#06C755]">
                            {me?.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-[#1A1A1A] truncate">{me?.email || ""}</p>
                            <p className="text-[11px] text-[#AAAAAA] capitalize">{me?.plan || "free"} プラン</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[12px] text-[#AAAAAA] hover:text-[#666666] transition-colors"
                    >
                        <LogOut size={13} />
                        ログアウト
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main
                className={`min-h-[100dvh] flex-1 px-5 pb-10 lg:ml-[240px] lg:px-8 lg:pb-8 ${demo ? "pt-[calc(44px+56px+16px)] lg:pt-[76px]" : "pt-[calc(56px+16px)] lg:pt-8"}`}
            >
                {children}
            </main>
        </div>
    );
}
