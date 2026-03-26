import { StyleSheet } from "react-native";
import { COLORS } from "../../lib/constants";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    fontWeight: "500",
  },
});
