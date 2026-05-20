import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { ThemeColors } from "@src/constants/Theme";

export const getStyles = (colors: ThemeColors, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
    },
    container: {
      backgroundColor: colors.background.paper,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "85%",
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    headerTitle: {
      flex: 1,
      fontFamily: Fonts.BOLD,
      fontSize: 18,
      color: colors.text.primary,
    },
    closeButton: {
      padding: 4,
    },
    loadingContainer: {
      paddingVertical: 60,
      alignItems: "center",
    },
    loadingText: {
      fontFamily: Fonts.REGULAR,
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 12,
    },
    summaryBar: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 14,
      gap: 16,
    },
    summaryItem: {
      flex: 1,
      backgroundColor: colors.background.default,
      borderRadius: 12,
      padding: 12,
      alignItems: "center",
    },
    summaryValue: {
      fontFamily: Fonts.BOLD,
      fontSize: 22,
      color: colors.primary.main,
    },
    summaryLabel: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    list: {
      paddingHorizontal: 20,
      paddingBottom: 32,
    },
    userRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.light,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarText: {
      fontFamily: Fonts.BOLD,
      fontSize: 14,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontFamily: Fonts.MEDIUM,
      fontSize: 14,
      color: colors.text.primary,
    },
    userPhone: {
      fontFamily: Fonts.REGULAR,
      fontSize: 12,
      color: colors.text.secondary,
    },
    userExtra: {
      fontFamily: Fonts.REGULAR,
      fontSize: 11,
      color: colors.status.info,
      marginTop: 2,
    },
  });
