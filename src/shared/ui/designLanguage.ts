/**
 * LEXD design language — "waybill".
 *
 * The visual signature is deliberately distinct from the previous ChinaLink
 * styling, which leaned on soft 12–16px radii, heavy drop shadows, and
 * multi-hue gradients. LEXD instead reads like a precise shipping document:
 *
 *   1. Borders, not shadows. Surfaces are separated by a hairline border.
 *      Elevation is reserved for things that genuinely float (modals, sheets).
 *   2. A leading accent rail. Cards carry a 3px bar on their leading edge that
 *      encodes status. This is the most recognizable LEXD element.
 *   3. Uppercase micro-labels. Section headers and metadata use a tracked,
 *      uppercase overline — the manifest/waybill cue.
 *   4. Tighter, squarer geometry. 10px cards, 8px controls, 4px badges.
 *      Full pills are rare and intentional.
 *   5. Amber is a signal, not a surface. It marks the single most important
 *      action or state in a view; green carries everything structural.
 *
 * Import these constants rather than re-deriving numbers in components.
 */

/** Corner geometry. Squarer than the old system on purpose. */
export const RADIUS = {
  badge: 4,
  control: 8,
  card: 10,
  sheet: 16,
  pill: 999,
} as const;

/** Width of the leading status rail on a card. */
export const RAIL_WIDTH = 3;

/** Hairline border width — kept at 1 rather than StyleSheet.hairlineWidth so
 *  the edge stays visible at the low densities common on Android devices. */
export const HAIRLINE = 1;

/** Tracked uppercase micro-label used for section headers and metadata. */
export const OVERLINE = {
  fontSize: 11,
  fontWeight: '700',
  letterSpacing: 0.8,
  textTransform: 'uppercase',
} as const;

/** Vertical rhythm. A 4px base step keeps dense list rows aligned. */
export const STACK = {
  hairline: 2,
  tight: 6,
  snug: 10,
  base: 14,
  loose: 20,
  section: 28,
} as const;

/**
 * Semantic rail colors, resolved against the active theme's palette.
 * `tone` mirrors the status vocabulary already used across the app.
 */
export type RailTone = 'brand' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

export const railColor = (
  tone: RailTone,
  colors: {
    primary: { main: string };
    accent: { amber: string };
    status: { success: string; warning: string; error: string; info: string };
    border: string;
  }
): string => {
  switch (tone) {
    case 'accent':
      return colors.accent.amber;
    case 'success':
      return colors.status.success;
    case 'warning':
      return colors.status.warning;
    case 'danger':
      return colors.status.error;
    case 'info':
      return colors.status.info;
    case 'muted':
      return colors.border;
    case 'brand':
    default:
      return colors.primary.main;
  }
};
