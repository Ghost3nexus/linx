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
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-[400px]">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-[#06C755] flex items-center justify-center">
                            <Zap size={18} className="text-white" />
                        </div>
                        <span className="text-[20px] font-bold text-[#1A1A1A] tracking-tight">LINX</span>
                    </div>
                    <h1 className="text-[24px] font-bold text-[#1A1A1A]">
                        {mode === "register" ? "アカウント作成" : "ログイン"}
                    </h1>
                    <p className="text-[14px] text-[#999999] mt-2">
                        {mode === "register"
                            ? "Freeプランでずっと無料。クレジットカード不要。"
                            : "アカウントにログイン"}
                    </p>
                </div>

                {/* LINE Login */}
                <button
                    onClick={async () => {
                        setLoading(true);
                        setError("");
                        try {
                            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://linx-server-production.up.railway.app/api";
                            const res = await fetch(`${apiUrl}/auth/line`);
                            const data = await res.json();
                            if (data.url) {
                                window.location.href = data.url;
                            } else {
                                setError("LINEログインの準備ができていません");
                                setLoading(false);
                            }
                        } catch {
                            setError("LINEログインに失敗しました");
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    className="w-full bg-[#06C755] hover:bg-[#05B04A] disabled:opacity-50 text-white font-bold py-[14px] rounded-xl text-[15px] transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
                    LINEでログイン
                </button>

                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-[#E8E8E8]" />
                    <span className="text-[12px] text-[#999]">またはメールアドレスで</span>
                    <div className="flex-1 h-px bg-[#E8E8E8]" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-3 text-[#E53935] text-[13px]">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-[13px] text-[#666666] mb-2">メールアドレス</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@company.com"
                            className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] text-[#666666] mb-2">パスワード</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                placeholder={mode === "register" ? "8文字以上" : "パスワード"}
                                className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-xl px-4 py-3 pr-12 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] hover:text-[#666666] transition-colors"
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
                        className="text-[13px] text-[#999999] hover:text-[#666666] transition-colors"
                    >
                        {mode === "register"
                            ? "すでにアカウントをお持ちの方は ログイン"
                            : "アカウント未登録の方は 新規作成"}
                    </button>
                </div>

                <div className="mt-8 text-center text-[12px] text-[#AAAAAA]">
                    <a href="/" className="hover:text-[#999999] transition-colors">← LPに戻る</a>
                </div>
            </div>
        </div>
    );
}
