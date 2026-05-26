import { StyleSheet } from "react-native";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
   airMessageContainer: {
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 16,
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: "dashed",
   },
   airMessageIcon: {
      fontSize: 32,
      marginBottom: 8,
   },
   airMessageTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text.primary,
      marginBottom: 4,
   },
   airMessageText: {
      fontSize: 14,
      color: colors.text.secondary,
      textAlign: "center",
   },
   disabledCbmContainer: {
      marginTop: 16,
   },
});
