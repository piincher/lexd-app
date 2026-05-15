import { ExportEntity, ExportFormat } from "./types";

export const getEntityConfig = (colors: any): Record<
  ExportEntity,
  { label: string; icon: string; color: string }
> => ({
  GOODS: { label: "Goods", icon: "package-variant", color: colors.status.info },
  CONTAINERS: { label: "Containers", icon: "truck-cargo-container", color: colors.status.success },
  PAYMENTS: { label: "Payments", icon: "cash-multiple", color: colors.status.warning },
  CLIENTS: { label: "Clients", icon: "account-group", color: colors.primary.main },
  USERS: { label: "Users", icon: "account", color: colors.primary.main },
  INVOICES: { label: "Invoices", icon: "file-document", color: colors.status.info },
  EXPENSES: { label: "Expenses", icon: "cash-minus", color: colors.status.error },
  ROUTES: { label: "Routes", icon: "routes", color: colors.text.secondary },
  CONSIGNEES: { label: "Consignees", icon: "warehouse", color: colors.text.secondary },
  TICKETS: { label: "Tickets", icon: "ticket", color: colors.status.error },
  NOTIFICATIONS: { label: "Notifications", icon: "bell", color: colors.status.info },
});

export const FORMAT_ICONS: Record<ExportFormat, string> = {
  CSV: "file-delimited",
  EXCEL: "file-excel",
  JSON: "code-json",
};

export const getStatusColors = (colors: any): Record<string, string> => ({
  COMPLETED: colors.status.success,
  PENDING: colors.status.warning,
  PROCESSING: colors.status.info,
  FAILED: colors.status.error,
  CANCELLED: colors.text.disabled,
});
