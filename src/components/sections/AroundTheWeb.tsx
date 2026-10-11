import { site } from "@/content/site";
import { visibleLinks } from "@/content/links";
import { Reveal } from "@/components/motion/Reveal";

export function AroundTheWeb() {
  const { around } = site;
  const links = visibleLinks();

  return (
    <section
      id="links"
      data-theme="light"
      aria-label="Index"
      className="bg-[var(--ivory)] text-[var(--text-on-light)]"
    >
      <div className="shell section-pad">
        <div className="mb-8 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-on-light)]">
          <span>04 / Index</span>
          <span>Online</span>
        </div>

        <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_0.7fr] md:items-end">
          <Reveal>
            <p className="eyebrow !text-[var(--muted-on-light)]">{around.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line !text-[var(--text-on-light)]">
              {around.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="m-0 max-w-[28ch] text-[15px] leading-[1.55] text-[var(--muted-on-light)] md:justify-self-end md:text-right">
              {around.intro}
            </p>
          </Reveal>
        </header>

        <ul className="m-0 grid list-none gap-0 border-t border-[var(--line-on-light)] p-0">
          {links.map((link, index) => (
            <li key={link.href} className="border-b border-[var(--line-on-light)]">
              <Reveal delay={Math.min(index * 0.03, 0.18)}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-14 items-baseline justify-between gap-4 py-[clamp(18px,2.8vw,28px)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#111]"
                >
                  <span className="flex min-w-0 items-baseline gap-4 md:gap-6">
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-on-light)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="interactive-shift font-[family-name:var(--font-display)] text-[clamp(32px,7vw,72px)] font-semibold leading-[0.92] tracking-[-0.045em] uppercase">
                      {link.label}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-baseline gap-5 text-[12px] uppercase tracking-[0.14em] text-[var(--muted-on-light)]">
                    <span className="hidden sm:inline">{link.detail}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
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
