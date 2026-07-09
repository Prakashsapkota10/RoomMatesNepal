"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUpItem } from "@/lib/motion";
import type { ReactNode } from "react";

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  /** Trigger once when scrolled into view */
  triggerOnScroll?: boolean;
}

/**
 * Orchestrated stagger container — children animate in as a wave.
 * Uses inView detection when triggerOnScroll is true.
 */
export function StaggerGrid({ children, className, triggerOnScroll = true }: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={triggerOnScroll ? (isInView ? "visible" : "hidden") : "visible"}
    >
      {children}
    </motion.div>
  );
}

/**
 * Single item inside StaggerGrid — must be a direct child.
 */
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUpItem}>
      {children}
    </motion.div>
  );
}
