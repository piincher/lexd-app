import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.feedback.successBg,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    goodsId: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text.primary,
    },
    description: {
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
    },
    client: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.text.secondary,
      marginTop: 4,
    },
    phone: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 1,
    },
    right: {
      alignItems: "center",
      marginLeft: 8,
    },
    badge: {
      borderWidth: 1.5,
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    daysText: {
      fontSize: 12,
      fontWeight: "700",
    },
    chevron: {
      marginTop: 8,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    date: {
      fontSize: 12,
      color: colors.text.disabled,
      flex: 1,
    },
    modeBadge: {
      backgroundColor: colors.feedback.infoBg,
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    modeText: {
      fontSize: 11,
      fontWeight: "700",
      color: colors.status.info,
    },
  });
