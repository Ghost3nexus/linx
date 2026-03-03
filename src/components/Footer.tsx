export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-sub">
          <span className="text-text font-bold">
            LIN<span className="text-primary">X</span>
          </span>
          <span className="ml-2">by TomorrowProof</span>
        </div>

        <nav className="flex gap-6 text-sm text-sub">
          <a href="#" className="hover:text-text transition-colors">
            利用規約
          </a>
          <a href="#" className="hover:text-text transition-colors">
            プライバシーポリシー
          </a>
          <a href="#" className="hover:text-text transition-colors">
            お問い合わせ
          </a>
        </nav>

        <p className="text-xs text-sub">
          &copy; 2026 TomorrowProof Inc.
        </p>
      </div>
    </footer>
  );
}
