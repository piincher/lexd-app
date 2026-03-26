import { StyleSheet } from "react-native";
import { COLORS } from "../../lib/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 16,
    textAlign: "center",
  },
  emptyContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 40,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.muted,
    marginTop: 16,
    textAlign: "center",
  },
});
