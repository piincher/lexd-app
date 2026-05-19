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
  statusCard: {
    margin: 16,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusChip: {
    height: 32,
  },
  statsRow: {
    marginTop: 8,
  },
  lastRunText: {
    marginTop: 4,
    color: colors.text.secondary,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 12,
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
    fontWeight: "600",
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    height: 28,
  },
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
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateText: {
    color: colors.text.secondary,
  },
  restoreInfo: {
    marginTop: 8,
    paddingTop: 8,
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
