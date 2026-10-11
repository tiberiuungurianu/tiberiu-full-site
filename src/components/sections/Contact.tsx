import { site } from "@/content/site";
import { linksContent } from "@/content/links";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const { contact, name, city, code } = site;
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      data-theme="dark"
      aria-label="Contact"
      className="relative overflow-hidden bg-[var(--black)]"
    >
      <div
        aria-hidden="true"
        className="ghost-mark absolute -bottom-8 left-1/2 -translate-x-1/2 text-[clamp(120px,28vw,320px)]"
      >
        MAIL
      </div>

      <div className="shell section-pad relative min-h-[85svh] flex flex-col justify-between">
        <div>
          <div className="mb-8 flex items-center justify-between gap-4 section-index">
            <span>05 / Contact</span>
            <span className="stamp rotate-2">Last page</span>
          </div>

          <Reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line max-w-[11ch]">
              {contact.title}
              <span className="soft mt-2 block text-[clamp(28px,4.5vw,52px)] text-[var(--steel)]">
                {contact.titleAlt}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[34ch] text-[clamp(16px,1.8vw,20px)] leading-[1.5] text-[var(--muted)]">
              {contact.copy}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--steel)]">
              {contact.ctaHint}
            </p>
            <a
              href={linksContent.email.href}
              className="ink-link inline-block max-w-full break-all font-[family-name:var(--font-display)] text-[clamp(36px,9.5vw,118px)] font-bold leading-[0.86] tracking-[-0.06em] border-b-2 border-[var(--gunmetal)] pb-2 hover:border-[var(--text)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-6 focus-visible:outline-[var(--text)]"
            >
              {linksContent.email.label}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-20">
          <footer className="border-t border-[var(--line)] pt-6 text-[12px] uppercase tracking-[0.14em] text-[var(--muted)]">
            <p className="m-0 max-w-[40ch] normal-case tracking-normal leading-[1.5] font-[family-name:var(--font-editorial)] italic text-[clamp(16px,1.6vw,20px)] text-[var(--text)]">
              {contact.note}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-semibold">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span>{name}</span>
                <span>{city}</span>
                <span>{code}</span>
              </div>
              <span>© {year}</span>
            </div>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
