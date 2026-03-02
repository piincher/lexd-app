/**
 * Packing List Types - Extended types for admin packing and loading lists
 */

import { Goods, ClientInfo } from '../../goods/types';
import { Container } from './index';

/**
 * Client goods group - goods grouped by client
 */
export interface ClientGoodsGroup {
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  goods: Goods[];
  summary: {
    totalCBM: number;
    totalWeight: number;
    totalItems: number;
    totalQuantity: number;
  };
}

/**
 * Container summary for packing/loading lists
 */
export interface ContainerSummary {
  totalCBM: number;
  totalWeight: number;
  totalItems: number;
  totalPackages: number;
  capacityPercentage: number;
  remainingCBM: number;
  maxCBM: number;
}

/**
 * Admin packing list data - complete data structure
 */
export interface AdminPackingListData {
  container: Container;
  clients: ClientGoodsGroup[];
  summary: ContainerSummary;
  generatedAt: string;
  generatedBy: string;
}

/**
 * Loading list item with loading sequence
 */
export interface LoadingListItem {
  sequenceNumber: number;
  goods: Goods;
  clientId: string;
  clientName: string;
  clientColor: string;
  isLoaded: boolean;
  loadedAt?: string;
  loadedBy?: string;
}

/**
 * Loading list data structure
 */
export interface AdminLoadingListData {
  container: Container;
  items: LoadingListItem[];
  clientColors: Record<string, string>;
  summary: ContainerSummary & {
    loadedItems: number;
    remainingItems: number;
    loadedCBM: number;
    remainingCBM: number;
  };
}

/**
 * Weight distribution data
 */
export interface WeightDistribution {
  clientId: string;
  clientName: string;
  weight: number;
  percentage: number;
  color: string;
}

/**
 * Client color palette for loading list visualization
 */
export const CLIENT_COLOR_PALETTE = [
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#D946EF', // Fuchsia
] as const;

/**
 * Get color for client based on index
 */
export const getClientColor = (index: number): string => {
  return CLIENT_COLOR_PALETTE[index % CLIENT_COLOR_PALETTE.length];
};

/**
 * Goods status for loading list
 */
export type LoadingGoodsStatus = 'PENDING' | 'LOADING' | 'LOADED';

/**
 * Loading status labels
 */
export const LOADING_STATUS_LABELS: Record<LoadingGoodsStatus, string> = {
  PENDING: 'En attente',
  LOADING: 'En cours',
  LOADED: 'Chargé',
};

/**
 * Loading status colors
 */
export const LOADING_STATUS_COLORS: Record<LoadingGoodsStatus, string> = {
  PENDING: '#9CA3AF',
  LOADING: '#F59E0B',
  LOADED: '#10B981',
};
