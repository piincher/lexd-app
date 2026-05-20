import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    cardArchived: {
      opacity: 0.7,
      borderColor: colors.neutral[200],
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    typeBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    typeText: {
      fontFamily: Fonts.BOLD,
      fontSize: 11,
      textTransform: "uppercase",
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
      backgroundColor: colors.neutral[100],
    },
    statusText: {
      fontFamily: Fonts.BOLD,
      fontSize: 11,
      color: colors.text.disabled,
      textTransform: "uppercase",
    },
    title: {
      fontFamily: Fonts.BOLD,
      fontSize: 15,
      color: colors.text.primary,
      marginBottom: 4,
    },
    message: {
      fontFamily: Fonts.REGULAR,
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
      marginBottom: 10,
    },
    metaRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 12,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    metaText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.disabled,
    },
    actionRow: {
      flexDirection: "row",
      gap: 10,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    archiveButton: {
      marginLeft: "auto",
    },
    actionText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 12,
    },
  });
