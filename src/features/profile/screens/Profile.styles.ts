import { StyleSheet } from "react-native";
import type { ThemeContextType } from "@src/constants/Theme";

type AppColors = ThemeContextType["colors"];

export const getStyles = (_colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
      paddingTop: 4,
      paddingBottom: 36,
    },
  });
