/**
 * Container Tracking Screen Hook
 * All state, data fetching, and handlers for ContainerTrackingScreen
 */

import { useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { format } from 'date-fns/format';
import { fr } from 'date-fns/locale';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetContainerDetails } from './useCustomerContainers';
import { useGetWaypoints } from '@src/shared/hooks/useWaypoints';

export const useContainerTrackingScreen = (containerId: string) => {
  const [contactDialogVisible, setContactDialogVisible] = useState(false);
  const [expandedWaypoint, setExpandedWaypoint] = useState<number | null>(null);
  const [showWaypointJourney, setShowWaypointJourney] = useState(false);
  const [showTimelineDetails, setShowTimelineDetails] = useState(false);

  const {
    data: container,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetContainerDetails(containerId);

  const { data: waypointsData, isLoading: waypointsLoading } = useGetWaypoints(containerId);

  const handleRefresh = useCallback(() => refetch(), [refetch]);

  const handleCallWarehouse = useCallback(() => {
    if (container?.pickupContact?.phone) {
      Linking.openURL(`tel:${container.pickupContact.phone}`);
    }
    setContactDialogVisible(false);
  }, [container]);

  const getShippingModeIcon = useCallback((
    mode: 'SEA' | 'AIR'
  ): React.ComponentProps<typeof MaterialCommunityIcons>['name'] => {
    return mode === 'SEA' ? 'ferry' : 'airplane';
  }, []);

  const formatDate = useCallback((dateString?: string): string => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  }, []);

  const formatDateTime = useCallback((dateString?: string): string => {
    if (!dateString) return 'Non disponible';
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
  }, []);

  const toggleWaypoint = useCallback((idx: number) => {
    setExpandedWaypoint((prev) => (prev === idx ? null : idx));
  }, []);

  return {
    container,
    isLoading,
    isError,
    error,
    isFetching,
    waypointsData,
    waypointsLoading,
    contactDialogVisible,
    setContactDialogVisible,
    expandedWaypoint,
    showWaypointJourney,
    setShowWaypointJourney,
    showTimelineDetails,
    setShowTimelineDetails,
    handleRefresh,
    handleCallWarehouse,
    getShippingModeIcon,
    formatDate,
    formatDateTime,
    toggleWaypoint,
  };
};
