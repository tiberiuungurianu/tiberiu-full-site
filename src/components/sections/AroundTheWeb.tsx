import { site } from "@/content/site";
import { visibleLinks } from "@/content/links";
import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/lib/utils";

export function AroundTheWeb() {
  const { around } = site;
  const links = visibleLinks();

  return (
    <section
      id="links"
      data-theme="dark"
      aria-label="Index"
      className="relative overflow-hidden bg-[var(--charcoal)] text-[var(--text)]"
    >
      <div
        aria-hidden="true"
        className="ghost-mark absolute right-0 bottom-10 text-[clamp(100px,22vw,260px)]"
      >
        WWW
      </div>

      <div className="shell section-pad relative">
        <div className="mb-8 flex items-center justify-between gap-4 section-index">
          <span>04 / Index</span>
          <span>Pick a door</span>
        </div>

        <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_0.7fr] md:items-end">
          <Reveal>
            <p className="eyebrow">{around.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line">{around.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="m-0 max-w-[26ch] font-[family-name:var(--font-editorial)] text-[clamp(17px,1.8vw,22px)] italic leading-[1.4] text-[var(--steel)] md:justify-self-end md:text-right md:rotate-[-1deg]">
              {around.intro}
            </p>
          </Reveal>
        </header>

        <ul className="m-0 grid list-none gap-0 border-t border-[var(--line)] p-0">
          {links.map((link, index) => (
            <li key={link.href} className="border-b border-[var(--line)]">
              <Reveal delay={Math.min(index * 0.03, 0.18)}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    "group flex min-h-14 items-baseline justify-between gap-4 py-[clamp(18px,2.8vw,30px)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]",
                    index % 2 === 1 ? "md:pl-10 lg:pl-16" : undefined
                  )}
                >
                  <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
                    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--text)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="interactive-shift ink-link font-[family-name:var(--font-display)] text-[clamp(34px,8vw,84px)] font-bold leading-[0.86] tracking-[-0.055em] uppercase">
                      {link.label}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-baseline gap-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    <span className="hidden sm:inline transition-opacity duration-300 group-hover:opacity-40">
                      {link.detail}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-safe:group-hover:translate-x-2 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-12"
                    >
                      ↗
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
