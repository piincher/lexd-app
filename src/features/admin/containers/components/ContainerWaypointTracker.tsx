/**
 * ContainerWaypointTracker - Comprehensive waypoint tracker for admin use
 */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useContainerWaypointTracker } from './ContainerWaypointTracker/hooks';
import {
  TrackerHeader,
  ProgressSummary,
  WaypointTimeline,
  ConsigneeCard,
} from './ContainerWaypointTracker/components';
import { styles } from './ContainerWaypointTracker/ContainerWaypointTracker.styles';
import {
  ContainerWaypointTrackerProps,
  FinalDestination,
  ConsigneeInfo,
} from '../types';

export const ContainerWaypointTracker: React.FC<ContainerWaypointTrackerProps> = ({
  waypoints,
  currentWaypointIndex,
  onMarkArrived,
  onMarkDeparted,
  onAddNotes,
  onUpdateInfo,
  onUpdateStatus,
  containerNumber,
  finalDestination,
  consignee,
}) => {
  const {
    expandedIndex,
    toggleExpand,
    formatDateTime,
    formatDate,
    callConsignee,
    isDakarPort,
    isBorder,
    isWarehouse,
    getLocationCategoryDisplay,
    getRouteDisplay,
    handleQuickAction,
  } = useContainerWaypointTracker({
    waypoints,
    currentWaypointIndex,
    onMarkArrived,
    onMarkDeparted,
    onUpdateStatus,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TrackerHeader containerNumber={containerNumber} />
      <ProgressSummary
        currentWaypointIndex={currentWaypointIndex}
        totalWaypoints={waypoints.length}
      />
      <WaypointTimeline
        waypoints={waypoints}
        currentWaypointIndex={currentWaypointIndex}
        expandedIndex={expandedIndex}
        onToggleExpand={toggleExpand}
        formatDateTime={formatDateTime}
        isDakarPort={isDakarPort}
        isBorder={isBorder}
        isWarehouse={isWarehouse}
        getLocationCategoryDisplay={getLocationCategoryDisplay}
        getRouteDisplay={getRouteDisplay}
        handleQuickAction={handleQuickAction}
        onMarkArrived={onMarkArrived}
        onMarkDeparted={onMarkDeparted}
        onAddNotes={onAddNotes}
        onUpdateInfo={onUpdateInfo}
      />
      {consignee && <ConsigneeCard consignee={consignee} onCall={callConsignee} />}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
};
