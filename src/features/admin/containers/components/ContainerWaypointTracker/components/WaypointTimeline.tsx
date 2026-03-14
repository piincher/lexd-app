import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ContainerWaypoint, ExtendedWaypointStatus } from '../../../types';
import { WaypointCard } from './WaypointCard';
import { WaypointDetails } from './WaypointDetails';
import { PortActions } from './PortActions';
import { LegacyActions } from './LegacyActions';
import { TimelineConnector } from './TimelineConnector';

interface WaypointTimelineProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  expandedIndex: number | null;
  onToggleExpand: (index: number) => void;
  formatDateTime: (dateString?: string) => string;
  isDakarPort: (waypoint: ContainerWaypoint) => boolean;
  isBorder: (waypoint: ContainerWaypoint) => boolean;
  isWarehouse: (waypoint: ContainerWaypoint) => boolean;
  getLocationCategoryDisplay: (waypoint: ContainerWaypoint) => { label: string; color: string; icon: string } | null;
  getRouteDisplay: (waypoint: ContainerWaypoint, index: number) => { icon: string; label: string } | null;
  handleQuickAction: (waypointIndex: number, actionStatus: ExtendedWaypointStatus) => void;
  onMarkArrived?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onMarkDeparted?: (waypointIndex: number, status?: ExtendedWaypointStatus) => void;
  onAddNotes?: (waypointIndex: number) => void;
  onUpdateInfo?: (waypointIndex: number) => void;
}

export const WaypointTimeline: React.FC<WaypointTimelineProps> = ({
  waypoints,
  currentWaypointIndex,
  expandedIndex,
  onToggleExpand,
  formatDateTime,
  isDakarPort,
  isBorder,
  isWarehouse,
  getLocationCategoryDisplay,
  getRouteDisplay,
  handleQuickAction,
  onMarkArrived,
  onMarkDeparted,
  onAddNotes,
  onUpdateInfo,
}) => {
  return (
    <View style={styles.timelineContainer}>
      {waypoints.map((waypoint, index) => {
        const isExpanded = expandedIndex === index;
        const isCurrent = index === currentWaypointIndex;
        const isCompleted = index < currentWaypointIndex;

        return (
          <Animated.View
            key={`${waypoint.location?.portCode || index}-${index}`}
            entering={FadeInUp.delay(300 + index * 50)}
            style={styles.waypointWrapper}
          >
            <TimelineConnector index={index} isCompleted={isCompleted} isCurrent={isCurrent} />
            <WaypointCard
              waypoint={waypoint}
              index={index}
              isExpanded={isExpanded}
              isCurrent={isCurrent}
              isCompleted={isCompleted}
              isDakar={isDakarPort(waypoint)}
              isBorderPoint={isBorder(waypoint)}
              isWarehousePoint={isWarehouse(waypoint)}
              locationCategory={getLocationCategoryDisplay(waypoint)}
              routeDisplay={getRouteDisplay(waypoint, index)}
              onPress={() => onToggleExpand(index)}
            />
            {isExpanded && (
              <>
                <WaypointDetails waypoint={waypoint} formatDateTime={formatDateTime} />
                <PortActions waypoint={waypoint} index={index} onQuickAction={handleQuickAction} />
                <LegacyActions
                  waypoint={waypoint}
                  index={index}
                  onMarkArrived={onMarkArrived}
                  onMarkDeparted={onMarkDeparted}
                  onAddNotes={onAddNotes}
                  onUpdateInfo={onUpdateInfo}
                />
              </>
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  waypointWrapper: {
    position: 'relative',
  },
});
