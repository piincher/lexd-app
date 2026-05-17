/**
 * ETA Types
 */

export type ETAConfidence =
  | 'actual'
  | 'medium'
  | 'low'
  | 'fallback'
  | 'unknown'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW';

export type ETASource =
  | 'actual_delivery'
  | 'waypoint'
  | 'route'
  | 'historical_average'
  | 'shipping_mode_default'
  | 'insufficient_data'
  | string;

export interface ContainerETA {
  estimatedArrival?: string | Date | null;
  source?: ETASource;
  confidence?: ETAConfidence;
  isDelayed?: boolean;
  delayDays?: number;
  daysRemaining?: number | null;
}
