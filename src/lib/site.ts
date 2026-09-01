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
