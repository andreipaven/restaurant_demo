"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";

const AUTOPLAY_MS = 5600;

/**
 * The dishes sit in a deck: the one being served is upright in front, the rest
 * fan back over its right shoulder, and the dish just served slides off to the
 * left. `offsetFrom` returns -1 for that leaving card and 0, 1, 2… for the fan.
 */
function offsetFrom(index, active, total) {
  let distance = index - active;
  if (distance < -1) distance += total;
  return distance;
}

function cardTransform(distance) {
  if (distance < 0) {
    return "translateX(-34%) translateZ(-60px) rotate(-9deg) scale(0.9)";
  }
  // The fan is shifted back by half its own spread, so the whole deck sits
  // centred in the column instead of leaning off the right edge.
  return [
    `translateX(${distance * 10 - 15}%)`,
    `translateY(${distance * 3.5}%)`,
    `translateZ(${-distance * 110}px)`,
    `rotate(${distance * 5.5}deg)`,
    `scale(${1 - distance * 0.07})`,
  ].join(" ");
}

export default function DishCarousel({ dishes, labels }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const total = dishes.length;

  const goTo = useCallback(
    (next) => {
      setPlaying(false);
      setActive((next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (!playing) return undefined;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [playing, total]);

  const current = dishes[active];

  return (
    <Stack sx={{ gap: { xs: 3.5, md: 4.5 }, width: "100%", minWidth: 0 }}>
      {/* The clip lives here, on an element with no 3D context of its own:
          a perspective element does not reliably clip transformed children. */}
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <Box
          component="button"
          type="button"
          aria-label={labels.advance}
          onClick={() => goTo(active + 1)}
          sx={{
            position: "relative",
            display: "block",
            width: "100%",
            height: { xs: 380, sm: 460, md: 540 },
            p: 0,
            border: 0,
            background: "none",
            cursor: "pointer",
            perspective: "1600px",
            // At the narrower breakpoints the back of the fan reaches past the
            // column; let it run off the edge rather than widen the page.
            overflow: "hidden",
          }}
        >
          {dishes.map((dish, index) => {
            const distance = offsetFrom(index, active, total);
            const leaving = distance < 0;
            const opacity = leaving ? 0 : Math.max(0, 1 - distance * 0.2);

            return (
              <Box
                key={dish.id}
                aria-hidden={distance !== 0}
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformStyle: "preserve-3d",
                  pointerEvents: "none",
                  zIndex: total - Math.max(distance, 0),
                  opacity,
                  filter: distance > 0 ? `blur(${distance * 0.7}px)` : "none",
                  transform: cardTransform(distance),
                  // A card sent to the back of the deck should fade in where it
                  // lands, not fly across the stack to get there.
                  transition:
                    distance >= 2
                      ? "opacity 700ms ease"
                      : "transform 950ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 650ms ease, filter 650ms ease",
                  "@media (prefers-reduced-motion: reduce)": {
                    transition: "opacity 200ms ease",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "64%", sm: "60%", md: 332 },
                    height: "100%",
                    borderRadius: "26px",
                    overflow: "hidden",
                    border: "1px solid",
                    // The cards behind keep a faint gold edge, so the deck still
                    // reads as a stack of plates against a near-black ground.
                    borderColor:
                      distance === 0 ? palette.accent : palette.accentLine,
                    boxShadow: `${
                      distance === 0 ? palette.shadowLift : palette.shadowCard
                    }, ${palette.gloss}`,
                  }}
                >
                  <Image
                    src={dish.image}
                    alt={dish.alt}
                    fill
                    placeholder="blur"
                    priority={index === 0}
                    sizes="(max-width: 600px) 74vw, (max-width: 900px) 62vw, 348px"
                    style={{
                      objectFit: "cover",
                      filter: "saturate(0.94) contrast(1.06)",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Stack
        aria-live="polite"
        direction={{ xs: "column", sm: "row" }}
        sx={{
          gap: { xs: 2, sm: 3 },
          alignItems: { sm: "flex-start" },
          pt: 3,
          borderTop: "1px solid",
          borderColor: palette.accentLine,
        }}
      >
        <Box
          sx={{
            fontFamily: "var(--font-display), Didot, Georgia, serif",
            fontSize: { xs: 34, md: 42 },
            lineHeight: 1,
            color: palette.accent,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(active + 1).padStart(2, "0")}
        </Box>

        {/* Every dish sits in the same grid cell, so the block is always as
            tall as the longest description and the rail below never jumps
            when the dish changes. Only the active one is visible. */}
        <Box sx={{ display: "grid", flex: 1, minWidth: 0 }}>
          {dishes.map((dish, index) => {
            const selected = index === active;

            return (
              <Stack
                key={dish.id}
                aria-hidden={!selected}
                sx={{
                  gridArea: "1 / 1",
                  gap: 1,
                  minWidth: 0,
                  visibility: selected ? "visible" : "hidden",
                  opacity: selected ? 1 : 0,
                  transition: "opacity 400ms ease",
                  "@media (prefers-reduced-motion: reduce)": {
                    transition: "none",
                  },
                }}
              >
                <Typography variant="overline" component="p">
                  {dish.tag}
                </Typography>
                <Typography variant="h3" component={selected ? "h2" : "p"}>
                  {dish.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: "48ch" }}
                >
                  {dish.desc}
                </Typography>
              </Stack>
            );
          })}
        </Box>

        <Box
          sx={{
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 17,
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
            pt: { sm: 0.5 },
          }}
        >
          {current.price}
        </Box>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: { xs: 1.5, sm: 2 },
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: `repeat(${total}, minmax(0, 1fr))`,
          },
        }}
      >
        {dishes.map((dish, index) => {
          const selected = index === active;

          return (
            <Stack
              key={dish.id}
              component="button"
              type="button"
              aria-pressed={selected}
              aria-label={labels.pick.replace("{name}", dish.name)}
              onClick={() => goTo(index)}
              sx={{
                gap: 1.25,
                p: 0,
                border: 0,
                background: "none",
                textAlign: "left",
                cursor: "pointer",
                alignItems: "stretch",
                color: selected ? "text.primary" : "text.secondary",
                transition: "color 240ms ease",
                "&:hover": { color: "text.primary" },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: 2,
                  overflow: "hidden",
                  backgroundColor: "divider",
                }}
              >
                <Box
                  key={`${index}-${active}-${playing}`}
                  className={selected && playing ? "rail-fill" : undefined}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    transformOrigin: "left",
                    backgroundColor: palette.accent,
                    transform: selected && !playing ? "scaleX(1)" : "scaleX(0)",
                    animationName: selected && playing ? "rail-fill" : "none",
                    animationDuration: `${AUTOPLAY_MS}ms`,
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards",
                  }}
                />
              </Box>

              <Box
                sx={{
                  fontFamily: "var(--font-mono), ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: selected ? palette.accent : "inherit",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </Box>

              <Box sx={{ fontSize: 13, lineHeight: 1.35 }}>{dish.tag}</Box>
            </Stack>
          );
        })}
      </Box>
    </Stack>
  );
}
