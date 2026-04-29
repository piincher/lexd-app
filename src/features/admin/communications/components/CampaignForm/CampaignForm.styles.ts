import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    field: { gap: 8 },
    label: { fontFamily: Fonts.semiBold, fontSize: 14, color: colors.text.secondary },
    input: {
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
    },
    textArea: { minHeight: 100, textAlignVertical: "top", paddingTop: 12 },
    charCount: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.disabled,
      textAlign: "right",
    },
    previewBox: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: isDark ? "#4C1D95" : "#EDE9FE",
      gap: 10,
    },
    previewLabel: {
      fontFamily: Fonts.semiBold,
      fontSize: 12,
      color: isDark ? "#C4B5FD" : "#7C3AED",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    notificationPreview: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      backgroundColor: isDark ? "#2E1065" : "#F5F3FF",
      borderRadius: 10,
      padding: 12,
    },
    previewIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: isDark ? "#4C1D95" : "#EDE9FE",
      alignItems: "center",
      justifyContent: "center",
    },
    previewContent: { flex: 1 },
    previewTitle: {
      fontFamily: Fonts.bold,
      fontSize: 13,
      color: colors.text.primary,
      marginBottom: 2,
    },
    previewBody: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      lineHeight: 17,
    },
  });
