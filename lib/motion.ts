/**
 * Shared Framer Motion spring configs and animation variants.
 * Single source of truth for the entire motion system.
 */
import type { Transition, Variants } from "framer-motion";

// ─── Spring Presets ──────────────────────────────────────────────────────────

/** Snappy interaction spring — buttons, toggles, micro-feedback */
export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

/** Bouncy spring — cards entrance, modal pop */
export const SPRING_BOUNCY: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1,
};

/** Gentle spring — page transitions, large elements */
export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

/** Float spring — parallax layers, slow drift */
export const SPRING_FLOAT: Transition = {
  type: "spring",
  stiffness: 50,
  damping: 15,
  mass: 2,
};

// ─── Stagger Container Variant ───────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

// ─── Child Item Variants ─────────────────────────────────────────────────────

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_BOUNCY,
  },
};

export const fadeScaleItem: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_BOUNCY,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_GENTLE,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: SPRING_GENTLE,
  },
};

// ─── Page Transition Variants ────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_GENTLE,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ─── Card Hover Variants ─────────────────────────────────────────────────────

export const cardHover: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 4px 12px -2px rgba(0,0,0,0.08)",
  },
  hover: {
    y: -6,
    scale: 1.02,
    boxShadow: "0 20px 40px -8px rgba(21,84,209,0.15)",
    transition: SPRING_SNAPPY,
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { type: "spring", stiffness: 600, damping: 30 },
  },
};

// ─── Button Press Variant ────────────────────────────────────────────────────

export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: SPRING_SNAPPY },
  tap: { scale: 0.95, transition: { type: "spring", stiffness: 800, damping: 20 } },
};

// ─── Reduced Motion Helper ───────────────────────────────────────────────────

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};
