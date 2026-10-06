"use client";

import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "motion/react";

const MotionBox = motion.create(Box);

// Slow and understated: content lifts, photographs settle out of a slight
// oversize. Both ease out, so they arrive rather than snap.
const variants = {
  rise: {
    hidden: { opacity: 0, y: 32 },
    shown: { opacity: 1, y: 0 },
  },
  settle: {
    hidden: { opacity: 0, scale: 1.06 },
    shown: { opacity: 1, scale: 1 },
  },
};

/**
 * Reveals its children once, as they scroll into view. Renders a plain Box
 * when the reader asked for less motion, so nothing animates and nothing is
 * left hidden.
 */
export default function Reveal({
  variant = "rise",
  delay = 0,
  duration = 0.9,
  // How much of the element has to be in view before it starts. Lower it for
  // anything taller than about half the screen, which can never reach 50%.
  amount = 0.5,
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Box {...rest}>{children}</Box>;
  }

  return (
    <MotionBox
      initial={variants[variant].hidden}
      whileInView={variants[variant].shown}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
