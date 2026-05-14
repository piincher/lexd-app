import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    footer: {
      padding: 16,
      backgroundColor: colors.background.card,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    submitBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#8B5CF6",
      borderRadius: 12,
      paddingVertical: 14,
    },
    submitBtnDisabled: { backgroundColor: "#C4B5FD" },
    submitBtnText: { fontFamily: Fonts.bold, fontSize: 15, color: "Theme.colors.text.inverse" },
  });
