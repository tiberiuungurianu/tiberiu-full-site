import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell section-pad min-h-[100svh] bg-[var(--ink)] text-[var(--paper)]">
      <p className="kicker">404</p>
      <h1 className="display-title mt-4">Page not found.</h1>
      <p className="mt-6 max-w-[28ch] font-[family-name:var(--font-editorial)] text-[clamp(18px,2vw,24px)] italic text-[var(--smoke)]">
        This chapter does not exist.
      </p>
      <p className="mt-10">
        <Link
          href="/"
          className="kicker border-b border-[var(--line)] pb-1 text-[var(--paper)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
        >
          Back to cover
        </Link>
      </p>
    </main>
  );
}
