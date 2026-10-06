"use client";

import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "motion/react";
import { palette } from "@/theme/palette";

const MotionBox = motion.create(Box);

/**
 * A divider that draws itself from the left as it comes into view. Decorative,
 * so it is hidden from assistive technology; with reduced motion it is simply
 * a line.
 */
export default function Rule({ color = palette.line, sx }) {
  const reduceMotion = useReducedMotion();

  const base = {
    width: "100%",
    height: "1px",
    backgroundColor: color,
    transformOrigin: "left",
    ...sx,
  };

  if (reduceMotion) {
    return <Box aria-hidden="true" sx={base} />;
  }

  return (
    <MotionBox
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
      sx={base}
    />
  );
}
