import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function SelectedShots() {
  const { selected } = site;

  return (
    <section id="selected" data-theme="dark" aria-label="Editorial" className="bg-[var(--ink)]">
      <div className="shell pt-[calc(var(--header-h)+10px)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3">
          <p className="kicker">03 — Editorial</p>
          <p className="kicker">{selected.locale}</p>
        </div>
      </div>

      <div className="shell section-pad pt-12 md:pt-16">
        <header className="relative mb-16 md:mb-24">
          <Reveal>
            <p className="kicker mb-4 text-[var(--oxblood-bright)]">{selected.eyebrow}</p>
            <h2 className="display-title whitespace-pre-line max-w-[9ch] text-[var(--paper)]">
              {selected.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[22ch] font-[family-name:var(--font-editorial)] text-[clamp(20px,2.6vw,30px)] italic leading-[1.2] text-[var(--paper)]/80 md:absolute md:right-0 md:top-8 md:mt-0 md:text-right">
              {selected.intro}
            </p>
          </Reveal>
        </header>

        <GalleryGrid />

        <Reveal delay={0.08} className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--line)] pt-5">
          <p className="m-0 max-w-[36ch] font-[family-name:var(--font-editorial)] text-[clamp(16px,1.6vw,20px)] italic leading-[1.4] text-[var(--smoke)]">
            {selected.meta}
          </p>
          <p className="kicker m-0">{selected.locale}</p>
        </Reveal>
      </div>
    </section>
  );
}
