import type { RouteWaypointDraft } from '@src/features/admin/routes/types';

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
  { label: 'Bamako', city: 'Bamako', country: 'Mali', countryCode: 'ML', portCode: 'MLBKQ', terminal: 'ChinaLink Warehouse - Bamako' },
] as const;

export const ROUTE_PRESETS = [
  {
    label: 'Singapore',
    waypoints: ['Nansha', 'Singapore', 'Dakar', 'Bamako'],
  },
  {
    label: 'Lagos',
    waypoints: ['Nansha', 'Lagos', 'Dakar', 'Bamako'],
  },
  {
    label: 'Abidjan',
    waypoints: ['Nansha', 'Abidjan', 'Dakar', 'Bamako'],
  },
  {
    label: 'T. Pelepas',
    waypoints: ['Nansha', 'Tanjung Pelepas', 'Tanger Med', 'Dakar', 'Bamako'],
  },
] as const;

const getKnownPort = (label: string) => KNOWN_PORTS.find((port) => port.label === label);

const getTypeForPort = (label: string) => label === 'Bamako' ? 'WAREHOUSE' : 'PORT';

const getSegmentForPort = (label: string) => label === 'Bamako' ? 'WAREHOUSE' : 'SEA';

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
    description: index === 0
      ? `Départ - ${displayName}`
      : index === total - 1
        ? `Arrivée - ${displayName}`
        : `Transit - ${displayName}`,
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
