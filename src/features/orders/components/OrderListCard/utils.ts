import { CUSTOMER_ORDER_STATUS_LABELS } from '@src/shared/lib/customerStatus';

/** Minimal shape needed from the active theme palette. */
type StatusColors = {
   primary: { 300: string; 500: string; 700: string };
   accent: { amber: string };
   text: { muted: string };
};

export type StatusEntry = { label: string; color: string };

/**
 * Order status colors, resolved from the theme.
 *
 * These were previously hardcoded hexes (navy/blue/teal/gray/amber), which
 * meant they ignored dark mode and sat outside the LEXD palette. They now walk
 * down the green ramp so the sequence reads as progress toward delivery, with
 * amber marking "In Transit" — the one state actively in motion.
 */
export const getStatusConfig = (colors: StatusColors): Record<string, StatusEntry> => ({
   Inactive: { label: CUSTOMER_ORDER_STATUS_LABELS.Inactive, color: colors.text.muted },
   Active: { label: CUSTOMER_ORDER_STATUS_LABELS.Active, color: colors.primary[300] },
   "In Transit": { label: CUSTOMER_ORDER_STATUS_LABELS["In Transit"], color: colors.accent.amber },
   Arrived: { label: CUSTOMER_ORDER_STATUS_LABELS.Arrived, color: colors.primary[500] },
   Delivered: { label: CUSTOMER_ORDER_STATUS_LABELS.Delivered, color: colors.primary[700] },
});

export type StepIndex = 0 | 1 | 2 | 3 | 4;

export const STEP_PROGRESS: Record<StepIndex, number> = {
   0: 5,
   1: 25,
   2: 50,
   3: 75,
   4: 100,
};

export const getStepStatusConfig = (
   colors: StatusColors,
): Record<StepIndex, StatusEntry> => {
   const status = getStatusConfig(colors);
   return {
      0: status.Inactive,
      1: status.Active,
      2: status["In Transit"],
      3: status.Arrived,
      4: status.Delivered,
   };
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
