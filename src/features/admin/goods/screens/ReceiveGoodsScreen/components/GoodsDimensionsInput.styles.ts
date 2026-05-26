import { StyleSheet } from "react-native";
import type { AppTheme } from "@src/constants/Theme";

type ThemeColors = AppTheme["colors"];

export const createStyles = (colors: ThemeColors) =>
   StyleSheet.create({
      card: {
         marginVertical: 8,
         borderRadius: 12,
         backgroundColor: colors.background.card,
      },
      cardContent: {
         padding: 16,
      },
   });
