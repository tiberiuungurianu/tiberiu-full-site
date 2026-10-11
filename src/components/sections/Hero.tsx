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
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.04, 1.12]);
  const darkenOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.75, 1],
    reduceMotion ? [0, 0, 0, 0, 0] : [0, 0.22, 0.55, 0.85, 1]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7],
    reduceMotion ? [1, 1, 1] : [1, 0.75, 0]
  );
  const mastheadX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "-4%"]
  );

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
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--black)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          initial={
            reduceMotion ? false : { clipPath: "inset(12% 9% 18% 4%)", opacity: 0.7 }
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
              className="object-cover object-[62%_22%] sm:object-[58%_30%]"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] bg-black"
          style={{ opacity: darkenOpacity }}
        />
      </div>

      <motion.div
        className="shell relative z-10 w-full pb-[max(24px,env(safe-area-inset-bottom))] pt-[calc(var(--header-h)+16px)]"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          className="mb-5 flex flex-wrap items-center justify-between gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: reduceMotion ? 0 : 0.22 }}
        >
          <span className="section-index">{hero.meta}</span>
          <span className="stamp -rotate-2">{hero.stamp}</span>
          <span className="section-index">
            {hero.chapter} / {hero.issue}
          </span>
        </motion.div>

        <motion.h1
          className="m-0 max-w-[110%] font-[family-name:var(--font-display)] text-[clamp(72px,20vw,260px)] font-bold leading-[0.72] tracking-[-0.07em] uppercase md:-ml-1"
          style={{ x: mastheadX }}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: reduceMotion ? 0 : 0.12 }}
        >
          {hero.masthead}
        </motion.h1>

        <motion.p
          className="scroll-cue mt-6 m-0 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--steel)]"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entrance, delay: reduceMotion ? 0 : 0.38 }}
        >
          {hero.scrollNote} ↓
        </motion.p>

        <p className="visually-hidden">{site.personName} — official website</p>
      </motion.div>
    </section>
  );
}
