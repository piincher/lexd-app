import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

export const createStyles = (colors: ThemeContextType["colors"]) =>
  StyleSheet.create({
    container: {
      gap: Theme.spacing.sm,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    statusText: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    label: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    input: {
      backgroundColor: colors.background.default,
      maxHeight: 140,
    },
    tokensRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: Theme.spacing.sm,
    },
    tokensHint: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.disabled,
    },
    tokenChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      paddingHorizontal: Theme.spacing.sm,
      paddingVertical: 5,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.primary[50],
      borderWidth: 1,
      borderColor: colors.primary[200],
    },
    tokenText: {
      fontSize: 11,
      fontFamily: Fonts.medium,
      color: colors.primary[700],
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Theme.spacing.md,
      marginTop: 2,
    },
    count: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    sendButton: {
      borderRadius: Theme.radius.md,
    },
  });
