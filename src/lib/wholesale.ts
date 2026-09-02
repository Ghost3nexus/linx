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


/**
 * 料金プラン。一般向け（想定小売）は 39,800円〜。
 *
 * 🔴 設計の要点：AI応答を従量請求にしない。
 * 従量にすると (1) 店舗が請求額を読めない (2) 代理店が転売時に読めない
 * (3) 当社のランニングコストが青天井になる、の3つが同時に起きる。
 * そこで「含まれるAI応答数」を上限としてプランに畳み、月額を固定する。
 *
 * 上限に達したときはAI応答のみ定型文に切り替わる。
 * 予約・会員管理・入退館・決済は動き続ける（入退館が止まると店舗の営業が止まるため）。
 * 超過時は上位プランへの変更で即解除できる。
 */
export const PLANS = [
  {
    id: "standard",
    name: "スタンダード",
    retail: 39800,
    aiCap: 1000,
    note: "1日あたり約33件。会員100〜300名規模の想定",
  },
  {
    id: "plus",
    name: "プラス",
    retail: 59800,
    aiCap: 5000,
    note: "1日あたり約166件。予約の出入りが多い店舗",
  },
  {
    id: "pro",
    name: "プロ",
    retail: 89800,
    aiCap: 15000,
    note: "1日あたり約500件。多店舗・大規模施設",
  },
] as const;

/** AI応答1件あたりの当社実費（🔴 算定値。実請求で未検証） */
export const AI_UNIT_COST = 0.62;

/**
 * 卸値は「想定小売 × (1 − 代理店の取り分)」で決まる。
 * プランごとに卸値表を持たない（数字を散らすと必ず食い違う）。
 */
export const wholesaleFor = (retail: number, partnerShare: number) =>
  Math.round((retail * (1 - partnerShare)) / 100) * 100;

/** 上限超過分の扱い。どちらを採るかは代理店ごとに決める */
export const OVERAGE_POLICY = {
  /** 当社が担う：上限で止める。追加請求は発生しない */
  capped: "上限でAI応答を定型文に切り替える。追加請求なし",
  /** 代理店が持つ：実費で仕入れて、売り方は代理店が決める */
  passthrough: "超過分を実費で仕入れ、上乗せの有無と額は代理店が決める",
} as const;

/** 想定小売価格＝スタンダードの月額。代理店は自由に変更できる */
export const SUGGESTED_RETAIL = 39800;

/** 卸値型：1店舗あたりの月額卸値（掛け率50%） */
export const WHOLESALE_MONTHLY = 19900;

/** 固定枠型：顧客数無制限の月額固定 */
export const FLAT_MONTHLY = 50000;

/**
 * @deprecated AI応答は上限つきプランに畳んだ。従量の卸単価は使わない。
 * 代理店が超過分を持つ場合のみ、実費 AI_UNIT_COST を基準に個別に決める。
 */
export const AI_UNIT_WHOLESALE = 1.3;
export const DEFAULT_RESPONSES = 800;

/** 掛け率（卸値 ÷ 想定小売） */
export const MARGIN_RATE = 1 - WHOLESALE_MONTHLY / SUGGESTED_RETAIL; // 0.747...

/**
 * 店舗数による段階。売った実績で条件が良くなる方向にしてある。
 * 未実績の相手に最良条件を先に渡さないため、逓減は「上げる」方向で組む。
 * 一度到達した段は下げない（一時的に店舗数が減っても据え置き）。
 * 🔴 LPには出さない。資料と打ち合わせで提示する。
 */
export const WHOLESALE_TIERS = [
  { from: 1, to: 9, wholesale: 19900, partnerShare: 0.5 },
  { from: 10, to: 29, wholesale: 17000, partnerShare: 0.57 },
  { from: 30, to: 99, wholesale: 14700, partnerShare: 0.63 },
  { from: 100, to: null, wholesale: 11900, partnerShare: 0.7 },
] as const;

/** 契約条件 */
export const CONTRACT = {
  minimumMonths: 6,
  renewal: "以後1ヶ月単位で自動更新",
  noticeMonths: 1,
} as const;

/** サポート窓口 */
export const SUPPORT = {
  channels: ["公式LINE", "メール"],
  hours: "平日",
} as const;

/** 申込から販売開始までの目安 */
export const ONBOARDING_WEEKS = 2;

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
