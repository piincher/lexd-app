/**
 * ContainerWaypointSection - Waypoint tracker section component
 * Refactored from ContainerWaypointTrackerSection
 * Updated: Conditionally renders TransitStatusManager for IN_TRANSIT containers
 */

import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  useGetWaypoints,
  useUpdateWaypointStatus,
} from '../../hooks/useWaypoints';
import { useGetContainerById } from '../../hooks/useContainers';
import { ContainerWaypointTracker } from '../../components/ContainerWaypointTracker';
import { TransitStatusManager } from '../../components/TransitStatusManager';
import { InitializeWaypointsButton } from '../../components/TransitStatusManager/components/InitializeWaypointsButton';
import { createStyles } from '../ContainerDetailScreen.styles';
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

  const { data: containerData } = useGetContainerById(
    !propContainerStatus ? containerId : undefined
  );

  const container = containerData?.data?.container || containerData?.data;
  const containerStatus = propContainerStatus || container?.status;
  const containerNumber = propContainerNumber || container?.virtualContainerNumber || container?.actualContainerNumber;
  const isInTransit = containerStatus === 'IN_TRANSIT';

  const { data: waypointsData, isLoading } = useGetWaypoints(containerId);
  const updateWaypointMutation = useUpdateWaypointStatus();

  if (isLoading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="small" color={colors.primary[500]} />
        <Text style={styles.loadingText}>Chargement du suivi...</Text>
      </View>
    );
  }

  if (!waypointsData?.waypoints || waypointsData.waypoints.length === 0) {
    return (
      <Animated.View entering={FadeIn} style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="location" size={20} color={colors.primary[600]} />
          <Text style={styles.cardTitle}>Suivi du Transit</Text>
        </View>
        <View style={{ padding: Theme.spacing.lg, alignItems: 'center' }}>
          <Ionicons name="map-outline" size={48} color={colors.neutral[300]} />
          <Text style={{ marginTop: Theme.spacing.md, color: colors.neutral[500], textAlign: 'center' }}>
            Aucun point de passage configuré pour ce conteneur.
          </Text>
          <Text style={{ marginTop: Theme.spacing.sm, color: colors.neutral[400], fontSize: 12, textAlign: 'center' }}>
            Les waypoints seront initialisés automatiquement lors de la création.
          </Text>
          <InitializeWaypointsButton containerId={containerId} />
        </View>
      </Animated.View>
    );
  }

  const { waypoints, currentWaypointIndex, containerNumber: waypointContainerNumber } = waypointsData;

  const displayContainerNumber = containerNumber || waypointContainerNumber;

  return (
    <Animated.View entering={FadeIn} style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="location" size={20} color={colors.primary[600]} />
        <Text style={styles.cardTitle}>Suivi du Transit</Text>
      </View>

      {isInTransit ? (
        <TransitStatusManager
          containerId={containerId}
          containerNumber={displayContainerNumber}
          containerStatus={containerStatus as any}
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
        />
      ) : (
        <ContainerWaypointTracker
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          containerNumber={displayContainerNumber}
          onUpdateStatus={(waypointIndex, status) =>
            updateWaypointMutation.mutate({ containerId, waypointIndex, status: status as any })
          }
        />
      )}
    </Animated.View>
  );
};

export default ContainerWaypointSection;
