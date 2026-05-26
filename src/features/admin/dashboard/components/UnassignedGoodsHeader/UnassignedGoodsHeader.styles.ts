import { StyleSheet } from "react-native";

export const createStyles = (colors: any, _isDark?: boolean) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 12,
      gap: 8,
      backgroundColor: colors.background.default,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background.paper,
    },
    titleBlock: {
      flex: 1,
      minWidth: 0,
    },
    eyebrow: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 0.7,
      color: colors.text.secondary,
      marginBottom: 2,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    title: {
      fontSize: 19,
      fontWeight: "800",
      color: colors.text.primary,
      letterSpacing: -0.3,
      flexShrink: 1,
    },
    countChip: {
      backgroundColor: colors.primary.main,
      borderRadius: 999,
      paddingHorizontal: 10,
      minHeight: 22,
      minWidth: 28,
      alignItems: "center",
      justifyContent: "center",
    },
    countChipText: {
      color: colors.text.inverse,
      fontSize: 12,
      fontWeight: "800",
      fontVariant: ["tabular-nums"],
      letterSpacing: 0.2,
    },
    right: {
      width: 40,
      alignItems: "flex-end",
      justifyContent: "center",
    },
  });
