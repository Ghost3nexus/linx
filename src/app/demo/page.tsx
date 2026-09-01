import type { Metadata } from "next";
import DemoEntry from "./DemoEntry";

export const metadata: Metadata = {
  title: "LINX 管理画面デモ",
  description: "ログイン不要で、LINXの管理画面をそのままご覧いただけます。表示しているデータはサンプルです。",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoEntry />;
}
