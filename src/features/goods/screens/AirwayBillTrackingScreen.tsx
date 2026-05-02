/**
 * AirwayBillTrackingScreen - Customer view of airway bill tracking
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';
import { useAirwayBillTracking } from '../hooks/useAirwayBillTracking';
import { AirwayBillTrackingContent, AirwayBillTrackingState } from '../components';

export const AirwayBillTrackingScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    awb,
    isLoading,
    currentStepIndex,
    flightLabel,
    departureAirport,
    arrivalAirport,
    waypoints,
    currentWaypoint,
    currentWaypointIndex,
    waypointProgress,
    estimatedArrivalLabel,
    isError,
    error,
    refetch,
    isFetching,
  } = useAirwayBillTracking();

  if (isLoading) {
    return (
      <AirwayBillTrackingState
        loading
        title="Chargement"
        message="Chargement du suivi..."
        onBack={() => navigation.goBack()}
      />
    );
  }

  if (isError || !awb) {
    return (
      <AirwayBillTrackingState
        title="Suivi indisponible"
        message={error instanceof Error ? error.message : "Impossible de charger cette expédition pour le moment."}
        onBack={() => navigation.goBack()}
        onRetry={() => refetch?.()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Suivi aérien" subtitle={awb.awbNumber} />
      </Appbar.Header>
      <AirwayBillTrackingContent
        awb={awb}
        flightLabel={flightLabel}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        waypoints={waypoints}
        currentWaypoint={currentWaypoint}
        currentWaypointIndex={currentWaypointIndex}
        waypointProgress={waypointProgress}
        currentStepIndex={currentStepIndex}
        estimatedArrivalLabel={estimatedArrivalLabel}
        isFetching={Boolean(isFetching)}
        onRefresh={() => refetch?.()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.neutral[50] },
});

export default AirwayBillTrackingScreen;
