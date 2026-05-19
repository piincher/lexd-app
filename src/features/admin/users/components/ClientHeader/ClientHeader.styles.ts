import { StyleSheet, Platform } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.text.inverse + "33",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.inverse,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.inverse + "CC",
    marginTop: 2,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.text.inverse + "33",
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.text.inverse + "1A",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.text.inverse + "20",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.inverse,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.inverse + "CC",
    marginTop: 2,
  },
});
