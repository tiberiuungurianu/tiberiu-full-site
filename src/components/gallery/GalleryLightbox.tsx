"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { GalleryItem } from "@/content/gallery";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { durationFor, easeEditorial, motionDuration } from "@/lib/motion";

type GalleryLightboxProps = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
  restoreFocusRef: React.RefObject<HTMLElement | null>;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onChange,
  restoreFocusRef,
}: GalleryLightboxProps) {
  const open = index !== null;
  const item = index === null ? null : items[index];
  const reduceMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const touchStartX = useRef<number | null>(null);
  const indexRef = useRef(index);
  const itemsLengthRef = useRef(items.length);

  indexRef.current = index;
  itemsLengthRef.current = items.length;

  const go = useCallback(
    (direction: -1 | 1) => {
      const current = indexRef.current;
      const total = itemsLengthRef.current;
      if (current === null || !total) return;
      onChange((current + direction + total) % total);
    },
    [onChange]
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const restoreTarget = restoreFocusRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      restoreTarget?.focus({ preventScroll: true });
    };
  }, [open, restoreFocusRef]);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;

    function focusables() {
      if (!dialog) return [] as HTMLElement[];
      return Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        )
      );
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }

      if (event.key !== "Tab") return;

      const controls = focusables();
      if (!controls.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === first || !dialog?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, go]);

  const duration = durationFor(reduceMotion, motionDuration.lightbox);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          ref={dialogRef}
          className="surface-lightbox fixed inset-0 z-[100] flex flex-col text-[var(--text)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: easeEditorial }}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
            const delta = endX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < 56) return;
            go(delta < 0 ? 1 : -1);
          }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between pt-[env(safe-area-inset-top)]">
            <p id={titleId} className="m-0 text-[12px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {item.index} / {item.caption}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="min-h-11 px-1 text-[13px] uppercase tracking-[0.16em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]"
            >
              Close
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--pad)] pb-[max(24px,env(safe-area-inset-bottom))]">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-[max(12px,env(safe-area-inset-left))] top-1/2 z-10 hidden min-h-12 min-w-12 -translate-y-1/2 items-center justify-center text-[28px] text-[var(--text)]/80 hover:text-[var(--text)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)] md:flex"
            >
              ←
            </button>

            <motion.div
              key={item.id}
              className="relative h-[min(78svh,900px)] w-full max-w-[920px]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: durationFor(reduceMotion, 0.34),
                ease: easeEditorial,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 920px) 92vw, 920px"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-[max(12px,env(safe-area-inset-right))] top-1/2 z-10 hidden min-h-12 min-w-12 -translate-y-1/2 items-center justify-center text-[28px] text-[var(--text)]/80 hover:text-[var(--text)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)] md:flex"
            >
              →
            </button>
          </div>

          <div className="shell flex items-center justify-between gap-4 pb-[max(20px,env(safe-area-inset-bottom))] text-[12px] uppercase tracking-[0.14em] text-[var(--muted)] md:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              className="min-h-11 px-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]"
            >
              Prev
            </button>
            <span>
              {index !== null ? index + 1 : 0} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              className="min-h-11 px-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--text)]"
            >
              Next
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
