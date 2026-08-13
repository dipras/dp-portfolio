"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "section" | "aside";
};

const tagToMotion = {
  div: motion.div,
  article: motion.article,
  section: motion.section,
  aside: motion.aside,
};

export default function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = tagToMotion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
