import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header container">
      <Link href="/" className="wordmark">
        Politics of the Planet
      </Link>
      <nav>
        <Link href="/">Writing</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
