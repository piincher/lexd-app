import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
});
