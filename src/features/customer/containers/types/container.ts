/**
 * Customer Container Types
 */

import { CustomerContainerStatus } from './status';
import { ShippingMode, ShippingLine } from './shipping';
import { ContainerETA, ETASource, ETAConfidence } from './eta';
import { CustomerGoodsInContainer } from './goods';
import { ContainerRoute } from './route';
import { ContainerTimeline } from './timeline';

/**
 * Customer-facing container entity
 * Customer only sees their own goods in the container
 */
export interface CustomerContainer {
  _id: string;
  trackingType?: 'CONTAINER' | 'AIRWAY_BILL';
  containerId?: string;
  airwayBillId?: string;
  awbNumber?: string;
  virtualContainerNumber: string;
  shippingMode: ShippingMode;
  shippingLine: ShippingLine;
  status: CustomerContainerStatus;
  airwayBillStatus?: string;
  airline?: string;
  flightNumber?: string;
  route: ContainerRoute;
  timeline: ContainerTimeline;
  myGoods: CustomerGoodsInContainer[];
  estimatedArrival?: string;
  eta?: ContainerETA;
  predictiveEta?: ContainerETA;
  etaPrediction?: ContainerETA;
  etaSource?: ETASource;
  etaConfidence?: ETAConfidence;
  isDelayed?: boolean;
  delayDays?: number;
  daysRemaining?: number | null;
  pickupContact?: {
    name: string;
    phone: string;
    address: string;
  };
}

/**
 * Filters for customer's containers
 */
export interface CustomerContainerFilters {
  status?: CustomerContainerStatus;
  shippingMode?: ShippingMode;
}
