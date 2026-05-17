/**
 * Chart Data Analytics Types
 */

export interface ChartDataPoint {
  label: string;
  value: number;
  valueFCFA?: number;
  color?: string;
}

export interface LineChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

export interface BarChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color: string;
  }>;
}

export interface PieChartData {
  labels: string[];
  data: number[];
  colors: string[];
}
