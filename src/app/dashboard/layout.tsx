"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, BookOpen, MessageSquare, Settings, ArrowLeft, CreditCard, LogOut, Zap } from "lucide-react";
import { isLoggedIn, getMe, clearAuth, type Me } from "@/lib/apiClient";

const navItems = [
    { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
    { href: "/dashboard/knowledge", label: "お店の情報", icon: BookOpen },
    { href: "/dashboard/logs", label: "会話ログ", icon: MessageSquare },
    { href: "/dashboard/settings", label: "設定", icon: Settings },
    { href: "/dashboard/billing", label: "プラン・課金", icon: CreditCard },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [me, setMe] = useState<Me | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        // JWTの存在チェック（クライアント側）
        if (!isLoggedIn()) {
            router.replace("/login");
            return;
        }
        // サーバーでトークン検証
        getMe()
            .then((data) => {
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
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <aside className="w-[240px] bg-white border-r border-[#E8E8E8] flex flex-col fixed h-full z-20">
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
            <main className="flex-1 ml-[240px] p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
