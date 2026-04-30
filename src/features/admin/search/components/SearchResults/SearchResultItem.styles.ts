import { ViewStyle, TextStyle } from "react-native";
import { Theme } from "@src/constants/Theme";

export const searchResultItemStyles: Record<string, ViewStyle | TextStyle> = {
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
  },
  resultIconContainer: {
    marginRight: Theme.spacing.md,
  },
  resultIconBg: {
    width: 48,
    height: 48,
    borderRadius: Theme.radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Theme.neutral[800],
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.sm,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  resultSubtitle: {
    fontSize: 13,
    color: Theme.neutral[600],
    marginBottom: 6,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
};
