import IndustryLP from "@/components/IndustryLP";

const data = {
  slug: "studio",
  name: "ダンス・カルチャースタジオ",
  heroImage: "/images/usecase-studio.png",
  heroTitle: "スタジオ運営を\nLINEで一元管理。",
  heroSub: "クラス予約・出席管理・発表会の案内まで、AIが自動化。講師もスタッフも本業に集中できる。",
  pains: [
    {
      title: "クラス数が多く予約管理が追いつかない",
      description:
        "ダンス・バレエ・ヒップホップなどジャンル別×レベル別×講師別のクラスが乱立。手動では空き管理が限界。",
    },
    {
      title: "出席管理がアナログで月謝計算に時間がかかる",
      description:
        "紙の出席簿をもとに月末に手計算。回数制の生徒と月謝制の生徒が混在すると更に複雑に。",
    },
    {
      title: "発表会・イベントの連絡が行き届かない",
      description:
        "発表会のスケジュール・衣装・集合時間などの連絡を個別にLINEやメールで送信。伝達漏れが頻発。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "ジャンル×レベル×講師別のクラス予約管理",
    "出席の自動記録・月次集計",
    "月謝・回数券のLINE決済リンク送付",
    "発表会・イベント情報の一斉配信",
    "体験レッスン→入会フォローのステップ配信",
    "講師別スケジュール管理・代行通知",
    "前日・当日のリマインド自動送信",
    "保護者向け連絡（キッズクラス対応）",
    "会員タグ自動付与（ジャンル・レベル・年齢層）",
  ],
  stats: [
    { value: "24h", label: "AI自動応対" },
    { value: "1日", label: "最短導入" },
    { value: "0円", label: "初期費用" },
  ],
};

export default function Page() {
  return <IndustryLP data={data} />;
}
