"use client";

import { useEffect } from "react";

/**
 * 画像や埋め込みの読み込みでページ高さが変わるため、ハッシュ付きで開いたときの
 * ブラウザ既定のスクロールが目的のセクションからずれる。読み込み完了後に
 * もう一度合わせ直す。
 */
export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!id) return;

    let cancelled = false;
    const align = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    };

    // レイアウトが落ち着くタイミングを何度か拾う
    const timers = [100, 500, 1200].map((ms) => window.setTimeout(align, ms));
    window.addEventListener("load", align);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("load", align);
    };
  }, []);

  return null;
}
