import { StyleSheet } from "react-native";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 32,
    flexGrow: 1,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 10,
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  // Card styles
  card: {
    borderRadius: 14,
    padding: 14,
    backgroundColor: colors.background.card,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backupInfo: {
    flex: 1,
  },
  backupId: {
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  chipRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  // Status card
  statusCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    padding: 14,
    backgroundColor: colors.background.card,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusLabel: {
    fontWeight: "600",
    marginBottom: 2,
  },
  statusMeta: {
    color: colors.text.secondary,
  },
  statusChip: {
    height: 28,
  },
  statsRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statsText: {
    color: colors.text.secondary,
  },
  lastRunText: {
    marginTop: 4,
    color: colors.text.secondary,
  },
  // Details
  detailsRow: {
    flexDirection: "row",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    color: colors.text.secondary,
    marginBottom: 2,
  },
  detailValue: {
    fontWeight: "600",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dateText: {
    color: colors.text.secondary,
  },
  restoreInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  restoreText: {
    color: colors.primary.main,
    fontStyle: "italic",
  },
  empty: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptySubtext: {
    color: colors.text.secondary,
    marginTop: 8,
  },
  dialogTitle: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "700",
  },
  warningText: {
    marginTop: 12,
    color: colors.status.error,
  },
});
