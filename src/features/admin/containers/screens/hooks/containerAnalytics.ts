/**
 * Fleet-wide container analytics — pure, client-side aggregation over the
 * container list the admin already has cached. Surfaces fill-rate, profit and
 * delay-risk signals so operators can spot under-utilised containers, late
 * shipments and weak routes at a glance.
 */
import type { Container, ContainerStatus } from '../../types';
import { buildContainerEta } from './containerEta';

export interface FillBucket {
  label: string;
  count: number;
}

export interface RoutePerformance {
  routeId: string;
  name: string;
  containerCount: number;
  avgFillPercentage: number;
  totalProfit: number;
  lateCount: number;
}

export interface ContainerAnalytics {
  total: number;
  active: number;
  arrived: number;
  statusCounts: Partial<Record<ContainerStatus, number>>;
  avgFillPercentage: number;
  underUtilizedCount: number;
  fillBuckets: FillBucket[];
  totalRevenue: number;
  totalProfit: number;
  avgProfitMargin: number;
  atRiskCount: number;
  onTimeRate: number;
  routes: RoutePerformance[];
  modeSplit: { sea: number; air: number };
}

const ACTIVE_STATUSES = new Set<ContainerStatus>([
  'BOOKED',
  'EMPTY_TO_WAREHOUSE',
  'LOADING',
  'LOADED',
  'GATE_IN_FULL',
  'LOADED_ON_VESSEL',
  'IN_TRANSIT',
]);

const ARRIVED_STATUSES = new Set<ContainerStatus>([
  'ARRIVED',
  'DISCHARGED',
  'READY_FOR_PICKUP',
  'DELIVERED',
]);

/** Fill percentage for a container in its capacity unit (weight for AIR, CBM for SEA). */
export const containerFillPercentage = (container: Container): number => {
  const isAir = container.shippingMode === 'AIR';
  const capacity = (isAir ? container.capacityWeight : container.capacityCBM) ?? 0;
  if (capacity <= 0) return 0;
  const used = isAir
    ? (container.goods ?? []).reduce((sum, g) => sum + (g.weight ?? 0), 0)
    : container.totalCBM ?? 0;
  return Math.min((used / capacity) * 100, 100);
};

/** Stable string route id, tolerating a `routeId` that arrives populated as an object. */
const resolveRouteId = (c: Container): string => {
  if (c.route?._id) return c.route._id;
  const raw = c.routeId as unknown;
  if (typeof raw === 'string' && raw) return raw;
  if (raw && typeof raw === 'object' && typeof (raw as { _id?: unknown })._id === 'string') {
    return (raw as { _id: string })._id;
  }
  return 'unknown';
};

/** Route name when `routeId` is populated as an object. */
const routeName = (c: Container): string | undefined => {
  const raw = c.routeId as unknown;
  if (raw && typeof raw === 'object' && typeof (raw as { name?: unknown }).name === 'string') {
    return (raw as { name: string }).name;
  }
  return undefined;
};

const profitOf = (c: Container): number =>
  c.cbmProfit?.profit ?? c.reconciledProfit ?? c.realTimeProfit ?? 0;

const revenueOf = (c: Container): number =>
  c.cbmProfit?.revenue ?? c.clientTotalRevenue ?? 0;

export const buildContainerAnalytics = (
  containers: Container[],
  now: Date = new Date(),
): ContainerAnalytics => {
  const statusCounts: Partial<Record<ContainerStatus, number>> = {};
  let fillSum = 0;
  let fillCount = 0;
  let underUtilizedCount = 0;
  let totalRevenue = 0;
  let totalProfit = 0;
  let marginSum = 0;
  let marginCount = 0;
  let atRiskCount = 0;
  let arrivedCount = 0;
  let onTimeCount = 0;
  let sea = 0;
  let air = 0;

  const fillBuckets: FillBucket[] = [
    { label: '<50%', count: 0 },
    { label: '50-79%', count: 0 },
    { label: '80-99%', count: 0 },
    { label: '100%', count: 0 },
  ];

  const routeMap = new Map<string, RoutePerformance & { _fillSum: number; _fillCount: number }>();

  for (const c of containers) {
    statusCounts[c.status] = (statusCounts[c.status] ?? 0) + 1;
    if (c.shippingMode === 'AIR') air += 1;
    else sea += 1;

    const capacity = (c.shippingMode === 'AIR' ? c.capacityWeight : c.capacityCBM) ?? 0;
    const fill = containerFillPercentage(c);
    if (capacity > 0) {
      fillSum += fill;
      fillCount += 1;
      if (fill < 50 && ACTIVE_STATUSES.has(c.status)) underUtilizedCount += 1;
      if (fill < 50) fillBuckets[0].count += 1;
      else if (fill < 80) fillBuckets[1].count += 1;
      else if (fill < 100) fillBuckets[2].count += 1;
      else fillBuckets[3].count += 1;
    }

    totalRevenue += revenueOf(c);
    totalProfit += profitOf(c);
    if (typeof c.cbmProfit?.profitMargin === 'number') {
      marginSum += c.cbmProfit.profitMargin;
      marginCount += 1;
    }

    const eta = buildContainerEta(c, now);
    if (!eta.isArrived && (eta.risk === 'HIGH' || eta.risk === 'MEDIUM')) atRiskCount += 1;
    if (ARRIVED_STATUSES.has(c.status)) {
      arrivedCount += 1;
      if (eta.projectedDelayDays <= 0) onTimeCount += 1;
    }

    // Route grouping. `routeId` is typed as a string but the backend sometimes
    // populates it as a full route object, so coerce to a stable string id —
    // otherwise object keys collapse to "[object Object]" and collide.
    const routeId = resolveRouteId(c);
    const name = c.route?.name ?? routeName(c) ?? `${c.route?.origin ?? '?'} → ${c.route?.destination ?? '?'}`;
    const existing = routeMap.get(routeId) ?? {
      routeId,
      name,
      containerCount: 0,
      avgFillPercentage: 0,
      totalProfit: 0,
      lateCount: 0,
      _fillSum: 0,
      _fillCount: 0,
    };
    existing.containerCount += 1;
    existing.totalProfit += profitOf(c);
    if (capacity > 0) {
      existing._fillSum += fill;
      existing._fillCount += 1;
    }
    if (eta.projectedDelayDays > 0 || (!eta.isArrived && eta.risk === 'HIGH')) existing.lateCount += 1;
    routeMap.set(routeId, existing);
  }

  const active = containers.filter((c) => ACTIVE_STATUSES.has(c.status)).length;

  const routes: RoutePerformance[] = Array.from(routeMap.values())
    .map(({ _fillSum, _fillCount, ...rest }) => ({
      ...rest,
      avgFillPercentage: _fillCount > 0 ? _fillSum / _fillCount : 0,
    }))
    .sort((a, b) => b.containerCount - a.containerCount);

  return {
    total: containers.length,
    active,
    arrived: arrivedCount,
    statusCounts,
    avgFillPercentage: fillCount > 0 ? fillSum / fillCount : 0,
    underUtilizedCount,
    fillBuckets,
    totalRevenue,
    totalProfit,
    avgProfitMargin: marginCount > 0 ? marginSum / marginCount : 0,
    atRiskCount,
    onTimeRate: arrivedCount > 0 ? (onTimeCount / arrivedCount) * 100 : 0,
    routes,
    modeSplit: { sea, air },
  };
};
