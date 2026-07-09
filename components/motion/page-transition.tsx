"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SPRING_GENTLE } from "@/lib/motion";
import type { ReactNode } from "react";

interface PageTransitionWrapperProps {
  children: ReactNode;
}

/**
 * Wraps page content to animate route transitions.
 * Uses exit/enter choreography with spring physics.
 * Respects prefers-reduced-motion.
 */
export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.99 }}
        transition={SPRING_GENTLE}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
