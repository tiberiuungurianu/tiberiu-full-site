"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { durationFor, easeEditorial, motionDuration } from "@/lib/motion";

export function Hero() {
  const { hero } = site;
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.06, 1.14]);

  const entrance = {
    duration: durationFor(reduceMotion, motionDuration.hero),
    ease: easeEditorial,
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      data-theme="dark"
      aria-label="Cover"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--ink)]"
    >
      {/* Full-bleed photographic plane */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y: imageY, scale: imageScale }}>
          <Image
            src={hero.image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_22%] sm:object-[58%_28%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,11,10,0.55)_0%,rgba(12,11,10,0.08)_28%,rgba(12,11,10,0.2)_55%,rgba(12,11,10,0.88)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[min(28vw,220px)] bg-[linear-gradient(90deg,rgba(12,11,10,0.55),transparent)] max-sm:hidden" />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-[max(24px,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+12px)]">
        <div className="relative pb-2">
          <motion.p
            className="mb-3 max-w-[16ch] font-[family-name:var(--font-editorial)] text-[clamp(20px,2.4vw,30px)] italic leading-[1.15] text-[var(--paper)]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entrance, delay: reduceMotion ? 0 : 0.2 }}
          >
            {hero.line}
          </motion.p>

          <motion.h1
            className="masthead text-[clamp(96px,24vw,300px)] text-[var(--paper)]"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entrance, delay: reduceMotion ? 0 : 0.06 }}
          >
            {hero.masthead}
          </motion.h1>

          <motion.div
            className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--line)] pt-4 md:mt-5"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entrance, delay: reduceMotion ? 0 : 0.3 }}
          >
            <a
              href="#about"
              className="kicker scroll-cue text-[var(--paper)]/80 transition-colors hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
            >
              {hero.scrollNote} ↓
            </a>
            <p className="kicker m-0 text-[var(--paper)]/65">
              {hero.chapter} / {hero.meta}
            </p>
          </motion.div>
        </div>

        <p className="visually-hidden">{site.personName} — official website</p>
      </div>
    </section>
  );
}
