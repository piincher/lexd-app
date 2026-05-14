/**
 * Status color utilities
 */
import { Theme } from "@src/constants/Theme";

export const STATUS_COLORS: Record<string, string> = {
  Active: Theme.status.success,
  "In Transit": Theme.status.warning,
  Delivered: Theme.status.info,
  default: Theme.neutral[500],
};

export const getStatusColor = (status: string): string =>
  STATUS_COLORS[status] || STATUS_COLORS.default;
