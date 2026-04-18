/**
 * TransitStatusManager - Container transit status management component
 * Manages container status updates during transit with timeline and actions
 */

import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { ContainerStatus, ContainerWaypoint, WaypointStatus } from '../../types';
import {
  useGetWaypoints,
  useUpdateWaypoint,
  waypointQueryKeys,
} from '../../hooks/useWaypoints';
import { containerQueryKeys } from '../../hooks/useContainers';
import { useQueryClient } from '@tanstack/react-query';
import { TransitStatusCard } from './components/TransitStatusCard';
import { TransitTimeline } from './components/TransitTimeline';
import { TransitActionButtons } from './components/TransitActionButtons';
import { StatusUpdateModal } from './components/StatusUpdateModal';
import { NonTransitView } from './components/NonTransitView';

interface TransitStatusManagerProps {
  containerId: string;
  containerNumber: string;
  containerStatus: ContainerStatus;
  waypoints?: ContainerWaypoint[];
  currentWaypointIndex?: number;
}

export const TransitStatusManager: React.FC<TransitStatusManagerProps> = ({
  containerId,
  containerNumber,
  containerStatus,
  waypoints: propWaypoints,
  currentWaypointIndex: propCurrentWaypointIndex,
}) => {
  const queryClient = useQueryClient();
  
  // ============================================
  // HOOKS - Data fetching and mutations
  // ============================================
  const {
    data: waypointsData,
    isLoading: isWaypointsLoading,
    refetch: refetchWaypoints,
  } = useGetWaypoints(containerId);

  const updateWaypointMutation = useUpdateWaypoint();

  // ============================================
  // LOCAL STATE - Modal and form state
  // ============================================
  const [selectedStatus, setSelectedStatus] = useState<WaypointStatus | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

  // ============================================
  // DERIVED STATE - Computed from props/hooks
  // ============================================
  const waypoints = propWaypoints ?? waypointsData?.waypoints ?? [];
  const currentWaypointIndex = propCurrentWaypointIndex ?? waypointsData?.currentWaypointIndex ?? 0;
  const isInTransit = containerStatus === 'IN_TRANSIT';
  const isLoading = isWaypointsLoading;
  
  // Calculate progress percentage
  const completedCount = waypoints.filter((w, i) => i < currentWaypointIndex || w.status === 'COMPLETED').length;
  const progressPercentage = waypoints.length > 0 ? Math.round((completedCount / waypoints.length) * 100) : 0;

  const currentWaypoint = waypoints[currentWaypointIndex];
  const completedWaypoints = waypoints.filter((_, index) => index < currentWaypointIndex).length;

  // ============================================
  // HANDLERS - User interactions
  // ============================================
  const handleOpenStatusModal = useCallback((status: WaypointStatus) => {
    setSelectedStatus(status);
    setModalVisible(true);
    setNotes('');
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedStatus(null);
    setNotes('');
  }, []);

  const handleConfirmStatusUpdate = useCallback(async () => {
    if (!selectedStatus || currentWaypointIndex < 0) return;

    try {
      await updateWaypointMutation.mutateAsync({
        containerId,
        waypointIndex: currentWaypointIndex,
        data: {
          status: selectedStatus,
          notes: notes || undefined,
        },
      });

      // Refetch data to get latest state
      await refetchWaypoints();
      
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: waypointQueryKeys.list(containerId),
      });
      queryClient.invalidateQueries({
        queryKey: containerQueryKeys.detail(containerId),
      });

      setSnackbarMessage('Statut mis à jour avec succès');
      setSnackbarType('success');
      setSnackbarVisible(true);
      handleCloseModal();
    } catch (error) {
      setSnackbarMessage('Erreur lors de la mise à jour du statut');
      setSnackbarType('error');
      setSnackbarVisible(true);
    }
  }, [
    selectedStatus,
    currentWaypointIndex,
    containerId,
    notes,
    updateWaypointMutation,
    refetchWaypoints,
    queryClient,
    handleCloseModal,
  ]);

  const handleDismissSnackbar = useCallback(() => {
    setSnackbarVisible(false);
  }, []);

  // ============================================
  // RENDER - Non-transit simplified view
  // ============================================
  if (!isInTransit) {
    return (
      <NonTransitView
        containerStatus={containerStatus}
        containerNumber={containerNumber}
        waypoints={waypoints}
      />
    );
  }

  // ============================================
  // RENDER - Full transit UI
  // ============================================
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Current Status Card */}
        <TransitStatusCard
          containerNumber={containerNumber}
          currentWaypoint={currentWaypoint}
          currentWaypointIndex={currentWaypointIndex}
          totalWaypoints={waypoints.length}
          progressPercentage={progressPercentage}
          isLoading={isWaypointsLoading}
        />

        {/* Quick Action Buttons */}
        {currentWaypoint && (
          <TransitActionButtons
            currentWaypoint={currentWaypoint}
            onStatusUpdate={handleOpenStatusModal}
            isLoading={updateWaypointMutation.isPending}
          />
        )}

        {/* Full Timeline */}
        <TransitTimeline
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          completedWaypoints={completedWaypoints}
        />
      </ScrollView>

      {/* Status Update Confirmation Modal */}
      <StatusUpdateModal
        visible={modalVisible}
        onDismiss={handleCloseModal}
        onConfirm={handleConfirmStatusUpdate}
        selectedStatus={selectedStatus}
        currentWaypoint={currentWaypoint}
        notes={notes}
        onNotesChange={setNotes}
        isLoading={updateWaypointMutation.isPending}
      />

      {/* Feedback Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleDismissSnackbar}
        duration={3000}
        style={[
          styles.snackbar,
          snackbarType === 'error' && styles.snackbarError,
        ]}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

// ============================================
// STYLES
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing['2xl'],
  },
  snackbar: {
    backgroundColor: Theme.status.success,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  snackbarError: {
    backgroundColor: Theme.status.error,
  },
});

export default TransitStatusManager;
