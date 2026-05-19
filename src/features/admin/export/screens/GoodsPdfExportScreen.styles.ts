import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  body: {
    padding: Theme.spacing.xl,
  },
});
