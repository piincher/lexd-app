import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";
import type { ThemeContextType } from "@src/constants/Theme";

export const createStyles = (colors: ThemeContextType["colors"]) =>
  StyleSheet.create({
    container: {
      gap: Theme.spacing.sm,
    },
    label: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: Theme.spacing.sm,
    },
    input: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    addButton: {
      width: 46,
      height: 46,
      borderRadius: Theme.radius.md,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary[500],
    },
    addButtonDisabled: {
      backgroundColor: colors.neutral[300],
    },
    chipsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Theme.spacing.sm,
    },
    chip: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingLeft: Theme.spacing.sm + 2,
      paddingRight: 6,
      paddingVertical: 6,
      borderRadius: Theme.radius.full,
      backgroundColor: colors.primary[50],
      borderWidth: 1,
      borderColor: colors.primary[200],
    },
    chipText: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.primary[700],
    },
  });
