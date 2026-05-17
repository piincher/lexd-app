import { AirwayBillWaypointStatus } from '../../../types';

export const buildWaypointUpdateInput = (status: AirwayBillWaypointStatus) => {
  const now = new Date().toISOString();
  return {
    status,
    ...(status === 'IN_PROGRESS' ? { actualDeparture: now } : {}),
    ...(status === 'COMPLETED' ? { actualArrival: now } : {}),
    ...(status === 'DELAYED' ? { notes: 'Retard signalé sur ce sac cargo' } : {}),
  };
};
