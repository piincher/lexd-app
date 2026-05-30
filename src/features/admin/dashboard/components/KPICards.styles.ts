import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeContextType } from "@src/constants/Theme";

type AppThemeColors = ThemeContextType["colors"];

// Workbench tier-2: flat row, hairline divider, no card chrome.
// Tile shadow + gradient + 3-different-shapes treatment (audit m3) is gone —
// this row sits behind the PriorityPanel, not next to it.
export const createKPIRowStyles = (colors: AppThemeColors, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 4,
      marginTop: Theme.spacing.lg,
      marginBottom: Theme.spacing.lg,
    },
    eyebrow: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      textTransform: "uppercase",
      letterSpacing: 1.4,
      marginBottom: Theme.spacing.sm,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 4,
    },
    item: {
      flex: 1,
      paddingVertical: 8,
    },
    value: {
      fontSize: 24,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      lineHeight: 28,
    },
    label: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
      marginTop: 4,
    },
    divider: {
      width: 1,
      height: 32,
      marginHorizontal: 4,
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    },
    pressed: {
      opacity: 0.7,
    },
  });

// Back-compat alias — older imports referenced `createStyles`. Keeps existing
// import sites compiling if any other file reaches into this module.
export const createStyles = createKPIRowStyles;
