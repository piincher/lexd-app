import { Container } from '../../types';
import { Goods } from '@src/shared/types';

export interface LoadingListItem {
  sequenceNumber: number;
  goods: Goods;
  clientId: string;
  clientName: string;
  clientColor: string;
  isLoaded: boolean;
}

export interface LoadingSummary {
  totalCBM: number;
  totalWeight: number;
  totalItems: number;
  totalPackages: number;
  capacityPercentage: number;
  maxCBM: number;
  loadedItems: number;
  remainingItems: number;
  loadedCBM: number;
  remainingCBM: number;
}

export interface AdminLoadingListData {
  container: Container;
  items: LoadingListItem[];
  clientColors: Record<string, string>;
  summary: LoadingSummary;
}

export interface WeightDistribution {
  clientId: string;
  clientName: string;
  weight: number;
  percentage: number;
  color: string;
}

// Constants
export const MAX_CBM = 67;

// Client color function
export const CLIENT_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

export const getClientColor = (index: number): string => {
  return CLIENT_COLORS[index % CLIENT_COLORS.length];
};
