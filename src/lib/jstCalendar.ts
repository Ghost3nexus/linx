/**
 * JST (日本標準時) ベースの日付計算 + 日本の祝祭日
 * サーバーがUTCでも常にJSTで正しい日付を返す
 */

const JST_OFFSET = 9 * 60; // UTC+9 in minutes

/** 現在のJST日時を取得 */
export function nowJST(): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + JST_OFFSET * 60000);
}

/** JST基準で今日のYYYY-MM-DD文字列を返す */
export function todayJST(): string {
    return toDateStr(nowJST());
}

/** Date → YYYY-MM-DD */
export function toDateStr(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** YYYY-MM-DD → M/D 短縮表示 */
export function formatDateShort(dateStr: string): string {
    const [, m, d] = dateStr.split("-");
    return `${Number(m)}/${Number(d)}`;
}

/** 指定週のオフセットから月〜日の7日分のYYYY-MM-DD配列を返す（JST基準） */
export function getWeekDatesJST(weekOffset: number): string[] {
    const today = nowJST();
    today.setDate(today.getDate() + weekOffset * 7);
    // 月曜始まり
    const dayOfWeek = today.getDay(); // 0=日, 1=月, ...
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        dates.push(toDateStr(d));
    }
    return dates;
}

/** 指定曜日の今週の日付を返す（JST基準） */
export function getThisWeekDate(dayOfWeek: number): { month: number; date: number; dateStr: string; isToday: boolean } {
    const today = nowJST();
    const todayDow = today.getDay();
    const diff = dayOfWeek - todayDow;
    const target = new Date(today);
    target.setDate(today.getDate() + diff);
    const dateStr = toDateStr(target);
    return {
        month: target.getMonth() + 1,
        date: target.getDate(),
        dateStr,
        isToday: diff === 0,
    };
}

// ── 日本の祝祭日（2025-2027年）──
// 振替休日ルール: 祝日が日曜→月曜が振替休日

interface Holiday {
    name: string;
    shortName: string; // 短縮表示用
}

const FIXED_HOLIDAYS: Record<string, Holiday> = {
    // 2025年
    "2025-01-01": { name: "元日", shortName: "元日" },
    "2025-01-13": { name: "成人の日", shortName: "成人" },
    "2025-02-11": { name: "建国記念の日", shortName: "建国" },
    "2025-02-23": { name: "天皇誕生日", shortName: "天皇" },
    "2025-02-24": { name: "振替休日", shortName: "振替" },
    "2025-03-20": { name: "春分の日", shortName: "春分" },
    "2025-04-29": { name: "昭和の日", shortName: "昭和" },
    "2025-05-03": { name: "憲法記念日", shortName: "憲法" },
    "2025-05-04": { name: "みどりの日", shortName: "みどり" },
    "2025-05-05": { name: "こどもの日", shortName: "こども" },
    "2025-05-06": { name: "振替休日", shortName: "振替" },
    "2025-07-21": { name: "海の日", shortName: "海" },
    "2025-08-11": { name: "山の日", shortName: "山" },
    "2025-09-15": { name: "敬老の日", shortName: "敬老" },
    "2025-09-23": { name: "秋分の日", shortName: "秋分" },
    "2025-10-13": { name: "スポーツの日", shortName: "スポーツ" },
    "2025-11-03": { name: "文化の日", shortName: "文化" },
    "2025-11-23": { name: "勤労感謝の日", shortName: "勤労" },
    "2025-11-24": { name: "振替休日", shortName: "振替" },
    // 2026年
    "2026-01-01": { name: "元日", shortName: "元日" },
    "2026-01-12": { name: "成人の日", shortName: "成人" },
    "2026-02-11": { name: "建国記念の日", shortName: "建国" },
    "2026-02-23": { name: "天皇誕生日", shortName: "天皇" },
    "2026-03-20": { name: "春分の日", shortName: "春分" },
    "2026-04-29": { name: "昭和の日", shortName: "昭和" },
    "2026-05-03": { name: "憲法記念日", shortName: "憲法" },
    "2026-05-04": { name: "みどりの日", shortName: "みどり" },
    "2026-05-05": { name: "こどもの日", shortName: "こども" },
    "2026-05-06": { name: "振替休日", shortName: "振替" },
    "2026-07-20": { name: "海の日", shortName: "海" },
    "2026-08-11": { name: "山の日", shortName: "山" },
    "2026-09-21": { name: "敬老の日", shortName: "敬老" },
    "2026-09-22": { name: "国民の休日", shortName: "休日" },
    "2026-09-23": { name: "秋分の日", shortName: "秋分" },
    "2026-10-12": { name: "スポーツの日", shortName: "スポーツ" },
    "2026-11-03": { name: "文化の日", shortName: "文化" },
    "2026-11-23": { name: "勤労感謝の日", shortName: "勤労" },
    // 2027年
    "2027-01-01": { name: "元日", shortName: "元日" },
    "2027-01-11": { name: "成人の日", shortName: "成人" },
    "2027-02-11": { name: "建国記念の日", shortName: "建国" },
    "2027-02-23": { name: "天皇誕生日", shortName: "天皇" },
    "2027-03-21": { name: "春分の日", shortName: "春分" },
    "2027-03-22": { name: "振替休日", shortName: "振替" },
    "2027-04-29": { name: "昭和の日", shortName: "昭和" },
    "2027-05-03": { name: "憲法記念日", shortName: "憲法" },
    "2027-05-04": { name: "みどりの日", shortName: "みどり" },
    "2027-05-05": { name: "こどもの日", shortName: "こども" },
    "2027-07-19": { name: "海の日", shortName: "海" },
    "2027-08-11": { name: "山の日", shortName: "山" },
    "2027-09-20": { name: "敬老の日", shortName: "敬老" },
    "2027-09-23": { name: "秋分の日", shortName: "秋分" },
    "2027-10-11": { name: "スポーツの日", shortName: "スポーツ" },
    "2027-11-03": { name: "文化の日", shortName: "文化" },
    "2027-11-23": { name: "勤労感謝の日", shortName: "勤労" },
};

/** 指定日が祝日かチェック。祝日ならHolidayオブジェクト、違えばnull */
export function getHoliday(dateStr: string): Holiday | null {
    return FIXED_HOLIDAYS[dateStr] || null;
}

/** 指定日が祝日かどうか */
export function isHoliday(dateStr: string): boolean {
    return dateStr in FIXED_HOLIDAYS;
}

export const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];
