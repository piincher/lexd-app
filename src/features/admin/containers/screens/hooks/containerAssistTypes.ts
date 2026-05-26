import type { Goods } from '../../../goods/types';

export type ContainerAssistFilter =
  | 'ALL'
  | 'ISSUES'
  | 'UNPAID'
  | 'UNIDENTIFIED'
  | 'DAMAGED'
  | 'READY'
  | 'DELIVERED'
  | 'MISSING_LOCATION';

export type ContainerIssueSeverity = 'error' | 'warning' | 'info';

export interface ContainerHealth {
  goodsCount: number;
  clientCount: number;
  totalCBM: number;
  totalWeight: number;
  totalValue: number;
  totalPaid: number;
  balanceDue: number;
  unpaidCount: number;
  issueGoodsCount: number;
  capacityPercentage: number;
  remainingCapacity: number;
  capacityUnit: 'CBM' | 'kg';
}

export interface ContainerIssue {
  id: string;
  title: string;
  detail: string;
  count: number;
  severity: ContainerIssueSeverity;
}

export interface ContainerClientGroup {
  clientId: string;
  clientName: string;
  clientPhone: string;
  goods: Goods[];
  issueCount: number;
  summary: {
    totalCBM: number;
    totalWeight: number;
    totalItems: number;
    totalValue: number;
    totalPaid: number;
    balanceDue: number;
  };
}

export type ContainerFilterCounts = Record<ContainerAssistFilter, number>;

export interface ContainerClientProfile {
  clientId: string;
  clientName: string;
  clientPhone: string;
}

export interface ContainerClientDirectory {
  byClientId: Record<string, ContainerClientProfile>;
  byGoodsId: Record<string, ContainerClientProfile>;
}
