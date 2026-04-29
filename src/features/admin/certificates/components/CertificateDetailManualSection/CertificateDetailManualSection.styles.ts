import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from "@src/constants/Theme";

export const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Theme.colors.text.primary,
    marginBottom: 10,
    paddingLeft: 4,
  },
  sectionCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
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
    color: Theme.colors.text.disabled,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: Theme.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.neutral[100],
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
    color: Theme.colors.text.disabled,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#92400E",
    lineHeight: 20,
  },
});
