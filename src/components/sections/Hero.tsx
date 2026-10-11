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

  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.02, 1.08]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.45]);

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
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--bg)]"
    >
      <motion.div className="absolute inset-0" aria-hidden="true" style={{ opacity: veilOpacity }}>
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          initial={
            reduceMotion
              ? false
              : { clipPath: "inset(10% 7% 16% 7%)", opacity: 0.75 }
          }
          animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          transition={entrance}
        >
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: imageY, scale: imageScale }}>
            <Image
              src={hero.image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[58%_28%] sm:object-[58%_36%]"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />
      </motion.div>

      <div className="shell relative z-10 w-full pb-[max(28px,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+24px)]">
        <motion.div
          className="mb-6 flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: reduceMotion ? 0 : 0.26 }}
        >
          <span>{hero.meta}</span>
          <span>
            {hero.chapter} / {hero.issue}
          </span>
        </motion.div>

        <motion.h1
          className="m-0 font-[family-name:var(--font-display)] text-[clamp(64px,16vw,220px)] font-bold leading-[0.82] tracking-[-0.055em] uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: reduceMotion ? 0 : 0.16 }}
        >
          {hero.masthead}
        </motion.h1>

        <motion.div
          className="mt-5 flex flex-wrap items-end justify-between gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: reduceMotion ? 0 : 0.4 }}
        >
          <p className="m-0 max-w-[20em] font-[family-name:var(--font-editorial)] text-[clamp(18px,2.4vw,28px)] italic leading-[1.2] text-[var(--ivory)]">
            {hero.line}
          </p>
          <p className="scroll-cue m-0 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {hero.scrollNote} ↓
          </p>
        </motion.div>

        <p className="visually-hidden">{site.personName} — official website</p>
      </div>
    </section>
  );
}
