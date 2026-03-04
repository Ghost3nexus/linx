"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "@/lib/apiClient";
import { Eye, EyeOff, Zap } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "register">("register");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (mode === "register") {
                await register(email, password);
                router.push("/dashboard/setup");
            } else {
                await login(email, password);
                router.push("/dashboard");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "エラーが発生しました");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#050509] flex items-center justify-center px-4">
            <div className="w-full max-w-[400px]">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-[#06C755] flex items-center justify-center">
                            <Zap size={18} className="text-white" />
                        </div>
                        <span className="text-[20px] font-bold text-white tracking-tight">LINX</span>
                    </div>
                    <h1 className="text-[24px] font-bold text-white">
                        {mode === "register" ? "アカウント作成" : "ログイン"}
                    </h1>
                    <p className="text-[14px] text-[#6B7280] mt-2">
                        {mode === "register"
                            ? "1週間無料お試し。クレジットカード不要。"
                            : "アカウントにログイン"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-[#FF3366]/10 border border-[#FF3366]/30 rounded-lg p-3 text-[#FF3366] text-[13px]">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[13px] text-[#9CA3AF] mb-2">メールアドレス</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@company.com"
                            className="w-full bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] text-[#9CA3AF] mb-2">パスワード</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                placeholder={mode === "register" ? "8文字以上" : "パスワード"}
                                className="w-full bg-[#0A0A0F] border border-[#1A1A2E] rounded-xl px-4 py-3 pr-12 text-[14px] text-white placeholder:text-[#4B5563] focus:border-[#06C755] focus:outline-none transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#06C755] hover:bg-[#08E065] disabled:opacity-50 text-white font-semibold py-[14px] rounded-xl text-[15px] transition-all duration-200 active:scale-95 mt-2"
                    >
                        {loading
                            ? "処理中..."
                            : mode === "register"
                                ? "無料で始める"
                                : "ログイン"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => { setMode(mode === "register" ? "login" : "register"); setError(""); }}
                        className="text-[13px] text-[#6B7280] hover:text-[#9CA3AF] transition-colors"
                    >
                        {mode === "register"
                            ? "すでにアカウントをお持ちの方は ログイン"
                            : "アカウント未登録の方は 新規作成"}
                    </button>
                </div>

                <div className="mt-8 text-center text-[12px] text-[#4B5563]">
                    <a href="/" className="hover:text-[#6B7280] transition-colors">← LPに戻る</a>
                </div>
            </div>
        </div>
    );
}
