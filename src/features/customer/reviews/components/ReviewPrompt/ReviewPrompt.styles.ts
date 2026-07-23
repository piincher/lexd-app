import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
   card: {
     borderWidth: HAIRLINE,
     borderColor: colors.border,
      marginVertical: 12,
      borderRadius: 12,
   },
   content: {
      alignItems: "center",
      paddingVertical: 16,
   },
   title: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: colors.text.primary,
      textAlign: "center",
   },
   goodsLabel: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
   },
   subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
      marginBottom: 4,
   },
   commentInput: {
      width: "100%",
      minHeight: 80,
      maxHeight: 150,
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginTop: 8,
      fontFamily: Fonts.regular,
      fontSize: 14,
   },
   charCount: {
      fontFamily: Fonts.regular,
      fontSize: 11,
      color: colors.text.muted,
      alignSelf: "flex-end",
      marginTop: 4,
   },
   submitButton: {
      marginTop: 12,
      borderRadius: 8,
      width: "100%",
   },
   submitButtonLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
   },
   successIcon: {
      fontSize: 32,
      color: colors.status.success,
      marginBottom: 8,
   },
   successText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: colors.status.success,
      textAlign: "center",
      marginBottom: 4,
   },
   commentPreview: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
      fontStyle: "italic",
   },
   thanksText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: colors.status.success,
      textAlign: "center",
      marginTop: 8,
   },
});
