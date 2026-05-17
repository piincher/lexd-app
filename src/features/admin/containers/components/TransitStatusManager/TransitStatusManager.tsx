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
import { styles } from "./TransitStatusManager.styles";

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
    notes,
    snackbarVisible,
    snackbarMessage,
    snackbarType,
    updateWaypointMutation,
    handleOpenStatusModal,
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
          progressPercentage={progressPercentage}
          isLoading={isLoading}
        />

        {currentWaypoint && (
          <TransitActionButtons
            currentWaypoint={currentWaypoint}
            onStatusUpdate={handleOpenStatusModal}
            isLoading={updateWaypointMutation.isPending}
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
