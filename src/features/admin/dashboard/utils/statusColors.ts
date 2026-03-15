/**
 * Status color utilities
 */

export const STATUS_COLORS: Record<string, string> = {
  Active: "#4CAF50",
  "In Transit": "#FF9800",
  Delivered: "#2196F3",
  default: "#757575",
};

export const getStatusColor = (status: string): string =>
  STATUS_COLORS[status] || STATUS_COLORS.default;
