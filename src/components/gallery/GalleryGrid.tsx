"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery } from "@/content/gallery";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { cx } from "@/lib/utils";

const layoutClass: Record<string, string> = {
  beauty: "md:col-span-7 md:row-span-2",
  roots: "md:col-span-5 md:mt-10",
  fashion: "md:col-span-5 md:-mt-20 md:ml-[8%]",
  closeup: "md:col-span-4 md:-mt-6",
  campaign: "md:col-span-8 md:translate-x-[6%] md:mt-4",
};

const cueLabel: Record<string, string> = {
  beauty: "open big",
  roots: "zoom",
  fashion: "look",
  closeup: "closer",
  campaign: "full frame",
};

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
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-x-4 md:gap-y-16">
        {gallery.map((item, index) => (
          <Reveal
            key={item.id}
            delay={Math.min(index * 0.05, 0.2)}
            className={cx("group", layoutClass[item.id] ?? "md:col-span-6")}
          >
            <figure className="m-0">
              <button
                ref={(node) => {
                  triggerRefs.current[index] = node;
                }}
                type="button"
                onClick={() => openAt(index)}
                className={cx(
                  "shot-frame relative block w-full overflow-hidden bg-[var(--charcoal)] text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]",
                  item.featured ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[4/5]"
                )}
                aria-label={`Open ${item.caption} image`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes={
                    item.featured
                      ? "(max-width: 759px) 100vw, 48vw"
                      : "(max-width: 759px) 100vw, 38vw"
                  }
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ objectPosition: item.objectPosition ?? "50% 25%" }}
                  priority={index === 0}
                />
                <span className="shot-cue pointer-events-none absolute bottom-3 right-3 stamp bg-[var(--black)]/75 opacity-0 translate-x-2 transition-all duration-300 max-md:hidden">
                  {cueLabel[item.id] ?? "view"}
                </span>
              </button>
              <figcaption
                className={cx(
                  "mt-3 flex items-baseline justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]",
                  index % 2 === 1 ? "md:flex-row-reverse md:text-right" : undefined
                )}
              >
                <span>
                  {item.index} / {item.caption}
                </span>
                <span className="normal-case tracking-normal font-[family-name:var(--font-editorial)] italic font-normal text-[var(--steel)] opacity-80">
                  frame {item.index}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
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
