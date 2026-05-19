import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  empty: {
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
});
