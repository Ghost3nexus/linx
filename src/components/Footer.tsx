export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A2E] py-8 sm:py-10 px-5 sm:px-6" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 2rem)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="text-sm text-[#6B7280]">
          <span className="text-[#FAFAFA] font-bold">
            LIN<span className="text-[#06C755]">X</span>
          </span>
          <span className="ml-2">by TomorrowProof</span>
        </div>

        <nav className="flex gap-5 sm:gap-6 text-xs sm:text-sm text-[#6B7280]">
          <a href="#" className="hover:text-[#FAFAFA] transition-colors touch-manipulation">
            利用規約
          </a>
          <a href="#" className="hover:text-[#FAFAFA] transition-colors touch-manipulation">
            プライバシーポリシー
          </a>
          <a href="#" className="hover:text-[#FAFAFA] transition-colors touch-manipulation">
            お問い合わせ
          </a>
        </nav>

        <p className="text-xs text-[#6B7280]">
          &copy; 2026 TomorrowProof Inc.
        </p>
      </div>
    </footer>
  );
}
