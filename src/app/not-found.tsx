import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell section-pad" style={{ minHeight: "100svh" }}>
      <p className="eyebrow">404</p>
      <h1 className="display-title">Page not found.</h1>
      <p className="phase-note">This chapter does not exist.</p>
      <p style={{ marginTop: 32 }}>
        <Link href="/" style={{ borderBottom: "1px solid var(--line)" }}>
          Back to cover
        </Link>
      </p>
    </main>
  );
}
