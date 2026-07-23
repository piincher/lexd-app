/**
 * LEXD — Larry Express Delivery
 * Brand primitives: the single source of truth for every color in the app.
 *
 * Colors.ts and Theme.ts both derive from this file. Do not redeclare a ramp
 * anywhere else — that drift is what left 240+ hardcoded hex values behind.
 *
 * Palette
 *   primary  deep teal-green #007757, sampled from the LEXD logo mark
 *   accent   amber #F5A524, the brand's warm signal color
 *   ink      green-tinted neutrals so grays sit in the same family as primary
 *
 * Contrast (WCAG 2.1)
 *   white on primary.500        5.56  AA
 *   primary.600 on white        6.99  AA
 *   primary.700 on primary.50   8.21  AA
 *   black on accent.500        10.29  AA
 *   accent.700 on white         5.11  AA
 *   primary.300 on dark bg      8.03  AA
 *
 * Accent rule: accent.500 on white is 2.04 and FAILS as text. Use accent.500
 * only as a fill (with ink.900/black on top); for amber text on light
 * surfaces use accent.700 or darker.
 */

/**
 * A 10-step color ramp. Values are typed `string` rather than literals on
 * purpose: literal types propagate into every derived palette and make
 * light/dark themes mutually unassignable at the call site.
 */
export type Ramp = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

// ============================================
// Primary — LEXD green
// ============================================
export const green: Ramp = {
  50: '#EDF7F3',
  100: '#D3EBE2',
  200: '#A9D8C7',
  300: '#74C0A7',
  400: '#3D9E80',
  500: '#007757',
  600: '#00664B',
  700: '#00543E',
  800: '#024130',
  900: '#022E22',
};

// ============================================
// Accent — LEXD amber
// ============================================
export const amber: Ramp = {
  50: '#FEF8EC',
  100: '#FAEBCB',
  200: '#F5D79A',
  300: '#EFC169',
  400: '#EBB043',
  500: '#F5A524',
  600: '#D2870F',
  700: '#996210',
  800: '#7A4E10',
  900: '#54360C',
};

// ============================================
// Neutrals — subtly green-tinted, not pure gray
// ============================================
export const ink: Ramp & { 0: string } = {
  0: '#FFFFFF',
  50: '#F6F8F7',
  100: '#ECF0EE',
  200: '#DCE3E0',
  300: '#B9C5C0',
  400: '#8B9B95',
  500: '#64756E',
  600: '#4A5A54',
  700: '#37443F',
  800: '#232D29',
  900: '#131A17',
};

// ============================================
// Semantic hues
//
// Success intentionally reuses the brand green — in a delivery product
// "delivered" and "brand" are the same idea. Warning is orange rather than
// amber so it never collides with an accent-colored call to action.
// ============================================
export const semantic: Record<
  | 'success' | 'successLight' | 'successDark'
  | 'warning' | 'warningLight' | 'warningDark'
  | 'error' | 'errorLight' | 'errorDark'
  | 'info' | 'infoLight' | 'infoDark',
  string
> = {
  success: green[500],
  successLight: green[50],
  successDark: green[700],

  warning: '#DC6803',
  warningLight: '#FFF6ED',
  warningDark: '#93370D',

  error: '#D92D20',
  errorLight: '#FEF3F2',
  errorDark: '#912018',

  info: '#1570EF',
  infoLight: '#EFF8FF',
  infoDark: '#175CD3',
};

// ============================================
// Dark-mode surfaces — green-tinted, deliberately not slate-blue
// ============================================
export const darkSurface: Record<'default'|'paper'|'card'|'elevated'|'border', string> = {
  default: '#0A1815',
  paper: '#10231E',
  card: '#163029',
  elevated: '#1D3B33',
  border: '#24443B',
};

/** Brand constants used in copy, share sheets, and store metadata. */
export const BRAND = {
  name: 'LEXD',
  legalName: 'Larry Express Delivery',
  tagline: 'Larry Express Delivery',
  scheme: 'lexd',
} as const;
