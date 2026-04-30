import { ExportEntity, ExportFormat, ScheduleFrequency } from "../../types";

export const EXPORT_FORMATS: { value: ExportFormat; label: string; icon: string }[] = [
  { value: "CSV", label: "CSV File", icon: "file-delimited" },
  { value: "EXCEL", label: "Excel Spreadsheet", icon: "file-excel" },
  { value: "JSON", label: "JSON File", icon: "code-json" },
];

export const SCHEDULE_FREQUENCIES: { value: ScheduleFrequency; label: string }[] = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

export const STATUS_OPTIONS: Record<ExportEntity, { value: string; label: string }[]> = {
  GOODS: [
    { value: "RECEIVED_AT_WAREHOUSE", label: "Received at Warehouse" },
    { value: "PACKED", label: "Packed" },
    { value: "ASSIGNED_TO_CONTAINER", label: "Assigned to Container" },
    { value: "LOADED_IN_CONTAINER", label: "Loaded in Container" },
    { value: "IN_TRANSIT", label: "In Transit" },
    { value: "ARRIVED_DESTINATION", label: "Arrived at Destination" },
    { value: "READY_FOR_PICKUP", label: "Ready for Pickup" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "VOID", label: "Void" },
  ],
  CONTAINERS: [
    { value: "BOOKED", label: "Booked" },
    { value: "EMPTY_TO_WAREHOUSE", label: "Empty to Warehouse" },
    { value: "LOADING", label: "Loading" },
    { value: "LOADED", label: "Loaded" },
    { value: "IN_TRANSIT", label: "In Transit" },
    { value: "ARRIVED", label: "Arrived" },
    { value: "DISCHARGED", label: "Discharged" },
    { value: "READY_FOR_PICKUP", label: "Ready for Pickup" },
    { value: "DELIVERED", label: "Delivered" },
  ],
  PAYMENTS: [
    { value: "PENDING", label: "Pending" },
    { value: "COMPLETED", label: "Completed" },
    { value: "FAILED", label: "Failed" },
    { value: "REFUNDED", label: "Refunded" },
  ],
  CLIENTS: [],
  USERS: [
    { value: "user", label: "User" },
    { value: "staff", label: "Staff" },
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Superadmin" },
  ],
  INVOICES: [],
  EXPENSES: [],
  ROUTES: [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
    { value: "COMPLETED", label: "Completed" },
  ],
  CONSIGNEES: [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ],
  TICKETS: [
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "CLOSED", label: "Closed" },
  ],
  NOTIFICATIONS: [
    { value: "PENDING", label: "Pending" },
    { value: "SENT", label: "Sent" },
    { value: "FAILED", label: "Failed" },
  ],
};
