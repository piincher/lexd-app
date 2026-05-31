import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

export const createStyles = (colors: ThemeContextType["colors"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    flex: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingRight: Theme.spacing.lg,
      paddingVertical: Theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background.card,
    },
    headerText: {
      flex: 1,
    },
    eyebrow: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.text.secondary,
      textTransform: "uppercase",
    },
    title: {
      fontSize: 20,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    content: {
      padding: Theme.spacing.lg,
      paddingBottom: Theme.spacing.xl,
    },
  });
