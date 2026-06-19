import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="notfound__inner">
        <span className="notfound__code">404</span>
        <span className="notfound__note">Lost</span>
        <p className="notfound__text">
          This page wandered off. Let&rsquo;s get you back.
        </p>
        <Link href="/" className="notfound__link">
          ← Home
        </Link>
      </div>
    </main>
  );
}
