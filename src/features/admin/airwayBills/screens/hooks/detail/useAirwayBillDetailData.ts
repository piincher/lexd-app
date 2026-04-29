import { useMemo } from 'react';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  useGetAirwayBillById,
  useGetAirwayBillWaypoints,
} from '../../../hooks/useAirwayBills';
import {
  AirwayBill,
  AirwayBillConsignee,
  AirwayBillGoods,
  AirwayBillStatus,
} from '../../../types';

const STATUS_LABELS: Record<AirwayBillStatus, string> = {
  CREATED: 'Créé',
  PACKING: 'Préparation',
  READY_FOR_DEPARTURE: 'Prêt au départ',
  IN_TRANSIT: 'En transit',
  ARRIVED: 'Arrivé',
  READY_FOR_PICKUP: 'Prêt pour retrait',
  DELIVERED: 'Livré',
};

const STATUS_TRANSITIONS: Record<AirwayBillStatus, AirwayBillStatus[]> = {
  CREATED: ['PACKING', 'READY_FOR_DEPARTURE'],
  PACKING: ['CREATED', 'READY_FOR_DEPARTURE'],
  READY_FOR_DEPARTURE: ['PACKING', 'IN_TRANSIT'],
  IN_TRANSIT: ['ARRIVED'],
  ARRIVED: ['READY_FOR_PICKUP'],
  READY_FOR_PICKUP: ['DELIVERED'],
  DELIVERED: [],
};

export const useAirwayBillDetailData = (airwayBillId: string) => {
  const { colors } = useAppTheme();
  const { data, isLoading, refetch: refetchAwb } = useGetAirwayBillById(airwayBillId);
  const { data: waypointData, refetch: refetchWaypoints } = useGetAirwayBillWaypoints(airwayBillId);

  const airwayBill = data?.data?.airwayBill as AirwayBill | undefined;
  const waypointPayload = waypointData?.data;
  const goodsList = useMemo(
    () => (airwayBill?.goodsIds || []).filter((goods): goods is AirwayBillGoods => typeof goods !== 'string'),
    [airwayBill]
  );
  const flightLabel = useMemo(
    () => [airwayBill?.airline, airwayBill?.flightNumber].filter(Boolean).join(' · ') || 'Vol à confirmer',
    [airwayBill]
  );
  const routeLabel = useMemo(
    () =>
      airwayBill?.departureAirport && airwayBill?.arrivalAirport
        ? `${airwayBill.departureAirport} → ${airwayBill.arrivalAirport}`
        : 'Route à confirmer',
    [airwayBill]
  );
  const consignee = useMemo(
    () => (typeof airwayBill?.consigneeId === 'object' ? airwayBill.consigneeId : null) as AirwayBillConsignee | null,
    [airwayBill]
  );
  const nextStatuses = useMemo(
    () => (airwayBill ? STATUS_TRANSITIONS[airwayBill.status] || [] : []),
    [airwayBill]
  );
  const statusColors = useMemo(
    () => ({
      CREATED: colors.neutral[500],
      PACKING: colors.primary[500],
      READY_FOR_DEPARTURE: colors.accent.gold,
      IN_TRANSIT: colors.status.info,
      ARRIVED: colors.status.success,
      READY_FOR_PICKUP: colors.accent.mint,
      DELIVERED: colors.neutral[400],
    }),
    [colors]
  );

  return {
    airwayBill,
    waypointPayload,
    isLoading,
    goodsList,
    flightLabel,
    routeLabel,
    consignee,
    nextStatuses,
    statusLabels: STATUS_LABELS,
    statusColors,
    refetchAwb,
    refetchWaypoints,
  };
};
