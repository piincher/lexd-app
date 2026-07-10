import type { RouteWaypointDraft } from '@src/features/admin/routes/types';
import { ShippingLine, SHIPPING_LINE_WAYPOINT_PRESETS } from '@src/shared/constants/shippingLines';

export const WAYPOINT_TYPES = [
  { label: 'Port', value: 'PORT' },
  { label: 'Route', value: 'ROAD' },
  { label: 'Douane', value: 'CUSTOMS' },
  { label: 'Frontière', value: 'BORDER' },
  { label: 'Entrepôt', value: 'WAREHOUSE' },
] as const;

export const SEGMENT_TYPES = [
  { label: 'Mer', value: 'SEA' },
  { label: 'Route', value: 'ROAD' },
  { label: 'Air', value: 'AIR' },
  { label: 'Stock', value: 'WAREHOUSE' },
] as const;

export const KNOWN_PORTS = [
  { label: 'Nansha', city: 'Guangzhou', country: 'China', countryCode: 'CN', portCode: 'CNNAN', terminal: 'GZ OCEANGATE CONTAINER TERMINAL' },
  { label: 'Singapore', city: 'Singapore', country: 'Singapore', countryCode: 'SG', portCode: 'SGSIN', terminal: 'SINGAPORE PSA TERMINAL' },
  { label: 'Lagos', city: 'Lagos', country: 'Nigeria', countryCode: 'NG', portCode: 'NGLOS', terminal: 'APAPA CONTAINER TERMINAL' },
  { label: 'Abidjan', city: 'Abidjan', country: "Côte d'Ivoire", countryCode: 'CI', portCode: 'CIABJ', terminal: 'ABIDJAN PORT CONTAINER TERMINAL' },
  { label: 'Dakar', city: 'Dakar', country: 'Senegal', countryCode: 'SN', portCode: 'SNDKR', terminal: 'DAKAR PORT CONTAINER TERMINAL' },
  { label: 'Tanjung Pelepas', city: 'Tanjung Pelepas', country: 'Malaysia', countryCode: 'MY', portCode: 'MYTPP', terminal: 'TANJUNG PELEPAS CONTAINER TERMINAL' },
  { label: 'Tanger Med', city: 'Tanger Med', country: 'Morocco', countryCode: 'MA', portCode: 'MAPTM', terminal: 'TANGER MED CONTAINER TERMINAL' },
  { label: 'Diboli', city: 'Diboli', country: 'Mali', countryCode: 'ML', portCode: 'MLDBL', terminal: 'Diboli Border' },
  { label: 'Bamako', city: 'Bamako', country: 'Mali', countryCode: 'ML', portCode: 'MLBKQ', terminal: 'ChinaLink Warehouse - Bamako' },
] as const;

export const ROUTE_PRESETS = [
  { label: 'Singapore', waypoints: ['Nansha', 'Singapore', 'Dakar', 'Diboli', 'Bamako'] },
  { label: 'Lagos', waypoints: ['Nansha', 'Lagos', 'Dakar', 'Diboli', 'Bamako'] },
  { label: 'Abidjan', waypoints: ['Nansha', 'Abidjan', 'Dakar', 'Diboli', 'Bamako'] },
  { label: 'Direct Dakar', waypoints: ['Nansha', 'Dakar', 'Diboli', 'Bamako'] },
  { label: 'T. Pelepas', waypoints: ['Nansha', 'Tanjung Pelepas', 'Tanger Med', 'Dakar', 'Diboli', 'Bamako'] },
] as const;

const getKnownPort = (label: string) => KNOWN_PORTS.find((port) => port.label === label);

const getTypeForPort = (label: string) => {
  if (label === 'Bamako') return 'WAREHOUSE';
  if (label === 'Diboli') return 'BORDER';
  return 'PORT';
};

const getSegmentForPort = (label: string) => {
  if (label === 'Bamako') return 'WAREHOUSE';
  if (label === 'Diboli') return 'ROAD';
  return 'SEA';
};

const getDescriptionForPort = (label: string, index: number, total: number) => {
  if (index === 0) return `Départ - ${label}`;
  if (index === total - 1) return `Arrivée - ${label}`;
  if (label === 'Diboli') return 'Frontière/Dédouanement - Diboli (Sénégal-Mali)';
  return `Transit - ${label}`;
};

export const createWaypoint = (
  label = '',
  index = 0,
  total = 1,
  totalDays = 90,
): RouteWaypointDraft => {
  const known = getKnownPort(label);
  const displayName = known?.label || label || `Étape ${index + 1}`;
  const day = Math.round((totalDays / Math.max(total - 1, 1)) * index);

  return {
    order: index + 1,
    location: {
      city: known?.city || displayName,
      country: known?.country || '',
      countryCode: known?.countryCode || '',
      portCode: known?.portCode || '',
    },
    estimatedDaysFromStart: day,
    description: getDescriptionForPort(displayName, index, total),
    type: getTypeForPort(displayName),
    segmentType: getSegmentForPort(displayName),
    terminal: known?.terminal || '',
    notifyOnArrival: index > 0,
    notifyOnDeparture: index === 0,
  };
};

export const createPresetWaypoints = (
  labels: readonly string[],
  totalDays: number,
) => labels.map((label, index) => createWaypoint(label, index, labels.length, totalDays));

export const createWaypointsForShippingLine = (
  line: ShippingLine,
  totalDays: number,
): RouteWaypointDraft[] => {
  const labels = SHIPPING_LINE_WAYPOINT_PRESETS[line as keyof typeof SHIPPING_LINE_WAYPOINT_PRESETS];
  if (!labels || labels.length === 0) return [];
  return labels.map((label, index) => createWaypoint(label, index, labels.length, totalDays));
};
