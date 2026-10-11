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
  const stagger = reduceMotion ? 0 : 0.04;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[80] flex flex-col bg-[var(--ink)] text-[var(--paper)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: easeEditorial }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between pt-[env(safe-area-inset-top)]">
            <p
              id={titleId}
              className="m-0 font-[family-name:var(--font-display)] text-[clamp(20px,1.6vw,28px)] font-black uppercase tracking-[-0.03em]"
            >
              {site.name}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 px-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
            >
              Close
            </button>
          </div>

          <div className="shell flex flex-1 flex-col justify-center gap-12 overflow-y-auto py-8 pb-[max(32px,env(safe-area-inset-bottom))]">
            <nav aria-label="Sections">
              <ul className="m-0 grid list-none gap-1 p-0">
                {site.nav.map((item, index) => (
                  <li key={item.href}>
                    <motion.a
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-4 py-1 transition-colors duration-300 hover:text-[var(--oxblood-bright)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: durationFor(reduceMotion, 0.4),
                        delay: reduceMotion ? 0 : 0.05 + index * stagger,
                        ease: easeEditorial,
                      }}
                    >
                      <span className="font-[family-name:var(--font-display)] text-[clamp(52px,11vw,120px)] font-black leading-[0.84] tracking-[-0.035em] uppercase">
                        {item.label}
                      </span>
                      <span className="kicker text-[var(--smoke)]">{item.number}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
              <p className="kicker text-[var(--smoke)]">Online</p>
              <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-3 p-0">
                <li>
                  <a
                    href={linksContent.email.href}
                    onClick={onClose}
                    className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[var(--oxblood-bright)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
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
                      className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.12em] text-[var(--paper)]/80 hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="kicker m-0 text-[var(--smoke)]">
              {site.code} / {site.city}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
