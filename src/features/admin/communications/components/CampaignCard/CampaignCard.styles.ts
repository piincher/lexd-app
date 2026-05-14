import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from '@src/constants/Theme';

export const createCardStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    cardTitle: {
      flex: 1,
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.primary,
      marginRight: 8,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    badgeText: { fontFamily: Fonts.medium, fontSize: 12 },

    cardBody: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 10,
      lineHeight: 18,
    },

    cardMeta: { gap: 4, marginBottom: 8 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    metaText: { fontFamily: Fonts.regular, fontSize: 12, color: colors.text.secondary },

    statsRow: { marginBottom: 8 },
    statText: { fontFamily: Fonts.medium, fontSize: 13 },

    actions: { flexDirection: "row", gap: 8, marginTop: 4 },
    sendBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      backgroundColor: "#8B5CF6",
      borderRadius: 8,
      paddingVertical: 10,
    },
    sendBtnText: { fontFamily: Fonts.medium, fontSize: 13, color: "Theme.colors.text.inverse" },
    cancelBtn: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cancelBtnText: { fontFamily: Fonts.medium, fontSize: 13, color: colors.text.secondary },
  });
