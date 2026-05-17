import {
  LocationCategory,
  PortStatusOption,
  DISCHARGE_PORT_STATUSES,
  BORDER_STATUSES,
  WAREHOUSE_STATUSES,
  STANDARD_STATUSES,
} from '../types/waypointStatus';

export const getLocationTitle = (category: LocationCategory): string => {
  switch (category) {
    case 'DISCHARGE_PORT':
      return 'Port de Déchargement';
    case 'BORDER':
      return 'Point de Frontière';
    case 'WAREHOUSE':
      return 'Entrepôt';
    case 'LOADING_PORT':
      return 'Port de Chargement';
    case 'TRANSIT_PORT':
      return 'Port de Transit';
    default:
      return 'Waypoint';
  }
};

export const getAllStatusesForLocation = (category: LocationCategory): PortStatusOption[] => {
  switch (category) {
    case 'DISCHARGE_PORT':
      return DISCHARGE_PORT_STATUSES;
    case 'BORDER':
      return BORDER_STATUSES;
    case 'WAREHOUSE':
      return WAREHOUSE_STATUSES;
    default:
      return STANDARD_STATUSES;
  }
};
