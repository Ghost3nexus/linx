/**
 * 卸値・料金の正本。
 * コピー・料金表・収益シミュレーターはすべてここを参照する（数字を各所に散らさない）。
 * 根拠は docs/pricing-structure.pdf を参照。
 */

/**
 * 🔴 ここの数字はパートナー向けLPには出さない。
 * B2Bは相手ごとに条件を組むため、率も額も個別に提示する。
 * LPで見せるのは条件（初期費用0円・価格は御社が決める・商圏を絞る）だけ。
 * 実額は資料と打ち合わせで渡す。
 */

/** 想定小売価格（代理店は自由に変更できる。/product と資料で使う） */
export const SUGGESTED_RETAIL = 39800;

/** 卸値型：1店舗あたりの月額卸値（掛け率50%） */
export const WHOLESALE_MONTHLY = 19900;

/** 固定枠型：顧客数無制限の月額固定 */
export const FLAT_MONTHLY = 50000;

/** AI応答1件あたりの卸単価（TP実費 約0.62円の約2倍） */
export const AI_UNIT_WHOLESALE = 1.3;

/** 想定される1顧客あたりの月間AI応答数の初期値 */
export const DEFAULT_RESPONSES = 800;

/** 掛け率（卸値 ÷ 想定小売） */
export const MARGIN_RATE = 1 - WHOLESALE_MONTHLY / SUGGESTED_RETAIL; // 0.747...

export type PlanType = "wholesale" | "flat";

export interface SimInput {
  plan: PlanType;
  clients: number;
  /** 1顧客あたりの月間AI応答数 */
  responses: number;
  /** 代理店がエンドに設定する月額 */
  retail: number;
}

export interface SimResult {
  /** 代理店の仕入れ（TPへの支払い） */
  cost: number;
  /** うち月額ぶん */
  costMonthly: number;
  /** うちAI従量ぶん */
  costAi: number;
  /** 代理店の売上 */
  revenue: number;
  /** 代理店の粗利 */
  profit: number;
  /** 粗利率（売上が0なら0） */
  profitRate: number;
  /** 固定枠型で黒字に必要な顧客数。卸値型では null */
  breakEvenClients: number | null;
}

export function simulate({ plan, clients, responses, retail }: SimInput): SimResult {
  const costAi = clients * responses * AI_UNIT_WHOLESALE;
  const costMonthly = plan === "flat" ? FLAT_MONTHLY : clients * WHOLESALE_MONTHLY;
  const cost = costMonthly + costAi;
  const revenue = clients * retail;
  const profit = revenue - cost;

  let breakEvenClients: number | null = null;
  if (plan === "flat") {
    // clients * retail > FLAT_MONTHLY + clients * responses * AI_UNIT
    const perClient = retail - responses * AI_UNIT_WHOLESALE;
    breakEvenClients = perClient > 0 ? Math.ceil(FLAT_MONTHLY / perClient) : null;
  }

  return {
    cost,
    costMonthly,
    costAi,
    revenue,
    profit,
    profitRate: revenue > 0 ? profit / revenue : 0,
    breakEvenClients,
  };
}

export const yen = (n: number) => `¥${Math.round(n).toLocaleString("ja-JP")}`;
