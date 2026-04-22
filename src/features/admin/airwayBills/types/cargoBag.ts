/**
 * CargoBag Types
 */

export type CargoBagStatus =
  | 'PACKED'
  | 'CHECKED_IN'
  | 'LOADED'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'CLEARED';

export interface CargoBag {
  _id: string;
  bagNumber: string;
  awbId: string;
  goodsIds: string[];
  totalWeight: number;
  totalPackages: number;
  status: CargoBagStatus;
  notes?: string;
  arrivedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CargoBagFilters {
  awbId?: string;
}

export interface CreateCargoBagInput {
  awbId: string;
  notes?: string;
}

export interface UpdateCargoBagInput {
  notes?: string;
}

export interface CargoBagGoodsInput {
  goodsIds: string[];
}

export interface CargoBagApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface CargoBagListResponse {
  cargoBags: CargoBag[];
}
