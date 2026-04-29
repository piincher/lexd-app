import { ExportEntity, ExportFormat } from "./types";

export const ENTITY_CONFIG: Record<
  ExportEntity,
  { label: string; icon: string; color: string }
> = {
  GOODS: { label: "Goods", icon: "package-variant", color: "#2196F3" },
  CONTAINERS: { label: "Containers", icon: "truck-container", color: "#4CAF50" },
  PAYMENTS: { label: "Payments", icon: "cash-multiple", color: "#FF9800" },
  CLIENTS: { label: "Clients", icon: "account-group", color: "#9C27B0" },
  USERS: { label: "Users", icon: "account", color: "#673AB7" },
  INVOICES: { label: "Invoices", icon: "file-document", color: "#00BCD4" },
  EXPENSES: { label: "Expenses", icon: "cash-minus", color: "#F44336" },
  ROUTES: { label: "Routes", icon: "routes", color: "#795548" },
  CONSIGNEES: { label: "Consignees", icon: "warehouse", color: "#607D8B" },
  TICKETS: { label: "Tickets", icon: "ticket", color: "#E91E63" },
  NOTIFICATIONS: { label: "Notifications", icon: "bell", color: "#3F51B5" },
};

export const FORMAT_ICONS: Record<ExportFormat, string> = {
  CSV: "file-delimited",
  EXCEL: "file-excel",
  JSON: "code-json",
};

export const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#4CAF50",
  PENDING: "#FF9800",
  PROCESSING: "#2196F3",
  FAILED: "#F44336",
  CANCELLED: "#9E9E9E",
};
