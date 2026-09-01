import type { Metadata } from "next";
import IndustryLP from "@/components/IndustryLP";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const data = {
  slug: "studio",
  name: "ダンス・カルチャースタジオ",
  heroImage: "/images/usecase-studio.jpg",
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


export const metadata: Metadata = {
  title: "ダンス・カルチャースタジオ管理システム｜LINEでクラス予約と出席管理 | LINX",
  description: "ダンス・カルチャースタジオ向けの管理システム。クラス予約、出席管理、月謝の案内、発表会の連絡までを公式LINE上のAIが自動化。講師もスタッフも本業に集中できます。",
  keywords: "スタジオ 予約管理 システム,ダンススクール 管理,出席管理,月謝 管理,クラス予約 システム",
  alternates: { canonical: `${SITE.url}/solutions/studio` },
  openGraph: {
    title: "ダンス・カルチャースタジオ管理システム｜LINEでクラス予約と出席管理 | LINX",
    description: "ダンス・カルチャースタジオ向けの管理システム。クラス予約、出席管理、月謝の案内、発表会の連絡までを公式LINE上のAIが自動化。講師もスタッフも本業に集中できます。",
    url: `${SITE.url}/solutions/studio`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: data.heroImage, width: 1200, height: 630, alt: `${data.name}向けの予約・会員管理システム LINX` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ダンス・カルチャースタジオ管理システム｜LINEでクラス予約と出席管理 | LINX",
    description: "ダンス・カルチャースタジオ向けの管理システム。クラス予約、出席管理、月謝の案内、発表会の連絡までを公式LINE上のAIが自動化。講師もスタッフも本業に集中できます。",
    images: [data.heroImage],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: SITE.url },
            {
              "@type": "ListItem",
              position: 2,
              name: data.name,
              item: `${SITE.url}/solutions/studio`,
            },
          ],
        }}
      />
      <IndustryLP data={data} />
    </>
  );
}
