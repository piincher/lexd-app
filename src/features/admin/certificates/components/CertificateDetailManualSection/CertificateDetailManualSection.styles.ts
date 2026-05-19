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
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 4,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
  },
  noteContent: {
    flex: 1,
  },
  noteLabel: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: colors.text.disabled,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: colors.status.warning,
    lineHeight: 20,
  },
});
