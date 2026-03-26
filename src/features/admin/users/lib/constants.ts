/**
 * Constants for Client Detail screen
 */

export const COLORS = {
  primary: "#1a5f2a",
  secondary: "#2d8a3e",
  accent: "#3cb853",
  success: "#4cc9f0",
  warning: "#f72585",
  info: "#4895ef",
  light: "#f8f9fa",
  dark: "#212529",
  card: "#ffffff",
  border: "#e9ecef",
  text: "#495057",
  muted: "#6c757d",
};

export const STATUS_CONFIG = {
  Active: { label: "Chargé", color: "#f72585", icon: "cube" },
  "In Transit": { label: "En Transit", color: "#4895ef", icon: "airplane" },
  Inactive: { label: "Livré", color: "#10B981", icon: "checkmark-circle" },
};

export const STATUS_LABELS = ["Active", "In Transit", "Inactive"];
export const INITIAL_COUNTS = { Active: 0, "In Transit": 0, Inactive: 0 };
