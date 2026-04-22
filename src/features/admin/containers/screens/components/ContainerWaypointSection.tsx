/**
 * ContainerWaypointSection - Waypoint tracker section component
 * Refactored from ContainerWaypointTrackerSection
 * Updated: Conditionally renders TransitStatusManager for IN_TRANSIT containers
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetWaypoints,
  useUpdateWaypointStatus,
  waypointQueryKeys,
} from '../../hooks/useWaypoints';
import { useGetContainerById, containerQueryKeys } from '../../hooks/useContainers';
import { ContainerWaypointTracker } from '../../components/ContainerWaypointTracker';
import { TransitStatusManager } from '../../components/TransitStatusManager';
import { InitializeWaypointsButton } from '../../components/TransitStatusManager/components/InitializeWaypointsButton';
import {  createStyles  } from '../ContainerDetailScreen.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface ContainerWaypointSectionProps {
  containerId: string;
  containerNumber?: string;
  containerStatus?: string;
}

export const ContainerWaypointSection: React.FC<ContainerWaypointSectionProps> = ({
  containerId,
  containerNumber: propContainerNumber,
  containerStatus: propContainerStatus,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const queryClient = useQueryClient();
  
  // Fetch container data if status not provided via props
  const { data: containerData } = useGetContainerById(
    !propContainerStatus ? containerId : undefined
  );
  
  // Get container status from props or fetched data
  const container = containerData?.data?.container || containerData?.data;
  const containerStatus = propContainerStatus || container?.status;
  const containerNumber = propContainerNumber || container?.virtualContainerNumber || container?.actualContainerNumber;
  const isInTransit = containerStatus === 'IN_TRANSIT';
  
  const { data: waypointsData, isLoading } = useGetWaypoints(containerId);
  const updateWaypointMutation = useUpdateWaypointStatus();

  const handleUpdateStatus = async (waypointIndex: number, status: string) => {
    try {
      await updateWaypointMutation.mutateAsync({
        containerId,
        waypointIndex,
        status: status as any,
      });
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(containerId),
      });
    } catch (error) {
      console.error('Failed to update waypoint status:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="small" color={Theme.primary[500]} />
        <Text style={styles.loadingText}>Chargement du suivi...</Text>
      </View>
    );
  }

  if (!waypointsData?.waypoints || waypointsData.waypoints.length === 0) {
    return (
      <Animated.View entering={FadeIn} style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="location" size={20} color={Theme.primary[600]} />
          <Text style={styles.cardTitle}>Suivi du Transit</Text>
        </View>
        <View style={{ padding: Theme.spacing.lg, alignItems: 'center' }}>
          <Ionicons name="map-outline" size={48} color={Theme.neutral[300]} />
          <Text style={{ marginTop: Theme.spacing.md, color: Theme.neutral[500], textAlign: 'center' }}>
            Aucun point de passage configuré pour ce conteneur.
          </Text>
          <Text style={{ marginTop: Theme.spacing.sm, color: Theme.neutral[400], fontSize: 12, textAlign: 'center' }}>
            Les waypoints seront initialisés automatiquement lors de la création.
          </Text>
          <InitializeWaypointsButton 
            containerId={containerId} 
            onInitialized={() => {
              queryClient.invalidateQueries({
                queryKey: waypointQueryKeys.list(containerId),
              });
            }}
          />
        </View>
      </Animated.View>
    );
  }

  const { waypoints, currentWaypointIndex, containerNumber: waypointContainerNumber, finalDestination, consignee } =
    waypointsData;

  // Use container number from waypoints data as fallback
  const displayContainerNumber = containerNumber || waypointContainerNumber;

  return (
    <Animated.View entering={FadeIn} style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="location" size={20} color={Theme.primary[600]} />
        <Text style={styles.cardTitle}>Suivi du Transit</Text>
      </View>
      
      {isInTransit ? (
        // Full transit status manager for IN_TRANSIT containers
        <TransitStatusManager
          containerId={containerId}
          containerNumber={displayContainerNumber}
          containerStatus={containerStatus as any}
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
        />
      ) : (
        // Standard waypoint tracker for other statuses
        <ContainerWaypointTracker
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          containerNumber={displayContainerNumber}
          finalDestination={finalDestination}
          consignee={consignee}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </Animated.View>
  );
};

export default ContainerWaypointSection;
