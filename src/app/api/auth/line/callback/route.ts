import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code");
    const returnedState = request.nextUrl.searchParams.get("state");
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
            body: JSON.stringify({ code, state: returnedState }),
        });

        const data = await res.json();

        if (!data.token) {
            return NextResponse.redirect(new URL("/login?error=line_failed", request.url));
        }

        // セキュリティ: トークンをURLパラメータに含めない
        // 代わりに短命のワンタイムコードをURLに渡し、フロントがPOSTで交換する
        // 簡易実装: HttpOnly cookieでトークンを渡す
        const redirectPath = data.isNewUser ? "/dashboard/setup" : "/dashboard";
        const response = NextResponse.redirect(new URL(`${redirectPath}?linx_auth=1&new=${data.isNewUser ? "1" : "0"}`, request.url));

        // トークンをcookieに設定（HttpOnly=falseはlocalStorageに移すため）
        response.cookies.set("linx_token", data.token, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            sameSite: "lax",
            secure: true,
        });
        response.cookies.set("linx_account_id", data.accountId, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
            sameSite: "lax",
            secure: true,
        });

        return response;
    } catch {
        return NextResponse.redirect(new URL("/login?error=line_error", request.url));
    }
}
