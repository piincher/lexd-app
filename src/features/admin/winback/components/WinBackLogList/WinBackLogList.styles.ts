import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    loadingContainer: {
      paddingVertical: 40,
      alignItems: "center",
    },
    loadingText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 12,
    },
    listContainer: {
      padding: 16,
    },
    emptyContainer: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.disabled,
      marginTop: 8,
    },
    logItem: {
      backgroundColor: colors.background.card,
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    logHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logUser: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    avatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
    },
    avatarText: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
    },
    logName: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.primary,
    },
    logPhone: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    badgeText: {
      fontFamily: Fonts.BOLD,
      fontSize: 10,
      textTransform: "uppercase",
    },
    logBody: {
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
    },
    logTrigger: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.primary,
    },
    logChannels: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    logPromo: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.status.info,
      marginTop: 2,
    },
    logDate: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.text.disabled,
      marginTop: 8,
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 12,
      gap: 16,
    },
    pageButton: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: colors.background.card,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border.light,
    },
    pageButtonDisabled: {
      opacity: 0.4,
    },
    pageText: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 13,
      color: colors.text.secondary,
    },
  });
