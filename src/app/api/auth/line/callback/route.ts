import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    const error = request.nextUrl.searchParams.get("error");

    if (error) {
        return NextResponse.redirect(new URL("/login?error=line_denied", request.url));
    }

    if (!code) {
        return NextResponse.redirect(new URL("/login?error=no_code", request.url));
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://linx-server-production.up.railway.app/api";
        const res = await fetch(`${apiUrl}/auth/line/callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (!data.token) {
            return NextResponse.redirect(new URL("/login?error=line_failed", request.url));
        }

        // トークンとアカウント情報をクエリパラメータで渡す（フロントでlocalStorageに保存）
        const params = new URLSearchParams({
            token: data.token,
            accountId: data.accountId,
            name: data.name || "",
            isNew: data.isNewUser ? "1" : "0",
        });

        const redirectPath = data.isNewUser ? "/dashboard/setup" : "/dashboard";
        return NextResponse.redirect(new URL(`${redirectPath}?${params}`, request.url));
    } catch {
        return NextResponse.redirect(new URL("/login?error=line_error", request.url));
    }
}
