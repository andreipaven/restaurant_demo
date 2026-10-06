// One source for every colour in the project. Nothing anywhere else may write
// a colour literal: components read these tokens, and globals.css reads the
// CSS variables generated from them below.
export const palette = {
  // Grounds
  ink: "#060505",
  surface: "#0C0A09",
  surfaceRaised: "#121010",

  // Type
  bone: "#F4F0E8",
  muted: "#A49C90",

  // Accents
  accent: "#C9752F",
  accentDeep: "#8F4A1E",
  wine: "#5E2234",
  warning: "#E8705C",

  // Hairlines and tinted fills
  line: "rgba(244, 240, 232, 0.10)",
  lineStrong: "rgba(244, 240, 232, 0.22)",
  fieldLine: "rgba(244, 240, 232, 0.14)",
  accentLine: "rgba(201, 117, 47, 0.42)",
  accentFill: "rgba(201, 117, 47, 0.16)",

  // Translucent bars that content scrolls under, and the drawer backdrop
  scrim: "rgba(0, 0, 0, 0.60)",
  veilHeader: "rgba(6, 5, 5, 0.80)",
  veilSticky: "rgba(6, 5, 5, 0.93)",

  // The wood-fired oven drawn on the 404 page.
  ovenBody: "#141113",
  ovenBrick: "#221C1F",
  ovenEdge: "#3A3238",
  ovenMouth: "#070506",
  ovenBase: "#100D0F",
  flameCore: "#F0C070",
  ember: "#E8903A",
  firewood: "#3A2A20",
  steam: "#C9C4BA",

  // A one-pixel highlight along the top edge of a raised surface: the way
  // light catches lacquer. Used as a box-shadow, on its own or after a drop
  // shadow.
  gloss: "inset 0 1px 0 rgba(244, 240, 232, 0.07)",

  // Shadows
  shadowCard: "0 18px 44px rgba(0, 0, 0, 0.72)",
  shadowLift: "0 48px 96px rgba(0, 0, 0, 0.86)",
  shadowPlate: "0 50px 96px rgba(0, 0, 0, 0.82)",
  shadowMenu: "0 24px 48px rgba(0, 0, 0, 0.76)",
};

function toVariableName(key) {
  return `--ob-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

/** The same tokens as CSS custom properties, injected on :root by ThemeRegistry. */
export const cssVariables = Object.fromEntries(
  Object.entries(palette).map(([key, value]) => [toVariableName(key), value]),
);
