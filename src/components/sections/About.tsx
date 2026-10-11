import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const { about, code, city } = site;

  return (
    <section
      id="about"
      data-theme="dark"
      aria-label="Profile"
      className="relative overflow-hidden bg-[var(--charcoal)] text-[var(--text)]"
    >
      <div
        aria-hidden="true"
        className="ghost-mark absolute -right-4 top-10 text-[clamp(120px,28vw,340px)] md:top-16"
      >
        02
      </div>

      <div className="shell section-pad relative">
        <div className="mb-10 flex items-center justify-between gap-4 section-index">
          <span>02 / Profile</span>
          <span>
            {code} / {city}
          </span>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,1.05fr)] lg:gap-8 xl:gap-4">
          <div className="relative z-10 lg:pt-8">
            <Reveal>
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 className="display-title max-w-[9ch]">
                {about.title}{" "}
                <span className="soft block mt-1 text-[clamp(28px,4vw,48px)] text-[var(--steel)]">
                  {about.titleSoft}
                </span>
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 md:mt-10 md:max-w-[36ch]">
              {about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 + index * 0.06}>
                  <p
                    className={`editorial-copy m-0 ${
                      index === 1 ? "text-[var(--muted)] md:ml-8" : "text-[var(--text)]"
                    }`}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={0.2}
              className="mt-12 max-w-[32ch] border-l-2 border-l-[var(--gunmetal)] pl-4 pt-1"
            >
              <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {about.agency.label}
              </p>
              <p className="mt-2 text-[15px] leading-[1.45] text-[var(--text)]">{about.agency.value}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative z-0 lg:-mt-6 lg:sticky lg:top-[calc(var(--header-h)+12px)]">
            <figure className="m-0 lg:-mr-6 xl:-mr-10">
              <div className="relative overflow-hidden bg-[var(--black)] aspect-[4/5] md:aspect-[3/4]">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  width={about.portrait.width}
                  height={about.portrait.height}
                  sizes="(max-width: 900px) 92vw, 48vw"
                  className="h-full w-full object-cover object-[58%_20%] scale-[1.08]"
                />
                <span className="stamp absolute bottom-4 left-4 rotate-[-3deg] bg-[var(--black)]/70 backdrop-blur-[2px]">
                  {about.portraitCaption}
                </span>
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                <span>Cut tight on purpose</span>
                <span>London</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
