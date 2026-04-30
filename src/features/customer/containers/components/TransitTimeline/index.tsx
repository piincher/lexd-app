/**
 * TransitTimeline - Customer-facing transit timeline
 * Refactored: Composed from smaller components, < 150 lines
 */
import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { ContainerWaypoint } from '../../types';
import { RouteFlow } from './components/RouteFlow';
import { TimelineHeader } from './components/TimelineHeader';
import { CurrentWaypointSection } from './components/CurrentWaypointSection';
import { WaypointsSection } from './components/WaypointsSection';
import { JourneySummary } from './components/JourneySummary';
import { ArrivalEstimate } from './components/ArrivalEstimate';
import { DakarInfo } from './components/DakarInfo';
import { PickupInfo } from './components/PickupInfo';
import { useTransitTimeline } from './hooks/useTransitTimeline';
import { createStyles } from './TransitTimeline.styles';

export interface TransitTimelineProps {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  containerNumber: string;
  lastUpdateTimestamp?: string;
  consignee?: {
    name: string;
    phone: string;
    warehouseAddress: string;
    businessHours?: string;
  };
}

export const TransitTimeline: React.FC<TransitTimelineProps> = ({
  waypoints,
  currentWaypointIndex,
  containerNumber,
  lastUpdateTimestamp,
  consignee,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const {
    completedWaypoints,
    currentWaypoint,
    upcomingWaypoints,
    progressPercentage,
    finalDestination,
    dakarWaypoint,
    eta,
    completedCount,
    handleCall,
  } = useTransitTimeline(waypoints, currentWaypointIndex, lastUpdateTimestamp);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TimelineHeader
        containerNumber={containerNumber}
        progressPercentage={progressPercentage}
        completedCount={completedCount}
        totalWaypoints={waypoints.length}
        lastUpdateTimestamp={lastUpdateTimestamp}
        styles={styles}
      />

      <RouteFlow />

      {currentWaypoint && (
        <CurrentWaypointSection currentWaypoint={currentWaypoint} styles={styles} />
      )}

      <WaypointsSection
        waypoints={waypoints}
        upcomingWaypoints={upcomingWaypoints}
        completedWaypoints={completedWaypoints}
        styles={styles}
      />

      <ArrivalEstimate
        eta={eta}
        destination={finalDestination?.location}
        destinationCode={finalDestination?.locationCode}
        iconColor={colors.accent.goldDark}
        styles={styles}
      />

      <JourneySummary
        origin={waypoints[0]?.location}
        destination={finalDestination?.location}
        styles={styles}
        secondaryTextColor={Theme.neutral[400]}
      />

      {dakarWaypoint && <DakarInfo dakarWaypoint={dakarWaypoint} styles={styles} />}

      {consignee && (
        <PickupInfo consignee={consignee} onCall={handleCall} styles={styles} />
      )}

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
};

export default TransitTimeline;
