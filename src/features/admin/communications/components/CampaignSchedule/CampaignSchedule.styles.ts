import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    field: { gap: 8 },
    label: { fontFamily: Fonts.semiBold, fontSize: 14, color: colors.text.secondary },
    dateInput: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 13,
    },
    dateText: {
      flex: 1,
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
    hint: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
      fontStyle: "italic",
    },
    draftToggle: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.text.disabled,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxActive: { backgroundColor: colors.primary.main, borderColor: colors.primary.main },
    draftLabel: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
  });
