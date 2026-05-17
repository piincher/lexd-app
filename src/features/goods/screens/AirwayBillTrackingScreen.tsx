/**
 * AirwayBillTrackingScreen - Customer view of airway bill tracking
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { useAirwayBillTrackingScreen } from './hooks/useAirwayBillTrackingScreen';
import { useAirwayBillTrackingScreenStyles } from './AirwayBillTrackingScreen.styles';
import { AirwayBillTrackingContent, AirwayBillTrackingState } from '../components';

export const AirwayBillTrackingScreen: React.FC = () => {
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
    isFetching,
    handlers,
  } = useAirwayBillTrackingScreen();

  const styles = useAirwayBillTrackingScreenStyles();

  if (isLoading) {
    return (
      <AirwayBillTrackingState
        loading
        title="Chargement"
        message="Chargement du suivi..."
        onBack={handlers.handleBack}
      />
    );
  }

  if (isError || !awb) {
    return (
      <AirwayBillTrackingState
        title="Suivi indisponible"
        message={error instanceof Error ? error.message : "Impossible de charger cette expédition pour le moment."}
        onBack={handlers.handleBack}
        onRetry={handlers.handleRetry}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handlers.handleBack} />
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
        onRefresh={handlers.handleRefresh}
      />
    </SafeAreaView>
  );
};

export default AirwayBillTrackingScreen;
