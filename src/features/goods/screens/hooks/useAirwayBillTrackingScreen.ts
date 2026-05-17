import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAirwayBillTracking } from '../../hooks/useAirwayBillTracking';

export const useAirwayBillTrackingScreen = () => {
  const navigation = useNavigation();
  const {
    awb,
    isLoading,
    currentStepIndex,
    flightLabel,
    departureAirport,
    arrivalAirport,
    waypoints,
    currentWaypoint,
    currentWaypointIndex,
    waypointProgress,
    estimatedArrivalLabel,
    isError,
    error,
    refetch,
    isFetching,
  } = useAirwayBillTracking();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRetry = useCallback(() => {
    refetch?.();
  }, [refetch]);

  const handleRefresh = useCallback(() => {
    refetch?.();
  }, [refetch]);

  return {
    awb,
    isLoading,
    currentStepIndex,
    flightLabel,
    departureAirport,
    arrivalAirport,
    waypoints,
    currentWaypoint,
    currentWaypointIndex,
    waypointProgress,
    estimatedArrivalLabel,
    isError,
    error,
    isFetching,
    handlers: {
      handleBack,
      handleRetry,
      handleRefresh,
    },
  };
};
