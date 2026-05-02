import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import type { RootStackParamList } from '@src/navigations/type';
import { airwayBillApi } from '../api/airwayBillApi';
import type { TrackingWaypoint } from '../api/types';

const AWB_STATUS_STEPS = [
  { key: 'CREATED' },
  { key: 'PACKING' },
  { key: 'READY_FOR_DEPARTURE' },
  { key: 'IN_TRANSIT' },
  { key: 'ARRIVED' },
  { key: 'READY_FOR_PICKUP' },
  { key: 'DELIVERED' },
];

export const useAirwayBillTracking = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AirwayBillTracking'>>();
  const { airwayBillId } = route.params;

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['goods', 'airwayBill', airwayBillId],
    queryFn: () => airwayBillApi.getById(airwayBillId),
    enabled: !!airwayBillId,
    staleTime: 5 * 60 * 1000,
  });

  const awb = data?.data?.airwayBill;

  if (isLoading || !awb) {
    return { isLoading, isError, error, refetch, isFetching, awb: undefined };
  }

  const currentStepIndex = AWB_STATUS_STEPS.findIndex((s) => s.key === awb.status);
  const flightLabel = [awb.airline, awb.flightNumber].filter(Boolean).join(' · ') || 'Vol à confirmer';
  const departureAirport = awb.departureAirport || '---';
  const arrivalAirport = awb.arrivalAirport || '---';
  const waypoints = awb.waypoints || [];
  const activeWaypointIndex = typeof awb.currentWaypointIndex === 'number'
    ? awb.currentWaypointIndex
    : waypoints.findIndex((w: TrackingWaypoint) => ['IN_PROGRESS', 'DELAYED'].includes(w.status));
  const pendingWaypointIndex = waypoints.findIndex((w: TrackingWaypoint) => w.status === 'PENDING');
  const currentWaypointIndex = activeWaypointIndex !== -1
    ? activeWaypointIndex
    : pendingWaypointIndex === 0
      ? -1
      : pendingWaypointIndex > 0
        ? pendingWaypointIndex
        : waypoints.length - 1;
  const waypointProgress = typeof awb.waypointProgressPercentage === 'number'
    ? awb.waypointProgressPercentage
    : waypoints.length
      ? Math.round((waypoints.filter((w: TrackingWaypoint) => w.status === 'COMPLETED').length / waypoints.length) * 100)
      : 0;
  const currentWaypoint = currentWaypointIndex >= 0 ? waypoints[currentWaypointIndex] : undefined;
  const finalWaypoint = waypoints.find((waypoint: TrackingWaypoint) => waypoint.location?.portCode === 'MLBKO_WH');
  const customerEtaLabel = finalWaypoint?.customerEta?.visibleToCustomer
    ? finalWaypoint.customerEta.label
    : null;
  const arrivedStatus = ['ARRIVED', 'READY_FOR_PICKUP', 'DELIVERED'].includes(awb.status);
  const operationalEta = awb.actualArrivalDate || awb.estimatedArrivalDate || currentWaypoint?.estimatedArrival || null;
  const estimatedArrivalLabel = arrivedStatus ? operationalEta || customerEtaLabel : customerEtaLabel || operationalEta;

  return {
    isLoading: false as const,
    isError,
    error,
    refetch,
    isFetching,
    awb,
    currentStepIndex,
    flightLabel,
    departureAirport,
    arrivalAirport,
    waypoints,
    currentWaypoint,
    currentWaypointIndex,
    waypointProgress,
    estimatedArrivalLabel,
  };
};
