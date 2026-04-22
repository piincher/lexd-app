import { AirwayBillStatus } from './types';

export const STATUS_TRANSITIONS: Record<AirwayBillStatus, AirwayBillStatus[]> = {
  CREATED: ['PACKING', 'READY_FOR_DEPARTURE'], PACKING: ['CREATED', 'READY_FOR_DEPARTURE'],
  READY_FOR_DEPARTURE: ['PACKING', 'IN_TRANSIT'], IN_TRANSIT: ['ARRIVED'],
  ARRIVED: ['READY_FOR_PICKUP'], READY_FOR_PICKUP: ['DELIVERED'], DELIVERED: [],
};

export const STATUS_LABELS: Record<AirwayBillStatus, string> = {
  CREATED: 'Créé', PACKING: 'Préparation', READY_FOR_DEPARTURE: 'Prêt au départ',
  IN_TRANSIT: 'En transit', ARRIVED: 'Arrivé', READY_FOR_PICKUP: 'Prêt pour retrait', DELIVERED: 'Livré',
};
