import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: Theme.colors.background.card,
  },
  headerTitle: {
    fontWeight: "600",
  },
  headerSpacer: {
    width: 48,
  },
});
