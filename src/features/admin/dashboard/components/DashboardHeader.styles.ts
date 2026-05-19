import { StyleSheet } from "react-native";
import { Theme } from "@src/constants/Theme";
import { Fonts } from "@src/constants/Fonts";

export const createDashboardHeaderStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    ...Theme.shadows.lg,
  },
  decorCircle1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  dateText: {
    color: colors.text.inverse,
    fontSize: 11,
    fontFamily: Fonts.bold,
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBtnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.94 }],
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingBlock: {
    flex: 1,
    paddingRight: 12,
  },
  greeting: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.text.inverse,
  },
  name: {
    fontSize: 26,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
    marginTop: 2,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: colors.text.inverse,
    marginTop: 6,
  },
  avatarWrap: {
    ...Theme.shadows.md,
  },
  avatarGradient: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.35)",
  },
  avatarText: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
    letterSpacing: -0.5,
  },
});
