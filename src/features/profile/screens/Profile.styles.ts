import { StyleSheet } from "react-native";

export const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    letterSpacing: -0.2,
  },
  achievementsCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.status.error + '25',
  },
  logoutPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  logoutText: {
    fontSize: 15,
    color: colors.status.error,
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  versionText: {
    fontSize: 12,
    marginTop: -20,
  },
  footerDivider: {
    width: 40,
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  madeWithLove: {
    fontSize: 11,
    textAlign: "center",
  },
  madeWithLoveDetail: {
    fontSize: 10,
    marginTop: 3,
    textAlign: "center",
    opacity: 0.7,
  },
});
