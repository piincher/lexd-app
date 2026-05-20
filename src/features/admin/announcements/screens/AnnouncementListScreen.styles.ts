import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: Record<string, unknown>, isDark?: boolean) =>
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
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background.card,
    },
    iconButton: {
      width: 48,
      height: 48,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitleContainer: {
      flex: 1,
    },
    headerTitle: {
      color: colors.text.primary,
      fontSize: 18,
      fontFamily: Fonts.BOLD,
    },
    headerSubtitle: {
      color: colors.text.secondary,
      fontSize: 13,
      fontFamily: Fonts.REGULAR,
      marginTop: 2,
    },
    addButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary.main,
    },
    loader: {
      paddingVertical: 40,
      alignItems: "center",
    },
    loaderText: {
      marginTop: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
    },
    listContent: {
      paddingTop: 12,
    },
    empty: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      marginTop: 12,
      textAlign: "center",
      color: colors.text.disabled,
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 16,
      gap: 16,
    },
    pageButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    pageButtonDisabled: {
      opacity: 0.4,
    },
    pageText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.secondary,
    },
  });
