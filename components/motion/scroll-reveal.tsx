"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { SPRING_BOUNCY, SPRING_GENTLE } from "@/lib/motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  /** Delay in seconds */
  delay?: number;
  /** Distance in px */
  distance?: number;
  /** Whether to include scale */
  scale?: boolean;
  /** Use a more bouncy spring */
  bouncy?: boolean;
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
  }
};

/**
 * Scroll-triggered reveal with physics-based spring.
 * Supports direction, scale, and configurable delay.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  distance = 30,
  scale: withScale = false,
  bouncy = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getOffset(direction, distance);
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
      ...(withScale ? { scale: 0.95 } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        ...(bouncy ? SPRING_BOUNCY : SPRING_GENTLE),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
