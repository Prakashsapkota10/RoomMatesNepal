"use client";

import { useSpring, useReducedMotion, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target value to count up to */
  target: number;
  /** Duration in seconds */
  duration?: number;
  /** Suffix like "+" or "%" */
  suffix?: string;
  /** Prefix like "NPR " */
  prefix?: string;
  /** Format with commas */
  formatNumber?: boolean;
  className?: string;
}

/**
 * Count-up number animation using Framer Motion's useSpring.
 * Triggers when scrolled into view.
 */
export function AnimatedCounter({
  target,
  duration = 1.5,
  suffix = "",
  prefix = "",
  formatNumber = true,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? target : 0);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      springValue.set(target);
    }
  }, [isInView, target, shouldReduceMotion, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  const formatted = formatNumber ? display.toLocaleString() : String(display);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
