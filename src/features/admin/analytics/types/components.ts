/**
 * Component Props Analytics Types
 */

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export type DateRangePreset = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface ChartProps {
  width?: number;
  height?: number;
  showLegend?: boolean;
  showLabels?: boolean;
}
