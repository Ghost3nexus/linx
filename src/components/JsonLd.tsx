/** 構造化データを1か所で組み立てる。虚偽の値（存在しないレビュー等）は絶対に入れないこと */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
