import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      marginBottom: 20,
      borderRadius: 20,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      padding: 16,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    headerIcon: {
      width: 30,
      height: 30,
      borderRadius: 10,
      backgroundColor: isDark ? "rgba(34,197,94,0.18)" : "#F0FDF4",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      letterSpacing: -0.2,
    },
    viewAll: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: isDark ? "rgba(34,197,94,0.15)" : "#F0FDF4",
    },
    viewAllText: {
      fontSize: 11,
      fontFamily: Fonts.bold,
      color: colors.primary.main,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    itemDivider: {
      height: 1,
      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      marginLeft: 52,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
    },
    middle: {
      flex: 1,
    },
    clientName: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      letterSpacing: -0.2,
    },
    subRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 2,
    },
    orderCode: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    dot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.text.disabled,
    },
    date: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    statusPill: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
      marginLeft: 8,
    },
    statusText: {
      fontSize: 10,
      fontFamily: Fonts.bold,
      textTransform: "capitalize",
    },
    empty: {
      alignItems: "center",
      paddingVertical: 32,
    },
    emptyIcon: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    emptyTitle: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    emptyText: {
      fontSize: 12,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
  });
