/**
 * AirwayBillTrackingScreen - Customer view of airway bill tracking
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@src/constants/Theme';
import { useAirwayBillTracking } from '../hooks/useAirwayBillTracking';
import {
  AirwayBillTrackingHeader,
  AirwayBillTrackingRouteCard,
  AirwayBillTrackingTimeline,
  AirwayBillTrackingGoodsList,
} from '../components';
import { AirwayBillTrackingWaypoints } from './components/AirwayBillTrackingWaypoints';

export const AirwayBillTrackingScreen: React.FC = () => {
  const {
    awb,
    isLoading,
    currentStepIndex,
    flightLabel,
    departureAirport,
    arrivalAirport,
    waypoints,
    currentWaypointIndex,
    waypointProgress,
  } = useAirwayBillTracking();

  if (isLoading || !awb) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <AirwayBillTrackingHeader awbNumber={awb.awbNumber} flightLabel={flightLabel} />
        <AirwayBillTrackingRouteCard departureAirport={departureAirport} arrivalAirport={arrivalAirport} />
        {waypoints.length > 0 ? (
          <AirwayBillTrackingWaypoints
            waypoints={waypoints}
            currentWaypointIndex={currentWaypointIndex}
            progressPercentage={waypointProgress}
          />
        ) : (
          <AirwayBillTrackingTimeline currentStepIndex={currentStepIndex} />
        )}
        <AirwayBillTrackingGoodsList goodsIds={awb.goodsIds} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.neutral[50] },
  content: { padding: Theme.spacing.lg, paddingBottom: 60 },
  loadingText: { textAlign: 'center', marginTop: 40, color: Theme.neutral[500] },
});

export default AirwayBillTrackingScreen;
