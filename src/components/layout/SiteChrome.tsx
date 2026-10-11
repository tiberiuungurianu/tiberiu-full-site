"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { MenuOverlay } from "@/components/layout/MenuOverlay";

function themeBehindPoint(x: number, y: number) {
  const stack = document.elementsFromPoint(x, y);

  for (const node of stack) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.closest("header") || node.closest("#site-menu")) continue;

    const themed = node.closest<HTMLElement>("[data-theme]");
    if (themed?.dataset.theme === "light") return true;
    if (themed?.dataset.theme === "dark") return false;
  }

  return false;
}

export function SiteChrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setMenuOpen((value) => !value);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    function updateTheme() {
      if (menuOpen) {
        setOnLight(false);
        return;
      }

      const button = menuButtonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = Math.min(window.innerWidth - 2, Math.max(2, rect.left + rect.width / 2));
      const y = Math.min(window.innerHeight - 2, Math.max(2, rect.top + rect.height / 2));

      setOnLight(themeBehindPoint(x, y));
    }

    updateTheme();

    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateTheme();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [menuOpen]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        onMenuToggle={toggleMenu}
        menuButtonRef={menuButtonRef}
        onLight={onLight}
      />
      <div id="site-menu">
        <MenuOverlay open={menuOpen} onClose={closeMenu} menuButtonRef={menuButtonRef} />
      </div>
    </>
  );
}
