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
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
  actualCBM: number;
  cbm?: number;
  weight: number;
  quantity: number;
  description: string;
  expressTrackingNumber?: string;
  shippingMode?: 'AIR' | 'SEA';
  status: GoodsStatus;
  photos: string[];
  images?: string[];
  unitPrice?: number;
  totalCost: number;
  amountPaid?: number;
  balanceDue?: number;
  paymentStatus: 'UNPAID' | 'PARTIAL' | 'PAID';
  paymentHistory?: {
    paymentId: string;
    amount: number;
    date: string;
  }[];
  containerId?: {
    _id: string;
    virtualContainerNumber: string;
    shippingLine?: string;
    status?: string;
  };
  loadingPosition?: {
    section?: 'FRONT' | 'MIDDLE' | 'BACK';
    description?: string;
    sequenceNumber?: number;
  };
  receivedAt?: string;
  receivedByName?: string;
  readyForPickupAt?: string;
  deliveredAt?: string;
  pickedUpBy?: string;
  pickupNotes?: string;
  qrCode?: string;
  qrCodeImageUrl?: string;
  qrCodeData?: string;
  airwayBillId?: {
    _id: string;
    awbNumber: string;
    flightNumber: string;
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    departureDate?: string;
    estimatedArrivalDate?: string;
    actualArrivalDate?: string;
    status: string;
  };
  createdAt: string;
  location?: GoodsLocation;
}

export type GoodsStatus = 
  | 'RECEIVED_AT_WAREHOUSE'
  | 'PACKED'
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
  unitPrice?: number;
  shippingMode?: 'AIR' | 'SEA';
  dimensions?: { length: number; width: number; height: number };
  receivedByName?: string;
  photosToKeep?: string[];
  newPhotoUris?: string[];
}
