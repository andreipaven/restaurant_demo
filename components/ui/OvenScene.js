"use client";

import Box from "@mui/material/Box";
import { motion, useReducedMotion } from "motion/react";
import { palette } from "@/theme/palette";

const MotionBox = motion.create(Box);

// Each flame breathes on its own clock, so the fire never repeats visibly.
const flame = (duration) => ({
  scaleY: [1, 1.1, 0.94, 1.06, 1],
  scaleX: [1, 0.95, 1.05, 0.97, 1],
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
});

const glow = (duration) => ({
  opacity: [0.45, 0.8, 0.45],
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
});

// Sparks drift up out of the mouth and burn out on the way.
const spark = (duration, delay) => ({
  y: [0, -210],
  x: [0, 18],
  opacity: [0, 0.95, 0],
  transition: { duration, delay, repeat: Infinity, ease: "linear" },
});

const steam = (delay) => ({
  y: [0, -54],
  opacity: [0, 0.5, 0],
  transition: { duration: 3.2, delay, repeat: Infinity, ease: "easeOut" },
});

const sparks = [
  { cx: 250, cy: 330, r: 3.2, fill: palette.flameCore, duration: 4.2, delay: 0 },
  { cx: 284, cy: 340, r: 2.4, fill: palette.ember, duration: 5.6, delay: 0.9 },
  { cx: 228, cy: 344, r: 2.8, fill: palette.flameCore, duration: 3.6, delay: 1.7 },
  { cx: 300, cy: 326, r: 2.2, fill: palette.ember, duration: 6.2, delay: 2.5 },
  { cx: 206, cy: 332, r: 2.6, fill: palette.accent, duration: 4.9, delay: 3.3 },
];

/**
 * A wood-fired oven, drawn rather than photographed: the fire breathes, sparks
 * drift out of the mouth and a pan steams on the hearth. Decorative, so it is
 * labelled for screen readers and goes still when the reader asks for less
 * motion.
 */
export default function OvenScene({ label, sx }) {
  const reduceMotion = useReducedMotion();
  const animate = (value) => (reduceMotion ? undefined : value);

  return (
    <MotionBox
      component="svg"
      viewBox="0 0 520 520"
      role="img"
      aria-label={label}
      sx={{ width: "100%", height: "auto", display: "block", ...sx }}
    >
      {/* Light pooling on the floor in front of the mouth */}
      <motion.ellipse
        cx="260"
        cy="452"
        rx="212"
        ry="32"
        fill={palette.accentDeep}
        opacity={0.16}
        animate={animate({
          opacity: [0.12, 0.26, 0.12],
          transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
        })}
      />

      <rect x="352" y="120" width="56" height="128" rx="6" fill={palette.ovenBody} />
      <rect x="342" y="112" width="76" height="20" rx="7" fill={palette.ovenBrick} />

      <path d="M70 384C70 246 178 174 260 174s190 72 190 210Z" fill={palette.ovenBody} />
      <path
        d="M70 384C70 246 178 174 260 174s190 72 190 210Z"
        fill="none"
        stroke={palette.ovenEdge}
        strokeWidth="2"
      />
      <g fill="none" stroke={palette.ovenBrick} strokeWidth="1.4">
        <path d="M96 384c0-108 78-170 164-170s164 62 164 170" />
        <path d="M124 384c0-88 62-140 136-140s136 52 136 140" />
        <path d="M152 384c0-70 48-112 108-112" />
      </g>
      <path
        d="M88 380c2-96 54-152 118-172-50 34-80 92-84 172Z"
        fill={palette.ovenBrick}
        opacity="0.8"
      />

      <path
        d="M176 384v-48c0-44 36-74 84-74s84 30 84 74v48Z"
        fill={palette.ovenMouth}
      />
      <path
        d="M176 384v-48c0-44 36-74 84-74s84 30 84 74v48Z"
        fill="none"
        stroke={palette.ovenEdge}
        strokeWidth="2"
      />

      <motion.ellipse
        cx="260"
        cy="366"
        rx="76"
        ry="38"
        fill={palette.accentDeep}
        opacity={0.6}
        animate={animate(glow(3.4))}
      />

      <g fill={palette.firewood}>
        <rect x="192" y="360" width="82" height="16" rx="8" />
        <rect x="248" y="366" width="76" height="14" rx="7" />
      </g>

      <motion.path
        d="M260 378c-32 0-52-20-52-44 0-28 24-44 32-76 4 16 13 22 22 30 10-13 12-26 10-41 24 22 40 52 40 87 0 24-20 44-52 44Z"
        fill={palette.accentDeep}
        style={{ originX: "260px", originY: "378px" }}
        animate={animate(flame(2.7))}
      />
      <motion.path
        d="M260 378c-20 0-33-14-33-30 0-20 16-30 22-52 4 13 11 18 17 24 5-9 5-18 3-27 16 18 24 36 24 55 0 16-13 30-33 30Z"
        fill={palette.accent}
        style={{ originX: "260px", originY: "378px" }}
        animate={animate(flame(1.9))}
      />
      <motion.path
        d="M260 378c-11 0-19-9-19-20 0-13 11-20 13-35 6 11 11 15 13 22 9 11 12 18 12 26 0 11-8 20-19 20Z"
        fill={palette.flameCore}
        style={{ originX: "260px", originY: "378px" }}
        animate={animate(flame(1.35))}
      />

      <rect x="44" y="384" width="432" height="54" rx="10" fill={palette.ovenBase} />
      <rect x="44" y="384" width="432" height="10" rx="5" fill={palette.ovenBrick} />

      {/* A pan on the hearth, with something searing in it */}
      <ellipse cx="146" cy="406" rx="56" ry="17" fill={palette.ovenMouth} />
      <ellipse cx="146" cy="400" rx="56" ry="17" fill={palette.ovenBrick} />
      <ellipse cx="146" cy="399" rx="44" ry="12" fill={palette.ovenMouth} />
      <rect x="198" y="395" width="54" height="7" rx="3.5" fill={palette.ovenBrick} />
      <path d="M118 399c12-10 44-10 56 0-10 8-46 8-56 0Z" fill={palette.ember} />
      <path
        d="M124 398c10-6 36-6 44 0"
        fill="none"
        stroke={palette.accentDeep}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <motion.path
        d="M134 388c6-10-4-16 2-26"
        fill="none"
        stroke={palette.steam}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0}
        animate={animate(steam(0))}
      />
      <motion.path
        d="M160 388c6-10-4-16 2-26"
        fill="none"
        stroke={palette.steam}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0}
        animate={animate(steam(1.5))}
      />

      {/* A rack of wood waiting beside the oven */}
      <ellipse cx="400" cy="408" rx="46" ry="14" fill={palette.ovenMouth} />
      <rect x="372" y="366" width="56" height="42" rx="8" fill={palette.ovenBrick} />
      <rect x="380" y="374" width="40" height="26" rx="4" fill={palette.ovenMouth} />
      <circle cx="400" cy="387" r="7" fill={palette.accentDeep} />

      {sparks.map((s) => (
        <motion.circle
          key={`${s.cx}-${s.cy}`}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill={s.fill}
          opacity={reduceMotion ? 0.55 : 0}
          animate={animate(spark(s.duration, s.delay))}
        />
      ))}
    </MotionBox>
  );
}
