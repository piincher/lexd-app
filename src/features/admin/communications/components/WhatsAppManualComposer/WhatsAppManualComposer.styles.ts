import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

export const createStyles = (colors: ThemeContextType["colors"]) =>
  StyleSheet.create({
    container: {
      gap: Theme.spacing.md,
    },
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Theme.spacing.md,
      paddingVertical: Theme.spacing.sm,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statusLabel: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    statusValue: {
      fontSize: 13,
      fontFamily: Fonts.bold,
    },
    form: {
      padding: Theme.spacing.md,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      gap: Theme.spacing.md,
    },
    input: {
      backgroundColor: colors.background.default,
    },
    messageInput: {
      minHeight: 140,
    },
    segment: {
      backgroundColor: colors.background.default,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: Theme.spacing.md,
    },
    count: {
      flex: 1,
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    sendButton: {
      borderRadius: 8,
    },
  });
