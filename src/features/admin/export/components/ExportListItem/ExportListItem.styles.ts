import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  entityBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral[500] + '0A',
  },
  info: {
    flex: 1,
  },
  exportId: {
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  downloadBtn: {
    margin: 0,
    marginTop: -4,
  },
  divider: {
    height: 1,
    marginVertical: 12,
    opacity: 0.6,
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    marginBottom: 2,
  },
  detailValue: {
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scheduledBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[500] + '0A',
  },
  scheduledText: {
    fontWeight: "600",
  },
});
