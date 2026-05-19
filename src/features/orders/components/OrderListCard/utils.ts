export const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
   Active: { label: "En cours", color: "#1B365D" },
   "In Transit": { label: "En transit", color: "#2D8FDB" },
   Delivered: { label: "Livré", color: "#1AAE7E" },
   Inactive: { label: "En attente", color: "#8E99A4" },
   Arrived: { label: "Arrivé", color: "#F59E0B" },
};

export type StepIndex = 0 | 1 | 2 | 3 | 4;

export const STEP_PROGRESS: Record<StepIndex, number> = {
   0: 5,
   1: 25,
   2: 50,
   3: 75,
   4: 100,
};

export const STEP_STATUS_CONFIG: Record<StepIndex, { label: string; color: string }> = {
   0: STATUS_CONFIG.Inactive,
   1: STATUS_CONFIG.Active,
   2: STATUS_CONFIG["In Transit"],
   3: STATUS_CONFIG.Arrived,
   4: STATUS_CONFIG.Delivered,
};

const CURRENT_STATUS_MAP: Record<string, StepIndex> = {
   "Order arrived at warehouse": 1,
   "Order in Processing": 1,
   "Order in Transit": 2,
   "Order in Arrived": 3,
   "Delivered": 4,
};

export const getStep = (status?: string, currentStatus?: string): StepIndex => {
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

export const formatShortDate = (dateStr?: string): string => {
   if (!dateStr) return "--";
   const date = new Date(dateStr);
   if (isNaN(date.getTime())) return "--";
   return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
   });
};
