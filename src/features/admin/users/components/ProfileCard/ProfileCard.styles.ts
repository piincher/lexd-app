import { StyleSheet } from "react-native";
import { COLORS } from "../../lib/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarGradient: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 4,
  },
  phone: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: `${COLORS.primary}15`,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    textTransform: "capitalize",
  },
});
