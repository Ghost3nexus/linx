/**
 * LINX ダッシュボードのスクリーンショット撮影用モックAPI。
 * 画面は本物のまま、データだけ架空のジム（FIT BASE 渋谷店）を返す。
 */
import http from "node:http";

const PORT = Number(process.env.PORT || 5055);
const ok = (data) => ({ success: true, data });

const jst = (d) => new Date(d.getTime() + 9 * 3600e3);
const iso = (d) => jst(d).toISOString().slice(0, 10);
const today = new Date();
const monday = new Date(today);
monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
const day = (n) => iso(new Date(monday.getTime() + n * 864e5));

const STAFF = [
  { id: "s1", name: "佐々木 亮", role: "チーフトレーナー" },
  { id: "s2", name: "三浦 かなえ", role: "トレーナー" },
  { id: "s3", name: "大野 拓真", role: "トレーナー" },
  { id: "s4", name: "宮本 さゆり", role: "ストレッチ担当" },
].map((s) => ({ ...s, accountId: "demo", email: "", isActive: true, createdAt: "2026-04-01T00:00:00Z" }));

const SERVICES = [
  { id: "v1", name: "パーソナル 60分", duration: 60, price: 8800, maxParticipants: 1 },
  { id: "v2", name: "セミパーソナル 60分", duration: 60, price: 5500, maxParticipants: 3 },
  { id: "v3", name: "無料体験", duration: 60, price: 0, maxParticipants: 1 },
  { id: "v4", name: "コンディショニング 30分", duration: 30, price: 4400, maxParticipants: 1 },
  { id: "v5", name: "食事カウンセリング", duration: 30, price: 3300, maxParticipants: 1 },
].map((s, i) => ({ ...s, accountId: "demo", description: "", isActive: true, sortOrder: i, createdAt: "2026-04-01T00:00:00Z" }));

const NAMES = ["田中 美咲","佐藤 健一","鈴木 花子","高橋 大輔","伊藤 彩","渡辺 翔太","山本 結衣","中村 涼","小林 直樹","加藤 優子","吉田 陽菜","山田 隼人","佐々木 蓮","松本 美优","井上 拓也","木村 さくら","林 慎一","清水 舞","森 大地","池田 香織","橋本 悠真","石川 千尋","前田 亮太","藤田 七海"];
const PLANS = ["レギュラー", "デイ", "レギュラー", "回数券", "レギュラー"];
const CUSTOMERS = NAMES.map((name, i) => ({
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

const SLOTS = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","18:00","19:00","20:00"];
const RESERVATIONS = [];
let rid = 1;
for (let d = 0; d < 7; d++) {
  const n = [6, 5, 7, 6, 7, 5, 3][d];
  for (let k = 0; k < n; k++) {
    const start = SLOTS[(d * 3 + k * 2) % SLOTS.length];
    const svc = SERVICES[(d + k) % SERVICES.length];
    const st = STAFF[(d + k) % STAFF.length];
    const cu = CUSTOMERS[(d * 5 + k * 3) % CUSTOMERS.length];
    const endH = String(Number(start.slice(0, 2)) + (svc.duration >= 60 ? 1 : 0)).padStart(2, "0");
    RESERVATIONS.push({
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

const BUSINESS_HOURS = [0, 1, 2, 3, 4, 5, 6].map((d) => ({
  dayOfWeek: d,
  openTime: d === 0 ? "09:00" : "07:00",
  closeTime: d === 0 ? "21:00" : "23:00",
  isClosed: false,
  slotDuration: 60,
}));

const SETTINGS = {
  botName: "FIT BASE サポート",
  tone: "professional",
  escalationUserId: "",
  plan: "standard",
  lineChannelId: "2006123456",
  setupComplete: true,
  clientStripeConnected: true,
  planLimits: { maxMonthlyResponses: 2000, maxKnowledgeFiles: 50 },
};

// 週次のシフト枠（スケジュール画面が読む）
const TEMPLATES = [];
let tid = 1;
const HOURS = ["07:00","09:00","10:00","11:00","14:00","16:00","18:00","19:00","20:00","21:00"];
for (let d = 1; d <= 6; d++) {
  for (let si = 0; si < STAFF.length; si++) {
    const picks = HOURS.filter((_, i) => (i + d + si) % 3 === 0);
    for (const h of picks) {
      const svc = SERVICES[(d + si + tid) % SERVICES.length];
      const endH = String(Number(h.slice(0, 2)) + (svc.duration >= 60 ? 1 : 0)).padStart(2, "0");
      TEMPLATES.push({
        id: `t${tid++}`,
        accountId: "demo",
        dayOfWeek: d,
        startTime: h,
        endTime: `${endH}:${svc.duration >= 60 ? "00" : "30"}`,
        serviceId: svc.id,
        staffId: STAFF[si].id,
        resourceId: null,
        maxParticipants: svc.maxParticipants,
        isActive: true,
        createdAt: "2026-04-01T00:00:00Z",
        serviceName: svc.name,
        serviceDuration: svc.duration,
        servicePrice: svc.price,
        staffName: STAFF[si].name,
        resourceName: null,
      });
    }
  }
}

const ROUTES = [
  [/\/auth\/me$/, () => ({ accountId: "demo", email: "info@fitbase.example", plan: "standard", setupComplete: true, lineConnected: true })],
  [/\/linx\/stats\//, () => ({ monthlyResponses: 1247, maxMonthlyResponses: 2000, knowledgeFiles: 12, maxKnowledgeFiles: 50, plan: "standard" })],
  [/\/linx\/settings\//, () => SETTINGS],
  [/\/linx\/staff\/[^/]+$/, () => ok(STAFF)],
  [/\/linx\/services\/[^/?]+$/, () => ok(SERVICES)],
  [/\/linx\/customers\/[^/?]+$/, () => ok(CUSTOMERS)],
  [/\/linx\/reservations\/[^/?]+/, () => ok(RESERVATIONS)],
  [/\/linx\/business-hours\//, () => ok(BUSINESS_HOURS)],
  [/\/linx\/resources\//, () => ok([{ id: "rs1", accountId: "demo", name: "マシンエリア", type: "area", capacity: 3, isActive: true, createdAt: "" }])],
  [/\/linx\/schedule\/[^/?]+/, () => ok(TEMPLATES)],
  [/\/linx\/store-closures\//, () => ok([])],
  [/\/linx\/knowledge\//, () => ok([])],
  [/\/linx\/logs\//, () => ok([])],
  [/\/linx\/broadcasts\//, () => ok([])],
  [/\/linx\/attendance\//, () => ok([])],
];

http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  if (req.method === "OPTIONS") return res.writeHead(204).end();

  const hit = ROUTES.find(([re]) => re.test(req.url));
  const body = hit ? hit[1]() : ok([]);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}).listen(PORT, () => console.log(`mock api on :${PORT}`));
