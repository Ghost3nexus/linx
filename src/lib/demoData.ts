/**
 * ログイン不要の公開デモ（/demo）が返すサンプルデータ。
 * 代理店が商談の場で管理画面をそのまま見せられるようにするためのもの。
 * 店名・人名はすべて架空。実在の導入先ではない。
 */

const DAY = 864e5;
const jst = (d: Date) => new Date(d.getTime() + 9 * 3600e3);
const iso = (d: Date) => jst(d).toISOString().slice(0, 10);

function monday(): Date {
  const t = new Date();
  const m = new Date(t);
  m.setDate(t.getDate() - ((t.getDay() + 6) % 7));
  return m;
}
const day = (n: number) => iso(new Date(monday().getTime() + n * DAY));

export const DEMO_ACCOUNT = "demo";
export const DEMO_STORE_NAME = "FIT BASE 渋谷店";

export const demoStaff = [
  { id: "s1", name: "佐々木 亮", role: "チーフトレーナー" },
  { id: "s2", name: "三浦 かなえ", role: "トレーナー" },
  { id: "s3", name: "大野 拓真", role: "トレーナー" },
  { id: "s4", name: "宮本 さゆり", role: "ストレッチ担当" },
].map((s) => ({
  ...s,
  accountId: DEMO_ACCOUNT,
  email: "",
  lineUserId: "",
  isActive: true,
  createdAt: "2026-04-01T00:00:00Z",
}));

export const demoServices = [
  { id: "v1", name: "パーソナル 60分", duration: 60, price: 8800, maxParticipants: 1 },
  { id: "v2", name: "セミパーソナル 60分", duration: 60, price: 5500, maxParticipants: 3 },
  { id: "v3", name: "無料体験", duration: 60, price: 0, maxParticipants: 1 },
  { id: "v4", name: "コンディショニング 30分", duration: 30, price: 4400, maxParticipants: 1 },
  { id: "v5", name: "食事カウンセリング", duration: 30, price: 3300, maxParticipants: 1 },
].map((s, i) => ({
  ...s,
  accountId: DEMO_ACCOUNT,
  description: "",
  isActive: true,
  sortOrder: i,
  createdAt: "2026-04-01T00:00:00Z",
}));

const NAMES = [
  "田中 美咲", "佐藤 健一", "鈴木 花子", "高橋 大輔", "伊藤 彩", "渡辺 翔太",
  "山本 結衣", "中村 涼", "小林 直樹", "加藤 優子", "吉田 陽菜", "山田 隼人",
  "佐々木 蓮", "松本 美優", "井上 拓也", "木村 さくら", "林 慎一", "清水 舞",
  "森 大地", "池田 香織", "橋本 悠真", "石川 千尋", "前田 亮太", "藤田 七海",
];
const PLANS = ["レギュラー", "デイ", "レギュラー", "回数券", "レギュラー"];

export const demoCustomers = NAMES.map((name, i) => ({
  id: `c${i + 1}`,
  name,
  lineUserId: `U${String(i).padStart(6, "0")}`,
  email: "",
  phone: "",
  plan: PLANS[i % PLANS.length],
  notes: "",
  firstVisit: day(-((i % 60) + 20)),
  lastVisit: day(-(i % 9)),
  visitCount: 4 + ((i * 7) % 46),
  status: i % 11 === 0 ? "休会" : "active",
  createdAt: "2026-05-01T00:00:00Z",
  updatedAt: "2026-08-30T00:00:00Z",
}));

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "18:00", "19:00", "20:00"];

export const demoReservations = (() => {
  const out: Record<string, unknown>[] = [];
  let rid = 1;
  for (let d = 0; d < 7; d++) {
    const n = [6, 5, 7, 6, 7, 5, 3][d];
    for (let k = 0; k < n; k++) {
      const start = SLOTS[(d * 3 + k * 2) % SLOTS.length];
      const svc = demoServices[(d + k) % demoServices.length];
      const st = demoStaff[(d + k) % demoStaff.length];
      const cu = demoCustomers[(d * 5 + k * 3) % demoCustomers.length];
      const endH = String(Number(start.slice(0, 2)) + (svc.duration >= 60 ? 1 : 0)).padStart(2, "0");
      out.push({
        id: `r${rid++}`,
        customerName: cu.name,
        customerLineUserId: cu.lineUserId,
        date: day(d),
        startTime: start,
        endTime: `${endH}:${svc.duration >= 60 ? "00" : "30"}`,
        service: svc.name,
        staffId: st.id,
        staffName: st.name,
        note: "",
        status: d < 1 ? "completed" : "confirmed",
        createdAt: "2026-08-28T00:00:00Z",
        updatedAt: "2026-08-28T00:00:00Z",
      });
    }
  }
  return out;
})();

const HOURS = ["07:00", "09:00", "10:00", "11:00", "14:00", "16:00", "18:00", "19:00", "20:00", "21:00"];

