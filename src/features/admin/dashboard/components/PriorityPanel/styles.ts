import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

// Workbench-voice styles: no card chrome on tiles, hairline rules, small caps
// eyebrow, generous interior padding. Colour is reserved for state — neutral
// tiles look like quiet rows; only the affected tile draws the eye.
export const createPriorityPanelStyles = (colors: any, isDark: boolean) => // eslint-disable-line @typescript-eslint/no-explicit-any
  StyleSheet.create({
    container: {
      // Tier-1 spacing — generous breathing room around the only thing on
      // screen that demands action. Tier-2 sections below get tighter.
      paddingHorizontal: 4,
      marginTop: Theme.spacing.md,
      marginBottom: Theme.spacing.xl,
    },
    // Small-caps eyebrow replaces the gradient hero card. Workbench rhythm:
    // label sits flush-left above content, not as a banner.
    eyebrow: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: 1.4,
    },
    headerRow: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: Theme.spacing.sm,
    },
    queueLink: {
      minHeight: 44,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingLeft: Theme.spacing.md,
    },
    queueLinkText: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      color: colors.primary.main,
    },
    tilesRow: {
      flexDirection: "row",
      gap: 10,
    },
    // Tile — flat by default. Border is the divider, not shadow.
    tile: {
      flex: 1,
      minHeight: 84,
      paddingHorizontal: 12,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      justifyContent: "space-between",
    },
    // Warning state — amber tint on tile + value. The label stays neutral
    // so the colour weight rests on the metric, not the chrome.
    tileWarning: {
      backgroundColor: isDark ? "rgba(245,158,11,0.08)" : colors.feedback.warningBg,
      borderColor: isDark ? "rgba(245,158,11,0.35)" : colors.status.warning + "40",
    },
    // Critical — red. Same colour rule.
    tileCritical: {
      backgroundColor: isDark ? "rgba(239,68,68,0.08)" : colors.feedback.errorBg,
      borderColor: isDark ? "rgba(239,68,68,0.4)" : colors.status.error + "50",
    },
    tileValue: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      lineHeight: 26,
    },
    tileValueWarning: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.status.warning,
      lineHeight: 26,
    },
    tileValueCritical: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.status.error,
      lineHeight: 26,
    },
    // Label — single line. No two-line clickable text (slop gate 59).
    tileLabel: {
      fontSize: 11.5,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
      marginTop: 8,
    },
    pressed: {
      opacity: 0.85,
    },
    // ── Skeleton (loading) ───────────────────────────────────────
    skeletonRow: {
      flexDirection: "row",
      gap: 10,
    },
    skeletonTile: {
      flex: 1,
      height: 84,
      borderRadius: 12,
      backgroundColor: isDark ? colors.neutral[800] : colors.neutral[100],
    },
    // ── All-clear state ─────────────────────────────────────────
    // Single quiet row, no card, no shadow. The audit was explicit: empty
    // alerts should be invisible.
    allClearRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 8,
    },
    allClearText: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    // ── Error state ─────────────────────────────────────────────
    errorRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: isDark ? "rgba(239,68,68,0.12)" : colors.feedback.errorBg,
      borderWidth: 1,
      borderColor: isDark ? "rgba(239,68,68,0.3)" : colors.status.error + "30",
    },
    errorText: {
      flex: 1,
      fontSize: 12.5,
      fontFamily: Fonts.medium,
      color: colors.text.primary,
    },
    errorRetry: {
      fontSize: 12,
      fontFamily: Fonts.bold,
      color: colors.status.error,
    },
  });
