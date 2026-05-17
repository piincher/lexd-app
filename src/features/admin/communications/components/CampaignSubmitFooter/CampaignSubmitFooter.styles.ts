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
      backgroundColor: colors.primary.main,
      borderRadius: 12,
      paddingVertical: 14,
    },
    submitBtnDisabled: { backgroundColor: colors.primary.light },
    submitBtnText: { fontFamily: Fonts.bold, fontSize: 15, color: colors.text.inverse },
  });
