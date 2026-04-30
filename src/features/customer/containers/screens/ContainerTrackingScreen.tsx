/**
 * Container Tracking Screen
 * Maersk-style detailed tracking view with waypoint journey
 */

import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useContainerTrackingStyles } from './ContainerTrackingScreen.styles';
import { useContainerTrackingScreen } from '../hooks/useContainerTrackingScreen';
import { TrackingAppbar } from '../components/TrackingAppbar';
import { TrackingErrorState } from '../components/TrackingErrorState';
import { ContainerHeaderCard } from '../components/ContainerHeaderCard';
import { ETACard } from '../components/ETACard';
import { ProgressSummaryCard } from '../components/ProgressSummaryCard';
import { WaypointJourneySection } from '../components/WaypointJourneySection';
import { TimelineDetailsSection } from '../components/TimelineDetailsSection';
import { HelpSection } from '../components/HelpSection';
import { ContactDialog } from '../components/ContactDialog';
import { ContainerGoodsSection } from '../components/ContainerGoodsSection';
import { PickupInfoCard } from '../components/PickupInfoCard';
import { ContainerTrackingSkeleton } from '../components/ContainerTrackingSkeleton';
import { CUSTOMER_STATUS_COLORS, CUSTOMER_STATUS_BG_COLORS } from '../types';

const ContainerTrackingScreen: React.FC<RootStackScreenProps<'ContainerTracking'>> = ({
  navigation,
  route,
}) => {
  const { containerId } = route.params;
  const styles = useContainerTrackingStyles();
  const {
    container, isLoading, isError, error, isFetching, waypointsData,
    contactDialogVisible, setContactDialogVisible, expandedWaypoint,
    showWaypointJourney, setShowWaypointJourney, showTimelineDetails,
    setShowTimelineDetails, handleRefresh, handleCallWarehouse,
    getShippingModeIcon, formatDate, formatDateTime, toggleWaypoint,
  } = useContainerTrackingScreen(containerId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <TrackingAppbar navigation={navigation} />
        <ContainerTrackingSkeleton />
      </SafeAreaView>
    );
  }

  if (isError || !container) {
    return (
      <SafeAreaView style={styles.container}>
        <TrackingAppbar navigation={navigation} />
        <TrackingErrorState error={error} onRetry={handleRefresh} />
      </SafeAreaView>
    );
  }

  const waypoints = waypointsData?.waypoints || [];
  const currentWaypointIndex = waypointsData?.currentWaypointIndex ?? -1;
  const progressPercentage = waypointsData?.progressPercentage ?? 0;
  const statusColor = CUSTOMER_STATUS_COLORS[container.status] || '';
  const statusBgColor = CUSTOMER_STATUS_BG_COLORS[container.status] || '';
  const eta = container.predictiveEta || container.etaPrediction || container.eta;
  const estimatedArrival = eta?.estimatedArrival?.toString() || container.estimatedArrival;

  return (
    <SafeAreaView style={styles.container}>
      <TrackingAppbar navigation={navigation} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.scrollContent}
      >
        <ContainerHeaderCard container={container} statusColor={statusColor} statusBgColor={statusBgColor} getShippingModeIcon={getShippingModeIcon} />
        {estimatedArrival && (
          <ETACard estimatedArrival={estimatedArrival} eta={eta} progressPercentage={progressPercentage} formatDate={formatDate} />
        )}
        {waypoints.length > 0 && (
          <ProgressSummaryCard currentWaypointIndex={currentWaypointIndex} waypointsLength={waypoints.length} progressPercentage={progressPercentage} />
        )}
        {waypoints.length > 0 && (
          <WaypointJourneySection waypoints={waypoints} currentWaypointIndex={currentWaypointIndex} expandedWaypoint={expandedWaypoint} showWaypointJourney={showWaypointJourney} onToggleSection={() => setShowWaypointJourney((v) => !v)} onToggleWaypoint={toggleWaypoint} />
        )}
        {container.timeline && (
          <TimelineDetailsSection timeline={container.timeline} showTimelineDetails={showTimelineDetails} onToggleSection={() => setShowTimelineDetails((v) => !v)} formatDateTime={formatDateTime} />
        )}
        <ContainerGoodsSection goods={container.myGoods || []} containerId={containerId} onViewPackingList={(id) => navigation.navigate('ClientPackingList', { containerId: id })} />
        <PickupInfoCard container={container} onContactPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setContactDialogVisible(true); }} />
        <HelpSection onContactSupport={() => navigation.navigate('TicketList' as never)} />
      </ScrollView>
      <ContactDialog visible={contactDialogVisible} container={container} onDismiss={() => setContactDialogVisible(false)} onCall={handleCallWarehouse} />
    </SafeAreaView>
  );
};

export default ContainerTrackingScreen;
