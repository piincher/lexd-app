import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
   card: {
      marginVertical: 12,
      borderRadius: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   content: {
      alignItems: "center",
      paddingVertical: 16,
   },
   title: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: Theme.colors.text.primary,
      textAlign: "center",
   },
   goodsLabel: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: Theme.colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
   },
   subtitle: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: Theme.colors.text.secondary,
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
      color: Theme.colors.text.muted,
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
      color: "#22C55E",
      marginBottom: 8,
   },
   successText: {
      fontFamily: Fonts.meduim,
      fontSize: 16,
      color: "#22C55E",
      textAlign: "center",
      marginBottom: 4,
   },
   commentPreview: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: Theme.colors.text.secondary,
      textAlign: "center",
      marginTop: 4,
      fontStyle: "italic",
   },
   thanksText: {
      fontFamily: Fonts.meduim,
      fontSize: 14,
      color: "#22C55E",
      textAlign: "center",
      marginTop: 8,
   },
});
