/**
 * Shipment — the single customer-facing record.
 *
 * The app exposed three peer destinations (Commandes, Mes Marchandises,
 * Expéditions) that are really one thing seen at three zoom levels: the
 * commercial order, the packages inside it, and the container carrying them.
 * A customer thinks in one unit — *mon envoi* — so this model presents one.
 *
 * This is a read model built on the client. It does not change any API,
 * query key, or backend contract; it adapts what those already return.
 *
 * Provenance is deliberate:
 *   - a container (sea or air) is already the closest thing to a shipment and
 *     becomes one directly;
 *   - an order that has not yet been assigned to a container becomes a
 *     pre-shipment record, so nothing disappears from the customer's view;
 *   - an order that *has* a container is dropped, because the container
 *     already represents it. Without that, every consolidated order would be
 *     listed twice.
 */

import type { CustomerContainer } from '@src/features/customer/containers/types/container';
import type { productType } from '@src/shared/api/order';
import {
  resolveStage,
  stageProgress,
  toException,
  toStage,
  needsCustomerAction,
  type ShipmentException,
  type ShipmentMode,
  type ShipmentStage,
} from './lifecycle';

/** One package inside a shipment. */
export interface ShipmentItem {
  id: string;
  reference: string;
  description: string;
  weightKg?: number;
  cbm?: number;
  stage: ShipmentStage | null;
  photos: string[];
}

export interface Shipment {
  /** Stable id for lists and navigation. */
  id: string;
  /** What the customer quotes on the phone — container no. or order code. */
  reference: string;
  mode: ShipmentMode;
  stage: ShipmentStage | null;
  exception: ShipmentException | null;
  /** 0–100 across the full journey. */
  progress: number;
  /** True when the shipment is waiting on the customer. */
  needsAction: boolean;

  origin?: string;
  destination?: string;
  carrier?: string;

  contents: ShipmentItem[];
  itemCount: number;
  totalWeightKg?: number;
  totalCbm?: number;

  departedAt?: string;
  estimatedArrival?: string;
  isDelayed: boolean;
  delayDays?: number;

  /** Where this record came from, for navigation and debugging. */
  source: 'container' | 'order';
  /** Underlying id used by existing detail screens and queries. */
  sourceId: string;
  /** Set only for containers — existing tracking queries key off this. */
  containerRef?: string;
}

const sum = (values: (number | undefined)[]): number | undefined => {
  const known = values.filter((v): v is number => typeof v === 'number' && !Number.isNaN(v));
  return known.length ? known.reduce((a, b) => a + b, 0) : undefined;
};

const isAirContainer = (c: CustomerContainer): boolean =>
  c.trackingType === 'AIRWAY_BILL' || c.shippingMode === 'AIR';

/** Normalize whatever `shippingMode` carries onto the canonical modes. */
export const toMode = (raw?: string | null, air = false): ShipmentMode => {
  if (air) return 'AIR';
  const v = (raw || '').toUpperCase();
  if (v.includes('AIR')) return 'AIR';
  if (v.includes('SEA') || v.includes('MARITIME')) return 'SEA';
  return 'UNKNOWN';
};

// ============================================================
// Adapters
// ============================================================

export const fromContainer = (c: CustomerContainer): Shipment => {
  const air = isAirContainer(c);

  const contents: ShipmentItem[] = (c.myGoods || []).map((g) => ({
    id: g._id,
    reference: g.goodsId,
    description: g.description,
    weightKg: g.weight,
    cbm: g.actualCBM,
    stage: toStage('goods', g.status),
    photos: g.photos || [],
  }));

  // The container's own status and its goods' statuses update independently.
  // Taking the furthest avoids showing "at warehouse" on a container at sea.
  const stage = resolveStage([
    toStage(air ? 'air' : 'container', air ? c.airwayBillStatus : c.status),
    ...contents.map((i) => i.stage),
  ]);

  const carrier = air
    ? [c.airline, c.flightNumber].filter(Boolean).join(' · ') || undefined
    : c.shippingLine || undefined;

  return {
    id: c._id,
    reference: c.virtualContainerNumber || c.awbNumber || c._id,
    mode: toMode(c.shippingMode, air),
    stage,
    exception: null,
    progress: stageProgress(stage),
    needsAction: needsCustomerAction(stage),
    origin: c.route?.origin,
    destination: c.route?.destination,
    carrier,
    contents,
    itemCount: contents.length,
    totalWeightKg: sum(contents.map((i) => i.weightKg)),
    totalCbm: sum(contents.map((i) => i.cbm)),
    departedAt: c.timeline?.departedAt,
    estimatedArrival: c.estimatedArrival,
    isDelayed: !!c.isDelayed,
    delayDays: c.delayDays,
    source: 'container',
    sourceId: c._id,
    containerRef: c.virtualContainerNumber,
  };
};

/**
 * An order's `route` is an array of legs, not an origin/destination pair, so
 * the endpoints are derived from the first and last waypoint when present.
 */
const orderEndpoints = (order: productType): { origin?: string; destination?: string } => {
  const legs = Array.isArray(order.route) ? order.route : [];
  const first = legs[0]?.coordinates?.[0]?.location;
  const lastLeg = legs[legs.length - 1]?.coordinates;
  const last = lastLeg?.[lastLeg.length - 1]?.location;
  return { origin: first, destination: last };
};

export const fromOrder = (order: productType): Shipment => {
  // `currentStatus` is the finer-grained signal when present; `status` is the
  // coarse commercial state. Both are consulted and the furthest wins.
  const stage = resolveStage([
    toStage('order', order.status),
    toStage('goods', order.currentStatus),
  ]);
  const { origin, destination } = orderEndpoints(order);
  const id = order._id || order.orderId || order.code || '';

  return {
    id,
    reference: order.code || order.orderId || id,
    mode: toMode(order.shippingMode),
    stage,
    exception: toException(order.status),
    progress: stageProgress(stage),
    needsAction: needsCustomerAction(stage),
    origin,
    destination,
    carrier: undefined,
    contents: [],
    itemCount: order.quantity ?? 0,
    totalWeightKg: order.packageWeight,
    totalCbm: order.packageCBM ? Number(order.packageCBM) || undefined : undefined,
    departedAt: order.departureDate,
    estimatedArrival: undefined,
    isDelayed: false,
    source: 'order',
    sourceId: id,
    containerRef: order.contenairNumber || undefined,
  };
};

// ============================================================
// Aggregation
// ============================================================

const norm = (v?: string | null) => (v || '').trim().toUpperCase();

/**
 * Build the customer's shipment list from both sources.
 *
 * Orders already represented by a container are dropped — an order carries
 * `contenairNumber`, and if that matches a container the customer would
 * otherwise see the same shipment twice under two references.
 *
 * Sorted with anything awaiting the customer first, then by how far along the
 * journey it is, so the list leads with what is actionable.
 */
export const buildShipments = (
  containers: CustomerContainer[] = [],
  orders: productType[] = [],
): Shipment[] => {
  const shipments = containers.map(fromContainer);

  const covered = new Set(
    shipments.flatMap((s) => [norm(s.containerRef), norm(s.reference)]).filter(Boolean),
  );

  const pending = orders
    .filter((o) => !covered.has(norm(o.contenairNumber)))
    .map(fromOrder)
    .filter((s) => !!s.id);

  return [...shipments, ...pending].sort((a, b) => {
    if (a.needsAction !== b.needsAction) return a.needsAction ? -1 : 1;
    return b.progress - a.progress;
  });
};
