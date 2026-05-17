/**
 * Packing List Normalizer
 * SRP: Normalize raw packing list API response to ClientPackingListResponse
 */

import type {
  ClientPackingListItem,
  ClientPackingListResponse,
  ClientPackingListSummary,
  PackingListSignature,
  PackingListSchedule,
  PackingListConsignee,
  PackingListTracking,
} from '../../api/types';

type PackingListRoute = ClientPackingListResponse['route'];

type LegacyPackingListContainer = {
  number?: string;
  virtualContainerNumber?: string;
  shippingMode?: ClientPackingListResponse['shippingMode'];
  shippingLine?: string;
  shippingLineLabel?: string;
  route?: PackingListRoute;
  consignee?: PackingListConsignee | null;
  status?: string;
  statusLabel?: string;
  timeline?: Partial<PackingListTracking>;
  schedule?: PackingListSchedule;
  signature?: PackingListSignature;
};

type RawPackingListResponse = Omit<Partial<ClientPackingListResponse>, 'consignee'> & {
  consignee?: PackingListConsignee | null;
  container?: LegacyPackingListContainer;
  goods?: ClientPackingListItem[];
  schedule?: PackingListSchedule;
  signature?: PackingListSignature;
};

const DEFAULT_ROUTE: PackingListRoute = {
  origin: '',
  destination: '',
  estimatedTransitDays: 0,
};

const DEFAULT_CONSIGNEE: PackingListConsignee = {
  name: '',
  phone: '',
  warehouseAddress: '',
};

const DEFAULT_SUMMARY: ClientPackingListSummary = {
  totalItems: 0,
  totalCBM: 0,
  totalWeight: 0,
  totalPackages: 0,
  totalQuantity: 0,
};

const valueAsString = (value?: string, fallback = ''): string => value || fallback;

export const normalizePackingList = (
  data: unknown,
): ClientPackingListResponse | undefined => {
  const raw = data as RawPackingListResponse | undefined;
  if (!raw) return raw;

  const c = raw.container;
  const tracking: Partial<PackingListTracking> = raw.tracking || {};
  const timeline: Partial<PackingListTracking> = c?.timeline || {};
  const schedule = c?.schedule || raw.schedule || {};
  const dakarPortArrivalAt =
    schedule.dakarPortArrivalAt ||
    timeline.dakarPortArrivalAt ||
    tracking.dakarPortArrivalAt ||
    tracking.estimatedArrival;

  const normalized: ClientPackingListResponse = {
    containerNumber: valueAsString(
      c?.number || c?.virtualContainerNumber || raw.containerNumber,
    ),
    shippingMode: c?.shippingMode || raw.shippingMode || 'SEA',
    shippingLine: valueAsString(c?.shippingLine || raw.shippingLine),
    shippingLineLabel: valueAsString(
      c?.shippingLineLabel || raw.shippingLineLabel || c?.shippingLine || raw.shippingLine,
    ),
    route: c?.route || raw.route || DEFAULT_ROUTE,
    consignee: c?.consignee || raw.consignee || DEFAULT_CONSIGNEE,
    tracking: {
      status: valueAsString(c?.status || tracking.status),
      statusLabel: valueAsString(
        c?.statusLabel || tracking.statusLabel || c?.status || tracking.status,
      ),
      bookedAt: valueAsString(timeline.bookedAt || tracking.bookedAt),
      emptyDispatchedAt: timeline.emptyDispatchedAt || tracking.emptyDispatchedAt,
      loadingStartedAt: timeline.loadingStartedAt || tracking.loadingStartedAt,
      loadingCompletedAt: timeline.loadingCompletedAt || tracking.loadingCompletedAt,
      gateInFullAt: timeline.gateInFullAt || tracking.gateInFullAt,
      loadedOnVesselAt: timeline.loadedOnVesselAt || tracking.loadedOnVesselAt,
      departedAt: timeline.departedAt || tracking.departedAt,
      arrivedAt: timeline.arrivedAt || tracking.arrivedAt,
      dischargedAt: timeline.dischargedAt || tracking.dischargedAt,
      readyForPickupAt: timeline.readyForPickupAt || tracking.readyForPickupAt,
      estimatedArrival:
        dakarPortArrivalAt || timeline.estimatedArrival || tracking.estimatedArrival,
      dakarPortArrivalAt,
    },
    schedule: {
      loadDate:
        schedule.loadDate || timeline.loadingCompletedAt || tracking.loadingCompletedAt || null,
      loadedOnVesselAt:
        schedule.loadedOnVesselAt || timeline.loadedOnVesselAt || tracking.loadedOnVesselAt || null,
      dakarPortArrivalAt: dakarPortArrivalAt || null,
    },
    signature: c?.signature || raw.signature,
    items: raw.goods || raw.items || [],
    summary: raw.summary || DEFAULT_SUMMARY,
    generatedAt: valueAsString(raw.generatedAt),
    pickupInstructions: raw.pickupInstructions,
  };

  return normalized;
};
