import { StyleSheet } from "react-native";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const createStyles = (colors: ThemeColors) => StyleSheet.create({
   toggleContainer: {
      borderRadius: 12,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
   },
   toggleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
   },
   toggleInfo: {
      flex: 1,
   },
   toggleLabel: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.text.primary,
   },
   toggleHint: {
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
   },
   toggleSwitch: {
      width: 52,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.neutral[200],
      padding: 4,
      marginLeft: 12,
   },
   toggleSwitchActive: {
      backgroundColor: colors.status.success,
   },
   toggleThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
   },
   toggleThumbActive: {
      transform: [{ translateX: 20 }],
   },
});
