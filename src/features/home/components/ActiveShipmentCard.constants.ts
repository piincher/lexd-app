export const SHIP_COLORS = {
  navy: "#1B365D",
  navyLight: "#2D5F8B",
  navyBorder: "#A8C4E0",
  grayLight: "#E8ECF0",
  grayText: "#8E99A4",
} as const;

export type ShipmentStep = 0 | 1 | 2 | 3 | 4;

export const STEPS = [
  { label: "Commande passée", icon: "clipboard-check" as const, lib: "mci" as const },
  { label: "Entrepôt", icon: "warehouse" as const, lib: "mci" as const },
  { label: "En transit", icon: "airplane" as const, lib: "mci" as const },
  { label: "Arrivé", icon: "flag-checkered" as const, lib: "mci" as const },
  { label: "Livré", icon: "check" as const, lib: "feather" as const },
];

export const CURRENT_STATUS_MAP: Record<string, ShipmentStep> = {
  "Order arrived at warehouse": 1,
  "Order in Processing": 1,
  "Order in Transit": 2,
  "Order in Arrived": 3,
  "Delivered": 4,
};

export const getStepFromStatus = (status?: string, currentStatus?: string): ShipmentStep => {
  if (currentStatus && currentStatus in CURRENT_STATUS_MAP) {
    return CURRENT_STATUS_MAP[currentStatus];
  }
  switch (status) {
    case "Delivered": return 4;
    case "In Transit": return 2;
    case "Active": return 1;
    default: return 0;
  }
};

export const BADGE_LABELS: Record<ShipmentStep, string> = {
  0: "En attente",
  1: "En entrepôt",
  2: "En transit",
  3: "Arrivé",
  4: "Livré",
};

export const PROGRESS_MAP: Record<ShipmentStep, number> = {
  0: 5,
  1: 25,
  2: 50,
  3: 75,
  4: 100,
};

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "Non définie";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Non définie";
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
};
