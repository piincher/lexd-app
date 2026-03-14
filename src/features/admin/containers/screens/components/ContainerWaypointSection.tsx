/**
 * ContainerWaypointSection - Waypoint tracker section component
 * Refactored from ContainerWaypointTrackerSection
 */

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetWaypoints,
  useUpdateWaypointStatus,
  waypointQueryKeys,
} from '../../hooks/useWaypoints';
import { containerQueryKeys } from '../../hooks/useContainers';
import { ContainerWaypointTracker } from '../../components/ContainerWaypointTracker';
import { styles } from '../ContainerDetailScreen.styles';
import { Theme } from '@src/constants/Theme';

interface ContainerWaypointSectionProps {
  containerId: string;
}

export const ContainerWaypointSection: React.FC<ContainerWaypointSectionProps> = ({
  containerId,
}) => {
  const queryClient = useQueryClient();
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
    return null;
  }

  const { waypoints, currentWaypointIndex, containerNumber, finalDestination, consignee } =
    waypointsData;

  return (
    <Animated.View entering={FadeIn} style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="location" size={20} color={Theme.primary[600]} />
        <Text style={styles.cardTitle}>Suivi du Transit</Text>
      </View>
      <ContainerWaypointTracker
        waypoints={waypoints}
        currentWaypointIndex={currentWaypointIndex}
        containerNumber={containerNumber}
        finalDestination={finalDestination}
        consignee={consignee}
        onUpdateStatus={handleUpdateStatus}
      />
    </Animated.View>
  );
};

export default ContainerWaypointSection;
