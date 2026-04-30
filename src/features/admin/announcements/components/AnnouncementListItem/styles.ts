import { StyleSheet } from "react-native";
import { lightTheme } from "@src/constants/Theme";

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 8,
      padding: 14,
      gap: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row",
      gap: 8,
      alignItems: "flex-start",
    },
    title: {
      flex: 1,
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: "800",
    },
    status: {
      color: colors.text.secondary,
      fontSize: 11,
      fontWeight: "800",
    },
    published: {
      color: colors.status.success,
    },
    message: {
      color: colors.text.secondary,
      fontSize: 13,
      lineHeight: 18,
    },
    metaRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    meta: {
      color: colors.text.secondary,
      fontSize: 11,
      fontWeight: "700",
    },
    actions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
  });
