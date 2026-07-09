"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cardHover, SPRING_SNAPPY } from "@/lib/motion";
import type { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  /** Disable hover lift (e.g., for small interactive cards) */
  disableHover?: boolean;
}

/**
 * Wraps a card with physics-based hover lift + tap feedback.
 * Falls back to simple opacity on reduced motion.
 */
export function MotionCard({ children, className, disableHover }: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover={disableHover ? undefined : "hover"}
      whileTap="tap"
      variants={cardHover}
      transition={SPRING_SNAPPY}
    >
      {children}
    </motion.div>
  );
}
