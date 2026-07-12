/**
 * AirwayBill Feature Types
 */

export type AirwayBillStatus =
  | 'CREATED'
  | 'PACKING'
  | 'READY_FOR_DEPARTURE'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERED';

export type AirwayBillWaypointStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELAYED'
  | 'CANCELLED';

export type AirwayBillWaypointType = 'AIRPORT' | 'CUSTOMS' | 'WAREHOUSE' | 'CONTAINER';
export type AirwayBillWaypointSegmentType = 'AIR' | 'CUSTOMS' | 'WAREHOUSE' | 'ROAD' | 'CONTAINER';

export type AirwayBillJourneyStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELAYED'
  | 'ON_HOLD';

export interface AirwayBillWaypointLocation {
  city: string;
  country: string;
  countryCode: string;
  portCode?: string;
  warehouse?: string;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

export interface AirwayBillWaypointDetails {
  airline?: string;
  flightNumber?: string;
  airwayBillNumber?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  trackingUrl?: string;
}

export interface AirwayBillWaypointWarehouseDetails {
  warehouseName?: string;
  warehouseCode?: string;
  address?: string;
  contactName?: string;
  contactPhone?: string;
  operatingHours?: string;
}

export interface AirwayBillWaypoint {
  _id?: string;
  order: number;
  location: AirwayBillWaypointLocation;
  segmentType: AirwayBillWaypointSegmentType;
  type: AirwayBillWaypointType;
  status: AirwayBillWaypointStatus;
  description?: string;
  shortName?: string;
  icon?: string;
  estimatedArrival?: string | null;
  actualArrival?: string | null;
  estimatedDeparture?: string | null;
  actualDeparture?: string | null;
  durationHours?: number;
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
  airDetails?: AirwayBillWaypointDetails;
  warehouseDetails?: AirwayBillWaypointWarehouseDetails;
  notes?: string;
  updatedAt?: string;
}

export interface AirwayBillWaypointPayload {
  airwayBillId?: string;
  awbNumber?: string;
  cargoBagId?: string;
  bagNumber?: string;
  routeKey?: string;
  routeName?: string;
  shippingMode: 'AIR';
  status: AirwayBillStatus;
  journeyStatus: AirwayBillJourneyStatus;
  waypoints: AirwayBillWaypoint[];
  currentWaypointIndex: number;
  totalWaypoints: number;
  progressPercentage: number;
  hasWaypoints: boolean;
}

export interface AirCargoRouteOption {
  key: string;
  name: string;
  description: string;
  origin: string;
  destination: string;
}

export interface AirwayBill {
  _id: string;
  awbNumber: string;
  flightNumber?: string;
  airline?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: string;
  estimatedArrivalDate?: string;
  actualArrivalDate?: string | null;
  consigneeId?: string | AirwayBillConsignee | null;
  status: AirwayBillStatus;
  waypoints?: AirwayBillWaypoint[];
  currentWaypointIndex?: number;
  totalWaypoints?: number;
  journeyStatus?: AirwayBillJourneyStatus;
  waypointProgressPercentage?: number;
  routeKey?: string;
  routeName?: string;
  goodsIds: (string | AirwayBillGoods)[];
  totalWeight: number;
  totalPackages: number;
  capacityWeight: number;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface AirwayBillGoods {
  _id: string;
  goodsId: string;
  description?: string;
  weight?: number;
  quantity?: number;
  status?: string;
  condition?: 'new' | 'used' | 'damaged';
  ownerStatus?: 'IDENTIFIED' | 'UNIDENTIFIED';
  clientId?:
    | string
    | {
        _id?: string;
        firstName?: string;
        lastName?: string;
        fullName?: string;
        phoneNumber?: string;
        shippingClientId?: string;
        email?: string;
        profileImage?: string;
      };
  cargoBagId?: string | null;
  photos?: string[];
  warehouseLocation?: string;
  dimensions?: { length?: number; width?: number; height?: number };
  actualCBM?: number;
  unitPrice?: number;
  totalCost?: number;
  amountPaid?: number;
  balanceDue?: number;
  paymentStatus?: 'UNPAID' | 'PARTIAL' | 'PAID';
  expressTrackingNumber?: string;
  receivedAt?: string;
  receivedByName?: string;
}

export interface AirwayBillManifestSummary {
  totalClients: number;
  totalCargoBags: number;
  totalGoods: number;
  totalQuantity: number;
  totalWeight: number;
  totalCBM: number;
  totalCost: number;
  totalPaid: number;
  totalBalanceDue: number;
  unbaggedGoods: number;
}

export interface AirwayBillManifestClientInfo {
  clientId: string;
  name: string;
  phoneNumber: string | null;
  email: string | null;
  shippingClientId: string | null;
  unidentified?: boolean;
}

export interface AirwayBillManifestGoods {
  _id: string;
  goodsId: string;
  description: string;
  quantity: number;
  weight: number;
  actualCBM: number;
  dimensions?: { length?: number; width?: number; height?: number } | null;
  warehouseLocation?: string | null;
  status?: string | null;
  paymentStatus: string;
  totalCost: number;
  amountPaid: number;
  balanceDue: number;
  receivedAt?: string | null;
  condition?: string | null;
  intakeException?: { isException?: boolean; reasons?: string[]; notes?: string };
  expressTrackingNumber?: string | null;
  ownerStatus?: string;
  unidentifiedNotes?: string;
  cargoBagId?: string | null;
  cargoBagNumber?: string | null;
  client: AirwayBillManifestClientInfo;
}

export interface AirwayBillManifestClient extends AirwayBillManifestClientInfo {
  summary: AirwayBillManifestSummary;
  goods: AirwayBillManifestGoods[];
}

export interface AirwayBillManifestCargoBag {
  cargoBagId: string;
  bagNumber: string;
  status?: string | null;
  totalWeight: number;
  totalPackages: number;
  goodsCount: number;
  arrivedAt?: string | null;
  summary: AirwayBillManifestSummary;
  goods: AirwayBillManifestGoods[];
}

export interface AirwayBillGoodsManifest {
  generatedAt: string;
  airwayBill: Pick<
    AirwayBill,
    '_id' | 'awbNumber' | 'flightNumber' | 'airline' | 'departureAirport' | 'arrivalAirport' | 'departureDate' | 'estimatedArrivalDate' | 'actualArrivalDate' | 'status' | 'routeKey' | 'routeName' | 'capacityWeight'
  >;
  consignee: AirwayBillConsignee | null;
  summary: AirwayBillManifestSummary;
  clients: AirwayBillManifestClient[];
  cargoBags: AirwayBillManifestCargoBag[];
  unbaggedGoods: AirwayBillManifestGoods[];
}

export interface AirwayBillConsignee {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  warehouseAddress?: string;
}

export interface AirwayBillFilters {
  status?: AirwayBillStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateAirwayBillInput {
  awbNumber?: string;
  flightNumber?: string;
  airline?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: string;
  estimatedArrivalDate?: string;
  consigneeId?: string;
  routeKey?: string;
  capacityWeight?: number;
  notes?: string;
}

export interface UpdateAirwayBillInput {
  flightNumber?: string;
  airline?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: string;
  estimatedArrivalDate?: string;
  actualArrivalDate?: string;
  consigneeId?: string | null;
  routeKey?: string;
  capacityWeight?: number;
  notes?: string;
}

export interface AssignGoodsInput {
  goodsIds: string[];
}

export interface UpdateAirwayBillWaypointInput {
  status?: AirwayBillWaypointStatus;
  estimatedArrival?: string | null;
  actualArrival?: string | null;
  estimatedDeparture?: string | null;
  actualDeparture?: string | null;
  notes?: string;
  notifyOnArrival?: boolean;
  notifyOnDeparture?: boolean;
  airDetails?: Partial<AirwayBillWaypointDetails>;
  warehouseDetails?: Partial<AirwayBillWaypointWarehouseDetails>;
}

export interface AirwayBillApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedAirwayBillsResponse {
  airwayBills: AirwayBill[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ============================================
// CARGO BAG TYPES
// ============================================

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
  status: CargoBagStatus;
  totalPackages: number;
  totalWeight: number;
  goodsCount: number;
  goodsIds: (string | AirwayBillGoods)[];
  routeKey?: string;
  routeName?: string;
  waypoints?: AirwayBillWaypoint[];
  currentWaypointIndex?: number;
  totalWaypoints?: number;
  journeyStatus?: AirwayBillJourneyStatus;
  waypointProgressPercentage?: number;
  notes?: string;
  arrivedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCargoBagInput {
  awbId: string;
  notes?: string;
}

export interface AssignGoodsToBagInput {
  goodsIds: string[];
}

export const CARGO_BAG_STATUS_TRANSITIONS: Record<CargoBagStatus, CargoBagStatus[]> = {
  PACKED: ['CHECKED_IN', 'LOADED'],
  CHECKED_IN: ['PACKED', 'LOADED'],
  LOADED: ['CHECKED_IN', 'IN_TRANSIT'],
  IN_TRANSIT: ['ARRIVED'],
  ARRIVED: ['CLEARED'],
  CLEARED: [],
};

export interface UpdateCargoBagInput {
  notes?: string;
  status?: CargoBagStatus;
}

export interface CargoBagGoodsInput {
  goodsIds: string[];
}

export interface CargoBagListResponse {
  cargoBags: CargoBag[];
  total: number;
}

export interface CargoBagEligibleGoodsResponse {
  goods: AirwayBillGoods[];
  count: number;
  total?: number;
  canAssign?: boolean;
}
