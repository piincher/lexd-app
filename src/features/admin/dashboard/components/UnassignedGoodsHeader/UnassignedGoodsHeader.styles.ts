import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text.primary,
    flex: 1,
    textAlign: "center",
  },
  right: {
    width: 32,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
