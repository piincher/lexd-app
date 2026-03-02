export interface Goods {
  _id: string;
  goodsId: string;
  clientId?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  warehouseLocation: string;
  actualCBM: number;
  cbm?: number;
  weight: number;
  quantity: number;
  description: string;
  status: GoodsStatus;
  photos: string[];
  images?: string[];
  totalCost: number;
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
  containerId?: {
    _id: string;
    virtualContainerNumber: string;
  };
  qrCode?: string;
  createdAt: string;
  location?: GoodsLocation;
}

export type GoodsStatus = 
  | 'RECEIVED_AT_WAREHOUSE'
  | 'ASSIGNED_TO_CONTAINER'
  | 'LOADED_IN_CONTAINER'
  | 'IN_TRANSIT'
  | 'ARRIVED_DESTINATION'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

export interface GoodsFilters {
  status?: GoodsStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GoodsLocation {
  type: 'WAREHOUSE' | 'CONTAINER';
  warehouseLocation?: string;
  containerInfo?: {
    containerNumber: string;
    shipmentType: 'air' | 'sea';
  };
}

export interface ScanQRResponse {
  type: 'goods' | 'container';
  data: Goods | any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: any;
}

export interface CreateGoodsInput {
  clientId?: string;
  warehouseLocation?: string;
  actualCBM: number;
  cbm?: number;
  weight: number;
  quantity: number;
  description: string;
  photos?: string[];
  images?: string[];
  totalCost?: number;
  containerId?: string;
}

export interface UpdateGoodsInput {
  warehouseLocation?: string;
  actualCBM?: number;
  cbm?: number;
  weight?: number;
  quantity?: number;
  description?: string;
  status?: GoodsStatus;
  photos?: string[];
  totalCost?: number;
  containerId?: string;
  location?: GoodsLocation;
}
