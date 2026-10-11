import { site } from "@/content/site";
import { linksContent } from "@/content/links";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const { contact, name, city, code } = site;
  const year = new Date().getFullYear();

  return (
    <section id="contact" data-theme="dark" aria-label="Contact" className="bg-[var(--bg)]">
      <div className="shell section-pad min-h-[85svh] flex flex-col justify-between">
        <div>
          <div className="mb-8 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>05 / Contact</span>
            <span>Closing page</span>
          </div>

          <Reveal>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line max-w-[10ch]">
              {contact.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[34ch] text-[clamp(16px,1.8vw,19px)] leading-[1.55] text-[var(--muted)]">
              {contact.copy}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href={linksContent.email.href}
              className="mt-10 inline-block max-w-full break-all font-[family-name:var(--font-display)] text-[clamp(40px,9vw,120px)] font-semibold leading-[0.92] tracking-[-0.05em] border-b border-[var(--line)] pb-2 transition-opacity duration-300 hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-6 focus-visible:outline-[var(--ivory)]"
            >
              {linksContent.email.label}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-20">
          <footer className="grid gap-5 border-t border-[var(--line)] pt-6 text-[12px] uppercase tracking-[0.14em] text-[var(--muted)] md:grid-cols-[1fr_1.2fr_auto] md:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>{name}</span>
              <span>{city}</span>
              <span>{code}</span>
            </div>
            <p className="m-0 max-w-[38ch] normal-case tracking-normal leading-[1.5] font-[family-name:var(--font-editorial)] italic text-[clamp(15px,1.5vw,18px)] text-[rgba(242,239,233,0.78)]">
              {contact.note}
            </p>
            <span>© {year}</span>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
