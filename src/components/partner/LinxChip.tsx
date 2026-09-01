"use client";

/** LINX を「店舗を動かすチップ」として描く。画像ではなくSVGなので拡大しても崩れない */
export default function LinxChip({ className = "" }: { className?: string }) {
  const pins = Array.from({ length: 7 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="店舗を動かすOS、LINX"
    >
      <defs>
        <linearGradient id="chipBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#23262D" />
          <stop offset="55%" stopColor="#15171C" />
          <stop offset="100%" stopColor="#0D0F13" />
        </linearGradient>
        <linearGradient id="chipEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06C755" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#06C755" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06C755" stopOpacity="0.7" />
        </linearGradient>
        <filter id="chipGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 背後の光 */}
      <rect x="34" y="34" width="132" height="132" rx="26" fill="#06C755" opacity="0.16" filter="url(#chipGlow)" />

      {/* ピン */}
      <g fill="#06C755" opacity="0.55">
        {pins.map((i) => {
          const p = 46 + i * 18;
          return (
            <g key={i}>
              <rect x={p} y="22" width="7" height="14" rx="2.5" />
              <rect x={p} y="164" width="7" height="14" rx="2.5" />
              <rect x="22" y={p} width="14" height="7" rx="2.5" />
              <rect x="164" y={p} width="14" height="7" rx="2.5" />
            </g>
          );
        })}
      </g>

      {/* 本体 */}
      <rect x="36" y="36" width="128" height="128" rx="24" fill="url(#chipBody)" />
      <rect
        x="36.75"
        y="36.75"
        width="126.5"
        height="126.5"
        rx="23.25"
        fill="none"
        stroke="url(#chipEdge)"
        strokeWidth="1.5"
      />

      {/* 内側の配線 */}
      <g stroke="#06C755" strokeOpacity="0.3" strokeWidth="1" fill="none">
        <rect x="54" y="54" width="92" height="92" rx="14" />
        <path d="M100 54 V 42 M100 146 V 158 M54 100 H 42 M146 100 H 158" strokeOpacity="0.45" />
      </g>

      {/* ワードマーク */}
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="30"
        fontWeight="800"
        letterSpacing="1.5"
        fontFamily="Inter, system-ui, sans-serif"
      >
        LIN<tspan fill="#06C755">X</tspan>
      </text>
      <text
        x="100"
        y="126"
        textAnchor="middle"
        fill="#FFFFFF"
        fillOpacity="0.42"
        fontSize="8.5"
        letterSpacing="2.6"
        fontFamily="Inter, system-ui, sans-serif"
      >
        STORE AI OS
      </text>
    </svg>
  );
}
