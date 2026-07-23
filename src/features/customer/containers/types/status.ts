import { CUSTOMER_CONTAINER_STATUS_LABELS } from '@src/shared/lib/customerStatus';

/**
 * Customer Container Status Types and Constants
 */

/**
 * Container status for customer tracking (simplified from admin status)
 */
export type CustomerContainerStatus =
  | 'BOOKED'
  | 'EMPTY_TO_WAREHOUSE'
  | 'LOADING'
  | 'LOADED'
  | 'GATE_IN_FULL'
  | 'LOADED_ON_VESSEL'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'DISCHARGED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

/**
 * Customer container status display labels (French)
 */
export const CUSTOMER_STATUS_LABELS: Record<CustomerContainerStatus, string> =
  CUSTOMER_CONTAINER_STATUS_LABELS as Record<CustomerContainerStatus, string>;

/** Minimal shape needed from the active theme palette. */
type StatusPalette = {
  primary: { 200: string; 300: string; 400: string; 500: string; 600: string; 700: string };
  accent: { amber: string };
};

/**
 * Customer container status colors, resolved from the theme.
 *
 * These were previously eleven hardcoded hues (purple, indigo, cyan, three
 * blues, teal...) which ignored dark mode and sat outside the LEXD palette.
 * They now walk down the green ramp so the eleven stages read as one journey
 * deepening toward delivery.
 *
 * READY_FOR_PICKUP is the single amber step. It is the only status that
 * requires the customer to do something, so it gets the accent — that is what
 * the accent is for, and a list of containers should have one obvious
 * call to action rather than several competing colors.
 */
export const getCustomerStatusColors = (
  colors: StatusPalette,
): Record<CustomerContainerStatus, string> => ({
  BOOKED: colors.primary[200],
  EMPTY_TO_WAREHOUSE: colors.primary[200],
  LOADING: colors.primary[300],
  LOADED: colors.primary[300],
  GATE_IN_FULL: colors.primary[400],
  LOADED_ON_VESSEL: colors.primary[400],
  IN_TRANSIT: colors.primary[500],
  ARRIVED: colors.primary[600],
  DISCHARGED: colors.primary[600],
  READY_FOR_PICKUP: colors.accent.amber,
  DELIVERED: colors.primary[700],
});

/**
 * Derive a status background from the foreground color at reduced opacity.
 * Usage: getCustomerStatusColors(colors)[status] + '15'
 */
