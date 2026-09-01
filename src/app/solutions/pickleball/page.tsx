import type { Metadata } from "next";
import IndustryLP from "@/components/IndustryLP";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const data = {
  slug: "pickleball",
  name: "ピックルボール施設",
  heroImage: "/images/usecase-pickleball.jpg",
  heroTitle: "コート予約も大会運営も\nLINEで完結。",
  heroSub: "コート予約・会員管理・大会エントリーまで、AIが自動化。急成長するスポーツの運営を支える。",
  pains: [
    {
      title: "コート予約の調整が煩雑",
      description:
        "複数コート×時間帯×利用人数の組み合わせを手動で管理。電話やDMでの予約受付に時間を取られる。",
    },
    {
      title: "大会・イベントの参加管理が手作業",
      description:
        "エントリー受付、組み合わせ発表、結果通知をすべて手動で対応。参加者が増えるほど負荷が増大。",
    },
    {
      title: "新規会員の獲得・定着施策が不足",
      description:
        "体験プログラム後のフォローが不十分で、会員登録につながらない。利用頻度の低い会員へのアプローチもできていない。",
    },
  ],
  features: [
    "24時間AI自動応対（LINE）",
    "コート別・時間帯別の予約管理",
    "大会・イベントのエントリー自動受付",
    "参加者への組み合わせ・結果の自動通知",
    "体験→会員登録フォローのステップ配信",
    "月会費・ビジター料金のLINE決済リンク送付",
    "レッスン予約（初心者クラス・上級者クラス）",
    "前日・当日のリマインド自動送信",
    "会員ランク別のセグメント配信",
    "利用頻度に応じた休眠会員への自動アプローチ",
  ],
  stats: [
    { value: "24h", label: "AI自動応対" },
    { value: "1日", label: "最短導入" },
    { value: "0円", label: "初期費用" },
  ],
};


export const metadata: Metadata = {
  title: "ピックルボール施設の予約管理システム｜コート予約・大会エントリーをLINEで | LINX",
  description: "ピックルボール施設向けの予約管理システム。コートの空き確認と予約確定、会員管理、大会エントリーの受付までを公式LINE上のAIが自動化。急成長する競技の運営を支えます。",
  keywords: "ピックルボール 予約管理,コート予約 システム,大会エントリー 受付,スポーツ施設 予約,会員管理",
  alternates: { canonical: `${SITE.url}/solutions/pickleball` },
  openGraph: {
    title: "ピックルボール施設の予約管理システム｜コート予約・大会エントリーをLINEで | LINX",
    description: "ピックルボール施設向けの予約管理システム。コートの空き確認と予約確定、会員管理、大会エントリーの受付までを公式LINE上のAIが自動化。急成長する競技の運営を支えます。",
    url: `${SITE.url}/solutions/pickleball`,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
    images: [{ url: data.heroImage, width: 1200, height: 630, alt: `${data.name}向けの予約・会員管理システム LINX` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ピックルボール施設の予約管理システム｜コート予約・大会エントリーをLINEで | LINX",
    description: "ピックルボール施設向けの予約管理システム。コートの空き確認と予約確定、会員管理、大会エントリーの受付までを公式LINE上のAIが自動化。急成長する競技の運営を支えます。",
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
              item: `${SITE.url}/solutions/pickleball`,
            },
          ],
        }}
      />
      <IndustryLP data={data} />
    </>
  );
}
