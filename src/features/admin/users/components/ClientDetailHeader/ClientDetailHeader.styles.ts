import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: "500",
  },
});
