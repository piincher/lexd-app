import { StyleSheet } from "react-native";
import { COLORS } from "../../lib/constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  value: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: "600",
    textAlign: "center",
  },
});
