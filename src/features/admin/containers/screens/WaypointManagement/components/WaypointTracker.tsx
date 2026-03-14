import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerWaypointTracker } from '../../../components/ContainerWaypointTracker';
import { ContainerWaypoint } from '../../../types';

interface WaypointTrackerProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  containerNumber: string;
  onMarkArrived: (index: number) => void;
  onMarkDeparted: (index: number) => void;
  onUpdateInfo: (index: number) => void;
}

export const WaypointTracker: React.FC<WaypointTrackerProps> = ({
  waypoints,
  currentWaypointIndex,
  containerNumber,
  onMarkArrived,
  onMarkDeparted,
  onUpdateInfo,
}) => {
  return (
    <View style={styles.container}>
      <ContainerWaypointTracker
        waypoints={waypoints}
        currentWaypointIndex={currentWaypointIndex}
        containerNumber={containerNumber}
        onMarkArrived={onMarkArrived}
        onMarkDeparted={onMarkDeparted}
        onUpdateInfo={onUpdateInfo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
