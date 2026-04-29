export interface DualLedger {
  clientTotalCBM: number;
  clientTotalRevenue: number;
  agentTotalCBM: number | null;
  agentUnitCost: number;
  agentTotalCost: number | null;
  realTimeProfit: number;
  reconciledProfit: number | null;
  profitGap: number | null;
  unbilledCapacityCost: number | null;
  reconciliationStatus: 'PENDING' | 'RECONCILED';
  reconciledAt?: string | null;
}

export interface CbmProfit {
  revenue: number;
  collected: number;
  cost: number;
  profit: number;
  profitMargin: number;
  totalCBM: number;
  cbmCostPerUnit: number;
  dualLedger?: DualLedger;
}
