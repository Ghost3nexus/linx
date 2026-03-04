"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, MessageSquare, Settings, ArrowLeft } from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
    { href: "/dashboard/knowledge", label: "ナレッジ", icon: BookOpen },
    { href: "/dashboard/logs", label: "会話ログ", icon: MessageSquare },
    { href: "/dashboard/settings", label: "設定", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#050508] flex">
            {/* Sidebar */}
            <aside className="w-[240px] bg-[#0A0A0F] border-r border-[#1A1A2E] flex flex-col fixed h-full z-20">
                <div className="p-5 border-b border-[#1A1A2E]">
                    <Link href="/" className="flex items-center gap-2 text-[#06C755] font-bold text-lg">
                        <ArrowLeft size={16} />
                        LINX
                    </Link>
                    <p className="text-[12px] text-[#6B7280] mt-1">管理画面</p>
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
                                        : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-5 border-t border-[#1A1A2E]">
                    <p className="text-[12px] text-[#6B7280]">Account: default</p>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-[240px] p-8 min-h-screen">
                {children}
            </main>
        </div>
    );
}
