/**
 * BadgesScreenSkeleton Styles
 */

import { StyleSheet } from "react-native";
import { HAIRLINE, RADIUS } from "@src/shared/ui/designLanguage";

export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    summaryCard: {
      backgroundColor: hexToRgba(colors.text.inverse, 0.07),
      borderRadius: RADIUS.card,
      padding: 20,
      marginBottom: 24,
      borderWidth: HAIRLINE,
      borderColor: hexToRgba(colors.accent.gold, 0.15),
    },
    summaryRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    summaryItem: {
      alignItems: "center",
      flex: 1,
    },
  });
