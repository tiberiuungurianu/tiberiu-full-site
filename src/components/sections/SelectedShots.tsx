import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function SelectedShots() {
  const { selected } = site;

  return (
    <section
      id="selected"
      data-theme="dark"
      aria-label="Editorial"
      className="relative overflow-hidden bg-[var(--black)]"
    >
      <div
        aria-hidden="true"
        className="ghost-mark absolute -left-6 top-[18%] text-[clamp(140px,32vw,380px)]"
      >
        SHOTS
      </div>

      <div className="shell section-pad relative">
        <div className="mb-8 flex items-center justify-between gap-4 section-index">
          <span>03 / Editorial</span>
          <span>{selected.locale}</span>
        </div>

        <header className="mb-12 grid gap-6 md:mb-20 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <Reveal>
            <p className="eyebrow">{selected.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line">{selected.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[26ch] justify-self-start font-[family-name:var(--font-editorial)] text-[clamp(18px,2vw,24px)] italic leading-[1.35] text-[var(--steel)] md:justify-self-end md:text-right md:translate-y-3">
              {selected.intro}
            </p>
          </Reveal>
        </header>

        <GalleryGrid />

        <Reveal
          delay={0.08}
          className="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--line)] pt-5 text-[13px] text-[var(--muted)]"
        >
          <p className="m-0 max-w-[28ch] font-[family-name:var(--font-editorial)] italic text-[clamp(16px,1.6vw,20px)] text-[var(--text)]">
            {selected.meta}
          </p>
          <p className="m-0 font-semibold uppercase tracking-[0.16em]">{selected.locale}</p>
        </Reveal>
      </div>
    </section>
  );
}
