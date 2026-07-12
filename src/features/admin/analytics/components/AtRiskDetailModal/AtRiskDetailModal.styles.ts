import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme['colors'];

export const getStyles = (colors: ThemeColors, _isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "flex-end",
    },
    sheet: {
      backgroundColor: colors.background.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      maxHeight: "85%",
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 20,
      alignItems: "center",
    },
    header: {
      alignSelf: "flex-end",
    },
    closeBtn: {
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    avatarText: {
      fontFamily: Fonts.bold,
      fontSize: 24,
    },
    name: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      textAlign: "center",
      marginBottom: 8,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 3,
      borderRadius: 8,
      marginBottom: 20,
    },
    badgeText: {
      fontFamily: Fonts.bold,
      fontSize: 12,
      textTransform: "uppercase",
    },
    details: {
      width: "100%",
      gap: 14,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    detailText: {
      flex: 1,
    },
    detailLabel: {
      fontFamily: Fonts.medium,
      fontSize: 11,
      color: colors.text.disabled,
      textTransform: "uppercase",
    },
    detailValue: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
      marginTop: 1,
    },
    actions: {
      flexDirection: "row",
      gap: 10,
      padding: 16,
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
      paddingVertical: 12,
      borderRadius: 12,
      backgroundColor: colors.background.default,
      borderWidth: 1,
    },
    actionBtnDisabled: {
      opacity: 0.4,
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
      fontSize: 13,
    },
  });
