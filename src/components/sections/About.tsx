import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const { about, code, city, personName } = site;
  const [lead, ...rest] = about.paragraphs;

  return (
    <section
      id="about"
      data-theme="light"
      aria-label="Profile"
      className="relative overflow-hidden bg-[var(--newsprint)] text-[var(--text-on-light)]"
    >
      {/* Running magazine folio */}
      <div className="shell pt-[calc(var(--header-h)+10px)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--line-on-light)] pb-3">
          <p className="kicker !text-[var(--smoke-on-light)]">02 — Profile</p>
          <p className="kicker !text-[var(--smoke-on-light)]">
            {personName}
          </p>
          <p className="kicker !text-[var(--smoke-on-light)] max-sm:hidden">
            {code} / {city}
          </p>
        </div>
      </div>

      <div className="relative section-pad pt-10 md:pt-14">
        <div className="grid items-start gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Bleeding portrait column */}
          <Reveal className="relative lg:sticky lg:top-[calc(var(--header-h)+16px)]">
            <figure className="m-0">
              <div className="relative -ml-[var(--pad)] w-[calc(100%+var(--pad))] overflow-hidden bg-[var(--newsprint-warm)] sm:w-[calc(100%+var(--pad)+4vw)] lg:-ml-[max(var(--pad),calc((100vw-var(--max))/2+var(--pad)))] lg:w-[calc(100%+max(var(--pad),calc((100vw-var(--max))/2+var(--pad))))]">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  width={about.portrait.width}
                  height={about.portrait.height}
                  sizes="(max-width: 1024px) 92vw, 48vw"
                  className="aspect-[4/5] h-auto w-full object-cover object-[50%_18%] sm:aspect-[3/4]"
                  priority
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 left-4 font-[family-name:var(--font-display)] text-[clamp(72px,14vw,160px)] font-black leading-none tracking-[-0.04em] text-[var(--paper)]/25 mix-blend-difference sm:bottom-6 sm:left-6"
                >
                  20
                </div>
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-[var(--pad)] lg:px-0 lg:pl-[max(0px,calc((100vw-var(--max))/2+var(--pad)-0px))]">
                <span className="kicker !text-[var(--smoke-on-light)]">Portrait study</span>
                <span className="kicker !text-[var(--smoke-on-light)]">London</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Editorial text column */}
          <div className="shell mt-12 lg:mt-0 lg:pl-10 xl:pl-16">
            <Reveal>
              <p className="kicker mb-5 !text-[var(--oxblood)]">{about.eyebrow}</p>
              <h2 className="visually-hidden">{about.title}</h2>
              <p className="pull-quote max-w-[14ch] text-[var(--ink)]">{lead}</p>
            </Reveal>

            <div className="mt-10 grid gap-6 border-l-2 border-[var(--oxblood)] pl-5 md:mt-12 md:pl-7">
              {rest.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.08 + index * 0.06}>
                  <p className="editorial-copy max-w-[32ch] text-[var(--ink)]/85">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.18} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8">
              {about.notes.map((note) => (
                <div key={note.label} className="relative">
                  <p className="kicker mb-2 !text-[var(--smoke-on-light)]">{note.label}</p>
                  <p className="m-0 font-[family-name:var(--font-display)] text-[clamp(48px,8vw,88px)] font-black leading-[0.85] tracking-[-0.04em] text-[var(--ink)]">
                    {note.value}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.24} className="mt-12 max-w-[34ch]">
              <p className="kicker mb-2 !text-[var(--smoke-on-light)]">{about.agency.label}</p>
              <p className="m-0 font-[family-name:var(--font-editorial)] text-[clamp(17px,1.8vw,21px)] italic leading-[1.35] text-[var(--ink)]">
                {about.agency.value}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
