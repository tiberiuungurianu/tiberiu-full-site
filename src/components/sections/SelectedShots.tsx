import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function SelectedShots() {
  const { selected } = site;

  return (
    <section id="selected" data-theme="dark" aria-label="Editorial" className="bg-[var(--bg)]">
      <div className="shell section-pad">
        <div className="mb-8 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          <span>03 / Editorial</span>
          <span>{selected.locale}</span>
        </div>

        <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.1fr_0.7fr] md:items-end">
          <Reveal>
            <p className="eyebrow">{selected.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line">{selected.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[28ch] justify-self-start text-[15px] leading-[1.55] text-[var(--muted)] md:justify-self-end md:text-right">
              {selected.intro}
            </p>
          </Reveal>
        </header>

        <GalleryGrid />

        <Reveal delay={0.08} className="mt-14 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--line)] pt-5 text-[13px] text-[var(--muted)]">
          <p className="m-0 max-w-[36ch] leading-[1.5]">{selected.meta}</p>
          <p className="m-0 uppercase tracking-[0.14em]">{selected.locale}</p>
        </Reveal>
      </div>
    </section>
  );
}
