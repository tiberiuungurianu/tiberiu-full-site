"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery } from "@/content/gallery";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { cx } from "@/lib/utils";

type ShotLayout = {
  wrap: string;
  frame: string;
  sizes: string;
};

const layouts: Record<string, ShotLayout> = {
  beauty: {
    wrap: "md:col-span-9 md:row-span-2 md:-ml-[6vw] md:w-[calc(100%+6vw)]",
    frame: "aspect-[3/4] md:min-h-[80vh] md:aspect-auto",
    sizes: "(max-width: 759px) 100vw, 68vw",
  },
  roots: {
    wrap: "md:col-span-4 md:col-start-9 md:mt-[22vh] md:-ml-8",
    frame: "aspect-[3/4] md:rotate-[-2deg]",
    sizes: "(max-width: 759px) 100vw, 28vw",
  },
  fashion: {
    wrap: "md:col-span-5 md:col-start-1 md:-mt-32 md:ml-[8%]",
    frame: "aspect-[4/5]",
    sizes: "(max-width: 759px) 100vw, 36vw",
  },
  closeup: {
    wrap: "md:col-span-5 md:col-start-7 md:mt-6 md:translate-x-[14%]",
    frame: "aspect-square md:aspect-[4/5]",
    sizes: "(max-width: 759px) 100vw, 34vw",
  },
  campaign: {
    wrap: "md:col-span-12 md:mt-4 md:-mx-[var(--pad)] md:w-[calc(100%+2*var(--pad))]",
    frame: "aspect-[16/10] md:aspect-[24/9]",
    sizes: "100vw",
  },
}

export function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  function openAt(index: number) {
    restoreFocusRef.current = triggerRefs.current[index] ?? null;
    setActiveIndex(index);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-x-4 md:gap-y-0">
        {gallery.map((item, index) => {
          const layout = layouts[item.id] ?? {
            wrap: "md:col-span-6",
            frame: "aspect-[4/5]",
            sizes: "(max-width: 759px) 100vw, 40vw",
          };

          return (
            <Reveal
              key={item.id}
              delay={Math.min(index * 0.05, 0.2)}
              className={cx("group relative", layout.wrap)}
            >
              <figure className="m-0">
                <button
                  ref={(node) => {
                    triggerRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => openAt(index)}
                  className={cx(
                    "relative block w-full overflow-hidden bg-[var(--ink-soft)] text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]",
                    layout.frame
                  )}
                  aria-label={`Open ${item.caption} image`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes={layout.sizes}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                    priority={index === 0}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-3 font-[family-name:var(--font-display)] text-[clamp(40px,6vw,72px)] font-black leading-none tracking-[-0.04em] text-[var(--paper)]/90 mix-blend-difference"
                  >
                    {item.index}
                  </span>
                </button>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="font-[family-name:var(--font-editorial)] text-[clamp(18px,2vw,24px)] italic leading-none text-[var(--paper)]">
                    {item.caption}
                  </span>
                  <span className="kicker opacity-60 transition-opacity duration-300 motion-safe:group-hover:opacity-100 max-md:hidden">
                    View frame
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>

      <GalleryLightbox
        items={gallery}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
        restoreFocusRef={restoreFocusRef}
      />
    </>
  );
}
