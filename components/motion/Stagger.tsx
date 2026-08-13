"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
};

const tagToMotion = {
  div: motion.div,
  article: motion.article,
};

export function StaggerGroup({ children, className, as = "div" }: StaggerProps) {
  const MotionTag = tagToMotion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({ children, className, as = "div" }: StaggerProps) {
  const MotionTag = tagToMotion[as];
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
