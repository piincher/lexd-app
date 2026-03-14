export interface ReceiveGoodsInput {
  clientId: string;
  description: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  actualCBM?: number;
  weight: number;
  quantity: number;
  unitPrice: number;
  location: string;
  photoUrl?: string;
}

export interface UpdateLocationInput {
  location: string;
}

// Re-export from goods api
export type { Goods, GoodsStatus, GoodsFilters } from '@src/features/goods/api';
