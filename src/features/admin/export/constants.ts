import { Theme } from "@src/constants/Theme";
import { ExportEntity, ExportFormat } from "./types";

export const ENTITY_CONFIG: Record<
  ExportEntity,
  { label: string; icon: string; color: string }
> = {
  GOODS: { label: "Goods", icon: "package-variant", color: Theme.colors.status.info },
  CONTAINERS: { label: "Containers", icon: "truck-container", color: Theme.colors.status.success },
  PAYMENTS: { label: "Payments", icon: "cash-multiple", color: Theme.colors.status.warning },
  CLIENTS: { label: "Clients", icon: "account-group", color: Theme.colors.primary.main },
  USERS: { label: "Users", icon: "account", color: Theme.colors.primary.main },
  INVOICES: { label: "Invoices", icon: "file-document", color: Theme.colors.status.info },
  EXPENSES: { label: "Expenses", icon: "cash-minus", color: Theme.colors.status.error },
  ROUTES: { label: "Routes", icon: "routes", color: Theme.colors.text.secondary },
  CONSIGNEES: { label: "Consignees", icon: "warehouse", color: Theme.colors.text.secondary },
  TICKETS: { label: "Tickets", icon: "ticket", color: Theme.colors.status.error },
  NOTIFICATIONS: { label: "Notifications", icon: "bell", color: Theme.colors.status.info },
};

export const FORMAT_ICONS: Record<ExportFormat, string> = {
  CSV: "file-delimited",
  EXCEL: "file-excel",
  JSON: "code-json",
};

export const STATUS_COLORS: Record<string, string> = {
  COMPLETED: Theme.colors.status.success,
  PENDING: Theme.colors.status.warning,
  PROCESSING: Theme.colors.status.info,
  FAILED: Theme.colors.status.error,
  CANCELLED: Theme.colors.text.disabled,
};
