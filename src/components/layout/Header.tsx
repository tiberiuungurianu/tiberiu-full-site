"use client";

import { site } from "@/content/site";
import { cx } from "@/lib/utils";

type HeaderProps = {
  menuOpen: boolean;
  onMenuToggle: () => void;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
  onLight?: boolean;
};

export function Header({ menuOpen, onMenuToggle, menuButtonRef, onLight = false }: HeaderProps) {
  const inverted = onLight && !menuOpen;

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-[90]"
      data-on-light={inverted ? "true" : "false"}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between pt-[env(safe-area-inset-top)]">
        <a
          href="#home"
          className={cx(
            "topbar-brand pointer-events-auto font-[family-name:var(--font-display)] text-[clamp(22px,1.8vw,34px)] font-black uppercase tracking-[-0.03em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current"
          )}
          aria-label="Tiberiu home"
          onClick={() => {
            if (menuOpen) onMenuToggle();
          }}
        >
          {site.name}
        </a>

        <div className="pointer-events-auto flex items-center gap-5 md:gap-8 xl:gap-10">
          <nav
            className="topbar-nav hidden items-center gap-6 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] md:flex xl:gap-8"
            aria-label="Primary"
          >
            {site.nav.slice(1, 4).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="topbar-menu min-h-11 min-w-11 px-1 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-current"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={onMenuToggle}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </header>
  );
}
