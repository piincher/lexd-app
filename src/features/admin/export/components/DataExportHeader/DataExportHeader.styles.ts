import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: colors.background.card,
  },
  headerTitle: {
    fontWeight: "600",
  },
  headerSpacer: {
    width: 48,
  },
});
