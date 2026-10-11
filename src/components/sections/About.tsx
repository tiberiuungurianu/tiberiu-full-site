import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const { about, code, city } = site;

  return (
    <section
      id="about"
      data-theme="light"
      aria-label="Profile"
      className="bg-[var(--ivory)] text-[var(--text-on-light)]"
    >
      <div className="shell section-pad">
        <div className="mb-10 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-on-light)]">
          <span>02 / Profile</span>
          <span>
            {code} / {city}
          </span>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow !text-[var(--muted-on-light)]">{about.eyebrow}</p>
              <h2 className="display-title max-w-[8ch] !text-[var(--text-on-light)]">
                {about.title}
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 md:mt-10">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 + index * 0.06}>
                  <p
                    className={`editorial-copy m-0 max-w-[34ch] text-[var(--text-on-light)] ${
                      index === 1 ? "text-[rgba(17,17,17,0.72)]" : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-12 grid gap-6 border-t border-[var(--line-on-light)] pt-7 sm:grid-cols-2">
              {about.notes.map((note) => (
                <div key={note.label}>
                  <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-on-light)]">
                    {note.label}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.03em]">
                    {note.value}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.28} className="mt-8 max-w-[30ch]">
              <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-on-light)]">
                {about.agency.label}
              </p>
              <p className="mt-2 text-[15px] leading-[1.45]">{about.agency.value}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <figure className="m-0">
              <div className="overflow-hidden bg-[rgba(17,17,17,0.04)]">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  width={about.portrait.width}
                  height={about.portrait.height}
                  sizes="(max-width: 900px) 86vw, 34vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-on-light)]">
                <span>Portrait</span>
                <span>London</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
