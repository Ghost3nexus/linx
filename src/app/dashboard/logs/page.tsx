"use client";

import { useEffect, useState, useCallback } from "react";
import { getLogs, type LogEntry } from "@/lib/apiClient";
import { MessageSquare, AlertTriangle, Search, Wrench } from "lucide-react";

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<"all" | "escalated">("all");
    const [search, setSearch] = useState("");

    const load = useCallback(() => {
        setLoading(true);
        getLogs(100, 0)
            .then(setLogs)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => { load(); }, [load]);

    const filtered = logs.filter((log) => {
        if (filter === "escalated" && !log.escalated) return false;
        if (search) {
            const q = search.toLowerCase();
            return log.query.toLowerCase().includes(q) ||
                log.response.toLowerCase().includes(q) ||
                log.displayName.toLowerCase().includes(q);
        }
        return true;
    });

    return (
        <div>
            <h1 className="text-[24px] font-bold text-[#1A1A1A]">会話ログ</h1>
            <p className="text-[#999999] mt-1 text-[14px]">AIの応答履歴を確認できます</p>

            {error && (
                <div className="mt-4 bg-[#E53935]/10 border border-[#E53935]/30 rounded-lg p-4 text-[#E53935] text-[14px]">
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="質問・回答・ユーザー名で検索..."
                        className="w-full bg-[#F9FAFB] border border-[#E8E8E8] rounded-lg pl-10 pr-4 py-2.5 text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#06C755] focus:outline-none transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${filter === "all"
                                ? "bg-[#06C755]/15 text-[#06C755] border border-[#06C755]/30"
                                : "bg-white text-[#999999] border border-[#E8E8E8] hover:text-[#1A1A1A]"
                            }`}
                    >
                        すべて ({logs.length})
                    </button>
                    <button
                        onClick={() => setFilter("escalated")}
                        className={`px-4 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${filter === "escalated"
                                ? "bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30"
                                : "bg-white text-[#999999] border border-[#E8E8E8] hover:text-[#1A1A1A]"
                            }`}
                    >
                        エスカレーション ({logs.filter((l) => l.escalated).length})
                    </button>
                </div>
            </div>

            {/* Log entries */}
            <div className="mt-6 space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[#06C755] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-[#E8E8E8] rounded-xl">
                        <MessageSquare size={40} className="text-[#D0D0D0] mx-auto mb-4" />
                        <p className="text-[#999999] text-[15px]">会話ログがありません</p>
                        <p className="text-[#AAAAAA] text-[13px] mt-1">LINEで@LINXにメッセージを送るとここに表示されます</p>
                    </div>
                ) : (
                    filtered.map((log, i) => (
                        <div
                            key={`${log.timestamp}-${i}`}
                            className={`bg-white border rounded-xl p-5 ${log.escalated ? "border-[#FFB800]/30" : "border-[#E8E8E8]"
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[12px] text-[#AAAAAA]">
                                    {new Date(log.timestamp).toLocaleString("ja-JP")}
                                </span>
                                <span className="text-[12px] text-[#06C755] font-medium">{log.displayName}</span>
                                {log.escalated && (
                                    <span className="flex items-center gap-1 text-[11px] text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded-full">
                                        <AlertTriangle size={12} />
                                        エスカレーション
                                    </span>
                                )}
                                {log.toolsUsed && log.toolsUsed.length > 0 && (
                                    <span className="flex items-center gap-1 text-[11px] text-[#06C755] bg-[#06C755]/10 px-2 py-0.5 rounded-full">
                                        <Wrench size={12} />
                                        {log.toolsUsed.join(", ")}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <span className="text-[12px] text-[#999999] shrink-0 mt-0.5">Q:</span>
                                    <p className="text-[14px] text-[#333333]">{log.query}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-[12px] text-[#06C755] shrink-0 mt-0.5">A:</span>
                                    <p className="text-[14px] text-[#666666]">{log.response}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
