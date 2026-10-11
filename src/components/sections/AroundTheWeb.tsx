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
      data-theme="light"
      aria-label="Index"
      className="bg-[var(--paper)] text-[var(--text-on-light)]"
    >
      <div className="shell pt-[calc(var(--header-h)+10px)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--line-on-light)] pb-3">
          <p className="kicker !text-[var(--smoke-on-light)]">04 — Index</p>
          <p className="kicker !text-[var(--smoke-on-light)]">Online presence</p>
        </div>
      </div>

      <div className="shell section-pad pt-12 md:pt-16">
        <header className="mb-14 max-w-[16ch] md:mb-20">
          <Reveal>
            <p className="kicker mb-4 !text-[var(--oxblood)]">{around.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line !text-[var(--ink)]">
              {around.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 font-[family-name:var(--font-editorial)] text-[clamp(18px,2.2vw,26px)] italic leading-[1.25] text-[var(--ink)]/75">
              {around.intro}
            </p>
          </Reveal>
        </header>

        <ul className="m-0 grid list-none gap-0 p-0">
          {links.map((link, index) => {
            const odd = index % 2 === 1;
            return (
              <li key={link.href}>
                <Reveal delay={Math.min(index * 0.03, 0.18)}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx(
                      "group grid items-end gap-2 border-t border-[var(--line-on-light)] py-[clamp(22px,3.4vw,40px)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#0c0b0a] md:grid-cols-[auto_1fr_auto]",
                      odd ? "md:pl-[12%]" : "md:pr-[8%]"
                    )}
                  >
                    <span className="kicker !text-[var(--smoke-on-light)] md:pb-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cx(
                        "type-nudge font-[family-name:var(--font-display)] font-black uppercase leading-[0.85] tracking-[-0.035em] text-[var(--ink)]",
                        index % 3 === 0
                          ? "text-[clamp(48px,9vw,110px)]"
                          : index % 3 === 1
                            ? "text-[clamp(40px,7vw,84px)]"
                            : "text-[clamp(36px,6vw,72px)]"
                      )}
                    >
                      {link.label}
                    </span>
                    <span className="flex items-baseline justify-between gap-4 md:justify-end md:pb-2">
                      <span className="font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] text-[var(--smoke-on-light)]">
                        {link.detail ?? "↗"}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-[var(--oxblood)] transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
