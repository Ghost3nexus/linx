export const SITE = {
  url: "https://linx-rouge.vercel.app",
  name: "LINX",
  company: "株式会社TomorrowProof",
  companyUrl: "https://tomorrowproof-ai.com",
  email: "kozuki@tomorrowproof-ai.com",
} as const;

/** 検索エンジンにインデックスさせるか。ドメイン移行やプレビュー中は false にする */
export const INDEXABLE = true;

/**
 * パートナーが実機で試せるデモ用LINE公式アカウントの友だち追加URL。
 * 未用意のあいだは null にしておくこと（動かないQRを出さない）。
 */
export const DEMO_LINE_URL: string | null = null;

/**
 * 打ち合わせの日程調整ページ（TimeRex / Spir / Googleの予約ページ等）。
 * 未設定のあいだは申込フォームに落として、こちらから日程を返す。
 */
export const MEETING_URL: string | null = null;

/** 打ち合わせの申し込み先。カレンダーが未用意でも動くようにする */
export const meetingHref = (type?: "reseller" | "inhouse") =>
  MEETING_URL ?? `/documents?purpose=meeting${type ? `&type=${type}` : ""}`;

/** 資料請求の申し込み先 */
export const documentsHref = (type?: "reseller" | "inhouse") =>
  `/documents?purpose=documents${type ? `&type=${type}` : ""}`;
