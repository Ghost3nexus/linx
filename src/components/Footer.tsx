export default function Footer() {
  return (
    <footer
      className="border-t border-[#1A1A2E] py-10 px-6 mb-16 md:mb-0"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2.5rem)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-[14px] text-[#6B7280]">
          <span className="text-white font-bold text-[16px]">
            LIN<span className="text-[#06C755]">X</span>
          </span>
          <span className="ml-3">by TomorrowProof</span>
        </div>

        <nav className="flex gap-6 text-[14px] text-[#6B7280]">
          <a href="#" className="hover:text-white transition-colors touch-manipulation">
            利用規約
          </a>
          <a href="#" className="hover:text-white transition-colors touch-manipulation">
            プライバシーポリシー
          </a>
          <a
            href="https://calendar.app.google/AJXwDSRvDQEWTxjb7"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors touch-manipulation"
          >
            お問い合わせ
          </a>
        </nav>

        <p className="text-[13px] text-[#4B5563]">
          &copy; 2026 TomorrowProof Inc.
        </p>
      </div>
    </footer>
  );
}