export const demoTemplates = (() => {
  const out: Record<string, unknown>[] = [];
  let tid = 1;
  for (let d = 1; d <= 6; d++) {
    for (let si = 0; si < demoStaff.length; si++) {
      const picks = HOURS.filter((_, i) => (i + d + si) % 3 === 0);
      for (const h of picks) {
        const svc = demoServices[(d + si + tid) % demoServices.length];
        const endH = String(Number(h.slice(0, 2)) + (svc.duration >= 60 ? 1 : 0)).padStart(2, "0");
        out.push({
          id: `t${tid++}`,
          accountId: DEMO_ACCOUNT,
          dayOfWeek: d,
          startTime: h,
          endTime: `${endH}:${svc.duration >= 60 ? "00" : "30"}`,
          serviceId: svc.id,
          staffId: demoStaff[si].id,
          resourceId: null,
          maxParticipants: svc.maxParticipants,
          isActive: true,
          createdAt: "2026-04-01T00:00:00Z",
          serviceName: svc.name,
          serviceDuration: svc.duration,
          servicePrice: svc.price,
          staffName: demoStaff[si].name,
          resourceName: null,
        });
      }
    }
  }
  return out;
})();

export const demoBusinessHours = [0, 1, 2, 3, 4, 5, 6].map((d) => ({
  dayOfWeek: d,
  openTime: d === 0 ? "09:00" : "07:00",
  closeTime: d === 0 ? "21:00" : "23:00",
  isClosed: false,
  slotDuration: 60,
}));

export const demoKnowledge = [
  { id: "k1", accountId: DEMO_ACCOUNT, title: "営業時間・アクセス", content: "平日 7:00〜23:00 / 土日祝 9:00〜21:00。渋谷駅から徒歩6分。", createdAt: "2026-05-02T00:00:00Z", updatedAt: "2026-08-01T00:00:00Z" },
  { id: "k2", accountId: DEMO_ACCOUNT, title: "料金プラン", content: "レギュラー ¥8,800/月、デイ ¥6,600/月。体験は無料です。", createdAt: "2026-05-02T00:00:00Z", updatedAt: "2026-08-01T00:00:00Z" },
  { id: "k3", accountId: DEMO_ACCOUNT, title: "持ち物・服装", content: "運動着、室内シューズ、タオル。ウェアの無料レンタルもあります。", createdAt: "2026-05-02T00:00:00Z", updatedAt: "2026-08-01T00:00:00Z" },
];

export const demoLogs = [
  { q: "明日の18時、空いてますか？", a: "明日 18:00〜 に空きがございます。ご予約されますか？", h: 2 },
  { q: "料金を教えてください", a: "レギュラー ¥8,800/月、デイ ¥6,600/月です。体験は無料です。", h: 5 },
  { q: "駐車場はありますか", a: "提携駐車場が3台分ございます。受付でご案内します。", h: 9 },
  { q: "体験を予約したいです", a: "無料体験の空き枠です。1. 明日 14:00〜 2. 明後日 10:00〜", h: 14 },
  { q: "休会の手続きは？", a: "LINEから休会の申請ができます。前月20日までのお手続きが必要です。", h: 20 },
].map((x, i) => ({
  id: `l${i + 1}`,
  accountId: DEMO_ACCOUNT,
  groupId: "",
  userId: `U${String(i).padStart(6, "0")}`,
  displayName: demoCustomers[i].name,
  query: x.q,
  response: x.a,
  escalated: false,
  toolsUsed: [],
  timestamp: new Date(Date.now() - x.h * 3600e3).toISOString(),
}));

export const demoSettings = {
  botName: "FIT BASE サポート",
  tone: "professional" as const,
  escalationUserId: "",
  plan: "standard",
  lineChannelId: "2006123456",
  setupComplete: true,
  clientStripeConnected: true,
  planLimits: { maxMonthlyResponses: 2000, maxKnowledgeFiles: 50 },
};

export const demoMe = {
  accountId: DEMO_ACCOUNT,
  email: "info@fitbase.example",
  plan: "standard",
  setupComplete: true,
  lineConnected: true,
};

export const demoStats = {
  monthlyResponses: 1247,
  maxMonthlyResponses: 2000,
  knowledgeFiles: demoKnowledge.length,
  maxKnowledgeFiles: 50,
  plan: "standard",
};

/** パスからデモ用のレスポンスを引く。該当が無ければ空の成功を返す */
export function resolveDemo(path: string): unknown {
  const ok = (data: unknown) => ({ success: true, data });
  const table: [RegExp, () => unknown][] = [
    [/^\/auth\/me/, () => demoMe],
    [/^\/linx\/stats\//, () => demoStats],
    [/^\/linx\/settings\//, () => demoSettings],
    [/^\/linx\/staff\/[^/]+$/, () => ok(demoStaff)],
    [/^\/linx\/services\/[^/?]+$/, () => ok(demoServices)],
    [/^\/linx\/customers\/[^/?]+$/, () => ok(demoCustomers)],
    [/^\/linx\/reservations\/[^/?]+/, () => ok(demoReservations)],
    [/^\/linx\/business-hours\//, () => ok(demoBusinessHours)],
    [/^\/linx\/schedule\/[^/?]+/, () => ok(demoTemplates)],
    [/^\/linx\/knowledge\//, () => ok(demoKnowledge)],
    [/^\/linx\/logs\//, () => ok(demoLogs)],
    [/^\/linx\/resources\//, () => ok([{ id: "rs1", accountId: DEMO_ACCOUNT, name: "マシンエリア", type: "area", capacity: 3, isActive: true, createdAt: "" }])],
  ];
  const hit = table.find(([re]) => re.test(path));
  return hit ? hit[1]() : ok([]);
}
