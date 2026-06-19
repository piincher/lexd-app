/**
 * TransitStatusManager - Container transit status management component
 * Manages container status updates during transit with timeline and actions
 */

import React from "react";
import { View, ScrollView } from "react-native";
import { Snackbar } from "react-native-paper";
import {
  ContainerStatus,
  ContainerWaypoint,
} from "../../types";
import { useTransitStatusManager } from "../../hooks/useTransitStatusManager";
import { TransitStatusCard } from "./components/TransitStatusCard";
import { TransitTimeline } from "./components/TransitTimeline";
import { TransitActionButtons } from "./components/TransitActionButtons";
import { StatusUpdateModal } from "./components/StatusUpdateModal";
import { NonTransitView } from "./components/NonTransitView";
import { createStyles } from "./TransitStatusManager.styles";
import { useAppTheme } from '@src/providers/ThemeProvider';
import { getWaypointDisplayTitle } from '@src/shared/lib/waypointDisplay';

export interface TransitStatusManagerProps {
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
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);
  const {
    waypoints,
    currentWaypointIndex,
    currentWaypoint,
    completedWaypoints,
    isInTransit,
    isLoading,
    progressPercentage,
    modalVisible,
    selectedStatus,
    isArrivalAction,
    canMarkArrived,
    notes,
    snackbarVisible,
    snackbarMessage,
    snackbarType,
    updateWaypointMutation,
    handleOpenStatusModal,
    handleOpenArrivalModal,
    handleCloseModal,
    handleConfirmStatusUpdate,
    handleDismissSnackbar,
    setNotes,
  } = useTransitStatusManager({
    containerId,
    containerStatus,
    waypoints: propWaypoints,
    currentWaypointIndex: propCurrentWaypointIndex,
  });

  if (!isInTransit) {
    return (
      <NonTransitView
        containerStatus={containerStatus}
        containerNumber={containerNumber}
        waypoints={waypoints}
      />
    );
  }

  // Derive context for the action labels + client-message preview.
  const isFinalWaypoint = waypoints.length > 0 && currentWaypointIndex === waypoints.length - 1;
  const nextWaypoint = waypoints[currentWaypointIndex + 1];
  const currentLocationName = currentWaypoint ? getWaypointDisplayTitle(currentWaypoint) : null;
  const nextLocation = nextWaypoint ? getWaypointDisplayTitle(nextWaypoint) : null;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <TransitStatusCard
          containerNumber={containerNumber}
          currentWaypoint={currentWaypoint}
          currentWaypointIndex={currentWaypointIndex}
          totalWaypoints={waypoints.length}
          completedWaypoints={completedWaypoints}
          progressPercentage={progressPercentage}
          isLoading={isLoading}
        />

        {currentWaypoint && (
          <TransitActionButtons
            currentWaypoint={currentWaypoint}
            onStatusUpdate={handleOpenStatusModal}
            onMarkArrived={handleOpenArrivalModal}
            isLoading={updateWaypointMutation.isPending}
            isFinalWaypoint={isFinalWaypoint}
            canMarkArrived={canMarkArrived}
          />
        )}

        <TransitTimeline
          waypoints={waypoints}
          currentWaypointIndex={currentWaypointIndex}
          completedWaypoints={completedWaypoints}
        />
      </ScrollView>

      <StatusUpdateModal
        visible={modalVisible}
        onDismiss={handleCloseModal}
        onConfirm={handleConfirmStatusUpdate}
        selectedStatus={selectedStatus}
        currentWaypoint={currentWaypoint}
        notes={notes}
        onNotesChange={setNotes}
        isLoading={updateWaypointMutation.isPending}
        currentLocationName={currentLocationName}
        nextLocation={nextLocation}
        nextWaypoint={nextWaypoint}
        isFinalWaypoint={isFinalWaypoint}
        isArrivalAction={isArrivalAction}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={handleDismissSnackbar}
        duration={3000}
        style={[
          styles.snackbar,
          snackbarType === "error" && styles.snackbarError,
        ]}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

export default TransitStatusManager;
