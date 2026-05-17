import { StyleSheet } from "react-native";
import { lightTheme } from "@src/constants/Theme";

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      minHeight: 56,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconButton: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    addButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary.main,
    },
    headerTitle: {
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: "800",
    },
    filters: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    filterChip: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.background.card,
    },
    filterChipActive: {
      borderColor: colors.primary.main,
      backgroundColor: colors.primary.main,
    },
    filterText: {
      color: colors.text.secondary,
      fontSize: 12,
      fontWeight: "700",
    },
    filterTextActive: {
      color: colors.text.inverse,
    },
    loader: {
      marginTop: 40,
    },
    listContent: {
      padding: 16,
    },
    empty: {
      marginTop: 40,
      textAlign: "center",
      color: colors.text.secondary,
    },
  });
