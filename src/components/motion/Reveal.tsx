"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { durationFor, easeEditorial, motionDuration } from "@/lib/motion";
import { cx } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 18 }: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cx(className)}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -4% 0px" }}
      transition={{
        duration: durationFor(reduceMotion, motionDuration.reveal),
        delay: reduceMotion ? 0 : delay,
        ease: easeEditorial,
      }}
    >
      {children}
    </motion.div>
  );
}
