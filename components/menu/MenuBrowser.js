"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { palette } from "@/theme/palette";

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);

// Switching category deals the new dishes out one after another; the old set
// steps back and fades first, so the two never overlap.
const listMotion = {
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  leaving: { opacity: 0, transition: { duration: 0.14 } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// Matches the sticky header, so the categories park right under it.
const HEADER_HEIGHT = 70;

function CategoryIcon({ id, color }) {
  const stroke = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      sx={{ width: 22, height: 22 }}
    >
      {id === "starters" && (
        <>
          <path d="M3 14h18a9 9 0 0 1-18 0Z" {...stroke} />
          <circle cx="8.5" cy="9" r="1.6" {...stroke} />
          <circle cx="12" cy="7" r="1.6" {...stroke} />
          <circle cx="15.5" cy="9" r="1.6" {...stroke} />
        </>
      )}
      {id === "soups" && (
        <>
          <path d="M4 11h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8Z" {...stroke} />
          <path d="M9 7c0-1.2 1-1.8 1-3M14 7c0-1.2 1-1.8 1-3" {...stroke} />
        </>
      )}
      {id === "mains" && (
        <>
          <path d="M4 16h16M5 16a7 7 0 0 1 14 0" {...stroke} />
          <path d="M12 9V6" {...stroke} />
          <path d="M3 20h18" {...stroke} />
        </>
      )}
      {id === "sides" && (
        <>
          <path d="M12 20c-4 0-7-3-7-7 4-1 7 1 7 7Z" {...stroke} />
          <path d="M12 20c0-6 3-9 8-9 0 5-3 9-8 9Z" {...stroke} />
        </>
      )}
      {id === "dessert" && (
        <>
          <path d="M6 11h12l-1.5 9h-9Z" {...stroke} />
          <path d="M8 11a4 4 0 0 1 8 0" {...stroke} />
          <path d="M12 7V4" {...stroke} />
        </>
      )}
      {id === "drinks" && (
        <>
          <path d="M7 4h10l-1 6a4 4 0 0 1-8 0Z" {...stroke} />
          <path d="M12 14v6M9 20h6" {...stroke} />
        </>
      )}
    </Box>
  );
}

export default function MenuBrowser({ categories, legend }) {
  const [active, setActive] = useState(categories[0].id);
  const reduceMotion = useReducedMotion();
  const current = categories.find((category) => category.id === active);

  return (
    // This wrapper bounds the sticky bar: it lets go once the cards end,
    // instead of following the reader into the sections below.
    <Box>
      {/* On a phone the categories stay put under the header while the cards
          run beneath them, so switching never means scrolling back up. */}
      <Box
        sx={{
          position: { xs: "sticky", md: "static" },
          top: { xs: HEADER_HEIGHT, md: "auto" },
          zIndex: 5,
          backgroundColor: palette.veilSticky,
          backdropFilter: { xs: "blur(14px)", md: "none" },
          borderBottom: { xs: "1px solid", md: "none" },
          borderColor: "divider",
        }}
      >
        <Container>
          <Stack
            direction="row"
            role="tablist"
            aria-label={current.tablistLabel}
            sx={{
              gap: { xs: 1, sm: 2 },
              py: { xs: 2, md: 0 },
              pb: { md: 4 },
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {categories.map((category) => {
              const selected = category.id === active;

              return (
                <Stack
                  key={category.id}
                  component="button"
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(category.id)}
                  sx={{
                    flex: "0 0 auto",
                    minWidth: { xs: 78, sm: 96 },
                    gap: 1.25,
                    p: 0.5,
                    alignItems: "center",
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: selected ? 600 : 400,
                    color: selected ? palette.accent : "text.secondary",
                    transition: "color 240ms ease",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: selected ? palette.accent : "divider",
                      backgroundColor: selected
                        ? palette.accentFill
                        : palette.surfaceRaised,
                      transition:
                        "border-color 240ms ease, background-color 240ms ease",
                    }}
                  >
                    <CategoryIcon
                      id={category.id}
                      color={selected ? palette.accent : palette.muted}
                    />
                  </Box>
                  {category.label}
                </Stack>
              );
            })}
          </Stack>
        </Container>
      </Box>

      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <Typography
          component={motion.p}
          initial={reduceMotion ? undefined : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.7 }}
          variant="body2"
          color="text.secondary"
          sx={{
            mt: { xs: 3, md: 0 },
            mb: 3,
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
          }}
        >
          {legend}
        </Typography>

        <AnimatePresence mode="wait" initial={false}>
          <MotionBox
            key={active}
            role="tabpanel"
            variants={reduceMotion ? instant : listMotion}
            initial="hidden"
            animate="shown"
            exit="leaving"
            sx={{
              display: "grid",
              gap: { xs: 2, md: 2.5 },
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            {current.items.map((item) => (
              <MotionStack
                key={item.id}
                component="article"
                direction="row"
                variants={reduceMotion ? instant : cardMotion}
                sx={{
                  alignItems: "stretch",
                  minHeight: { xs: 196, sm: 212 },
                  borderRadius: "26px",
                  overflow: "hidden",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: palette.gloss,
                  transition: "border-color 240ms ease",
                  "&:hover": { borderColor: palette.accentLine },
                }}
              >
                <Stack
                  sx={{
                    flex: "1 1 auto",
                    minWidth: 0,
                    gap: 1,
                    p: { xs: 2.5, sm: 3 },
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: "var(--font-display), Didot, Georgia, serif",
                      fontSize: { xs: 19, sm: 21 },
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 13 }}
                  >
                    {item.desc}
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{ gap: 0.75, flexWrap: "wrap", pt: 0.5 }}
                  >
                    {item.ingredients.map((ingredient) => (
                      <Box
                        key={ingredient}
                        sx={{
                          px: 1.25,
                          py: 0.25,
                          borderRadius: 999,
                          border: "1px solid",
                          borderColor: "divider",
                          fontSize: 11,
                          lineHeight: 1.6,
                          color: "text.secondary",
                        }}
                      >
                        {ingredient}
                      </Box>
                    ))}
                  </Stack>

                  <Stack
                    direction="row"
                    sx={{
                      gap: 2,
                      mt: 1,
                      pt: 1.5,
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      borderTop: "1px solid",
                      borderColor: "divider",
                      fontFamily: "var(--font-mono), ui-monospace, monospace",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <Box sx={{ fontSize: 15, color: palette.accent }}>
                      {item.price}
                    </Box>
                    {item.nutrition && (
                      <Box
                        sx={{
                          fontSize: 11,
                          letterSpacing: "0.04em",
                          color: "text.secondary",
                        }}
                      >
                        {item.nutrition}
                      </Box>
                    )}
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    position: "relative",
                    flex: { xs: "0 0 128px", sm: "0 0 168px" },
                    width: { xs: 128, sm: 168 },
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 600px) 128px, 168px"
                    style={{
                      objectFit: "cover",
                      filter: "saturate(0.94) contrast(1.05)",
                    }}
                  />
                </Box>
              </MotionStack>
            ))}
          </MotionBox>
        </AnimatePresence>
      </Container>
    </Box>
  );
}
