"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { linksContent, visibleLinks } from "@/content/links";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { durationFor, easeEditorial, motionDuration } from "@/lib/motion";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export function MenuOverlay({ open, onClose, menuButtonRef }: MenuOverlayProps) {
  const reduceMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const links = visibleLinks();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusables = () =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)
        : [];

    const first = focusables()[0];
    first?.focus({ preventScroll: true });

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && (active === firstItem || !dialog?.contains(active))) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const menuButton = menuButtonRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus({ preventScroll: true });
    };
  }, [open, onClose, menuButtonRef]);

  const duration = durationFor(reduceMotion, motionDuration.menu);
  const stagger = reduceMotion ? 0 : 0.035;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[80] flex flex-col bg-[rgba(10,10,10,0.97)] text-[var(--ivory)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: easeEditorial }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between pt-[env(safe-area-inset-top)]">
            <p id={titleId} className="m-0 font-[family-name:var(--font-display)] text-[clamp(18px,1.4vw,24px)] font-semibold uppercase tracking-[-0.03em]">
              {site.name}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-1 text-[clamp(13px,1vw,16px)] uppercase tracking-[0.16em] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--ivory)]"
            >
              Close
            </button>
          </div>

          <div className="shell flex flex-1 flex-col justify-center gap-10 overflow-y-auto py-8 pb-[max(32px,env(safe-area-inset-bottom))]">
            <nav aria-label="Sections">
              <ul className="m-0 grid list-none gap-0 border-t border-[var(--line)] p-0">
                {site.nav.map((item, index) => (
                  <li key={item.href} className="border-b border-[var(--line)]">
                    <motion.a
                      href={item.href}
                      onClick={onClose}
                      className="flex items-baseline justify-between gap-4 py-[clamp(14px,2.4vw,22px)] transition-opacity duration-300 hover:opacity-70 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--ivory)]"
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: durationFor(reduceMotion, 0.38),
                        delay: reduceMotion ? 0 : 0.06 + index * stagger,
                        ease: easeEditorial,
                      }}
                    >
                      <span className="font-[family-name:var(--font-display)] text-[clamp(40px,9vw,88px)] font-semibold leading-[0.92] tracking-[-0.045em] uppercase">
                        {item.label}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                        {item.number}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Online</p>
              <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                <li>
                  <a
                    href={linksContent.email.href}
                    onClick={onClose}
                    className="text-[14px] uppercase tracking-[0.12em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--ivory)]"
                  >
                    Contact me
                  </a>
                </li>
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="text-[14px] uppercase tracking-[0.12em] text-[var(--ivory)]/85 hover:text-[var(--ivory)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--ivory)]"
                    >
                      {link.label}
                      {link.detail ? (
                        <span className="ml-3 text-[11px] text-[var(--muted)] normal-case tracking-[0.08em]">
                          {link.detail}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="m-0 text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {site.code} / {site.city}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
