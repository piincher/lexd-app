import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, _isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 14,
      marginHorizontal: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarText: {
      fontFamily: Fonts.bold,
      fontSize: 16,
    },
    headerContent: {
      flex: 1,
      gap: 3,
    },
    name: {
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.primary,
    },
    metaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 11,
      textTransform: "uppercase",
    },
    phone: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    shipmentMeta: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
    },
    route: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.disabled,
    },
    actions: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    actionBtn: {
      flex: 1,
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionBtnDisabled: {
      opacity: 0.5,
    },
    whatsappBtn: {
      borderColor: "#25D366" + "30",
      backgroundColor: "#25D366" + "08",
    },
    callBtn: {
      borderColor: colors.status.info + "30",
      backgroundColor: colors.status.info + "08",
    },
    winbackBtn: {
      borderColor: colors.primary.main + "30",
      backgroundColor: colors.primary.main + "08",
    },
    actionText: {
      fontFamily: Fonts.medium,
      fontSize: 12,
    },
  });
