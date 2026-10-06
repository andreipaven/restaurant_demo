"use client";

import { useRef } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { palette } from "@/theme/palette";

const MotionBox = motion.create(Box);

/**
 * The house platter turns with the page: its rotation is tied to how far the
 * section has travelled through the viewport, not to a clock, so it follows
 * the reader. The outer box holds the layout size and never turns, so the
 * rotated bounding box cannot push the text column around.
 */
export default function TurningPlatter({ image, alt }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-24, 240]);

  return (
    <Box
      ref={ref}
      sx={{ position: "relative", width: "100%", maxWidth: 520, aspectRatio: "1 / 1" }}
    >
      <MotionBox
        style={reduceMotion ? undefined : { rotate }}
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid",
          borderColor: palette.accentLine,
          boxShadow: palette.shadowPlate,
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          placeholder="blur"
          sizes="(max-width: 900px) 86vw, 520px"
          style={{
            objectFit: "cover",
            objectPosition: "30% 46%",
            filter: "saturate(0.95) contrast(1.05)",
          }}
        />
      </MotionBox>
    </Box>
  );
}
