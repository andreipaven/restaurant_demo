"use client";

import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "motion/react";

const MotionBox = motion.create(Box);

/**
 * The header drops in from above the fold once, on load. Everything inside it
 * stays a Server Component; only this shell crosses to the client.
 */
export default function HeaderShell({ children, ...rest }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Box component="header" {...rest}>
        {children}
      </Box>
    );
  }

  return (
    <MotionBox
      component="header"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}
