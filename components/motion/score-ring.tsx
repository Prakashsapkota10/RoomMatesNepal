"use client";

import { motion, useReducedMotion, useInView, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ScoreRingProps {
  /** Score 0-100 */
  score: number;
  /** Radius of the circle */
  radius?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Size of the SVG container */
  size?: number;
  className?: string;
}

/**
 * Animated SVG score ring with stroke-dashoffset draw animation
 * and spring-driven count-up number in the center.
 */
export function ScoreRing({
  score,
  radius = 18,
  strokeWidth = 3,
  size = 44,
  className,
}: ScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [displayScore, setDisplayScore] = useState(shouldReduceMotion ? score : 0);

  const circumference = 2 * Math.PI * radius;
  const dashLength = (circumference * score) / 100;

  const springScore = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      springScore.set(score);
    }
  }, [isInView, score, shouldReduceMotion, springScore]);

  useEffect(() => {
    const unsubscribe = springScore.on("change", (v) => setDisplayScore(Math.round(v)));
    return unsubscribe;
  }, [springScore]);

  return (
    <div ref={ref} className={className} style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/25"
        />
        {/* Animated progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: circumference - dashLength } : { strokeDashoffset: circumference }}
          transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--trust, var(--primary))" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-primary" style={{ transform: "rotate(0deg)" }}>
        {displayScore}%
      </span>
    </div>
  );
}
