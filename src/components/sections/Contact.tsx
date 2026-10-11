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
      className="relative overflow-hidden bg-[var(--oxblood-deep)] text-[var(--paper)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] top-[12%] font-[family-name:var(--font-display)] text-[clamp(160px,38vw,420px)] font-black leading-none tracking-[-0.05em] text-[var(--paper)]/[0.06] select-none"
      >
        @
      </div>

      <div className="shell pt-[calc(var(--header-h)+10px)]">
        <div className="flex items-center justify-between gap-4 border-b border-[rgba(242,235,224,0.2)] pb-3">
          <p className="kicker text-[var(--paper)]/70">05 — Contact</p>
          <p className="kicker text-[var(--paper)]/70">Closing page</p>
        </div>
      </div>

      <div className="shell flex min-h-[88svh] flex-col justify-between pb-[clamp(48px,8vw,96px)] pt-10 md:pt-14">
        <div>
          <Reveal>
            <p className="kicker mb-5 text-[var(--paper)]/65">{contact.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line max-w-[9ch] text-[var(--paper)]">
              {contact.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[28ch] font-[family-name:var(--font-editorial)] text-[clamp(18px,2.2vw,26px)] italic leading-[1.3] text-[var(--paper)]/80">
              {contact.copy}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href={linksContent.email.href}
              className="mt-12 inline-block max-w-full break-all font-[family-name:var(--font-display)] text-[clamp(36px,8vw,96px)] font-black leading-[0.9] tracking-[-0.035em] uppercase text-[var(--paper)] underline decoration-[var(--paper)]/35 decoration-2 underline-offset-[0.18em] transition-colors duration-300 hover:decoration-[var(--paper)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-6 focus-visible:outline-[var(--paper)]"
            >
              {linksContent.email.label}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-24">
          <footer className="grid gap-6 border-t border-[rgba(242,235,224,0.2)] pt-6 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <span className="kicker text-[var(--paper)]/70">{name}</span>
              <span className="kicker text-[var(--paper)]/70">{city}</span>
              <span className="kicker text-[var(--paper)]/70">{code}</span>
            </div>
            <p className="m-0 max-w-[40ch] font-[family-name:var(--font-editorial)] text-[clamp(15px,1.5vw,19px)] italic leading-[1.45] text-[var(--paper)]/75">
              {contact.note}
            </p>
            <span className="kicker text-[var(--paper)]/70">© {year}</span>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
