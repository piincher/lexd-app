/**
 * Waypoint Types - Segment type definitions
 */

import { PortType } from './core';

export interface SeaSegmentDetails {
  vesselName?: string;
  vesselIMO?: string;
  carrier: string;
  bookingReference?: string;
  containerNumber?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  portType?: PortType;
  terminal?: string;
  trackingUrl?: string;
}

export interface RoadSegmentDetails {
  transporterName?: string;
  transporterPhone?: string;
  driverName?: string;
  driverPhone?: string;
  truckPlateNumber?: string;
  truckType?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  borderCrossing?: string;
  trackingNumber?: string;
  routeDetails?: string;
}

export interface AirSegmentDetails {
  airline: string;
  flightNumber?: string;
  airwayBillNumber?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  trackingUrl?: string;
}

export interface WarehouseDetails {
  warehouseName: string;
  warehouseCode?: string;
  address: string;
  contactName?: string;
  contactPhone?: string;
  operatingHours?: string;
}

export interface SeaSegmentUpdate {
  vesselName?: string;
  vesselIMO?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  terminal?: string;
  trackingUrl?: string;
}

export interface RoadSegmentUpdate {
  transporterName?: string;
  driverName?: string;
  driverPhone?: string;
  truckPlateNumber?: string;
  estimatedArrival?: string;
  actualArrival?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
  trackingNumber?: string;
}
