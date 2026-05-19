import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.text.primary,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: colors.text.disabled,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: colors.text.primary,
  },
  verificationCode: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.primary.main,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 4,
  },
});
