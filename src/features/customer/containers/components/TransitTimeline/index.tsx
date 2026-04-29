/**
 * TransitTimeline - Customer-facing transit timeline
 * Refactored: Composed from smaller components, < 150 lines
 */
import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerWaypoint } from '../../types';
import { RouteFlow } from './components/RouteFlow';
import { TimelineHeader } from './components/TimelineHeader';
import { CurrentWaypointSection } from './components/CurrentWaypointSection';
import { JourneySummary } from './components/JourneySummary';
import { ArrivalEstimate } from './components/ArrivalEstimate';
import { DakarInfo } from './components/DakarInfo';
import { PickupInfo } from './components/PickupInfo';
import { useTransitTimeline } from './hooks/useTransitTimeline';
import { createStyles } from './TransitTimeline.styles';

interface Props {
  waypoints: ContainerWaypoint[];
  currentWaypointIndex: number;
  containerNumber: string;
  lastUpdateTimestamp?: string;
  consignee?: { name: string; phone: string; warehouseAddress: string; businessHours?: string };
}

export const TransitTimeline: React.FC<Props> = ({
  waypoints, currentWaypointIndex, containerNumber, lastUpdateTimestamp, consignee,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const { currentWaypoint, finalDestination, dakarWaypoint, eta, completedCount, handleCall } =
    useTransitTimeline(waypoints, currentWaypointIndex, lastUpdateTimestamp);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TimelineHeader
        containerNumber={containerNumber}
        completedCount={completedCount}
        totalWaypoints={waypoints.length}
        lastUpdateTimestamp={lastUpdateTimestamp}
        styles={styles}
      />

      <RouteFlow />

      {currentWaypoint && (
        <CurrentWaypointSection currentWaypoint={currentWaypoint} styles={styles} />
      )}

      <JourneySummary
        origin={waypoints[0]?.location}
        destination={finalDestination?.location}
        styles={styles}
        secondaryTextColor={colors.text.secondary}
      />

      <ArrivalEstimate
        eta={eta}
        destination={finalDestination?.location}
        iconColor={colors.accent.goldDark}
        styles={styles}
      />

      {dakarWaypoint && <DakarInfo dakarWaypoint={dakarWaypoint} styles={styles} />}

      {consignee && (
        <PickupInfo consignee={consignee} onCall={handleCall} iconColor={colors.text.inverse} styles={styles} />
      )}

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
};

export default TransitTimeline;
