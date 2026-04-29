/**
 * TrackOrderResults Component
 * Displays loading, error, and result states for order tracking
 */

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { EmptyState } from '@src/shared/ui/EmptyState';
import { TrackOrderResult } from '../hooks/useTrackOrder';
import { TrackOrderStatusCard } from './TrackOrderStatusCard';
import { TrackOrderDetailsCard } from './TrackOrderDetailsCard';
import { TrackOrderTimeline } from './TrackOrderTimeline';
import { Theme } from '@src/constants/Theme';

interface TrackOrderResultsProps {
  data: TrackOrderResult | undefined;
  isLoading: boolean;
  isError: boolean;
  hasSearched: boolean;
}

export const TrackOrderResults: React.FC<TrackOrderResultsProps> = ({
  data,
  isLoading,
  isError,
  hasSearched,
}) => {
  if (isLoading) {
    return (
      <EmptyState title="Recherche en cours..." loading style={styles.loadingState} />
    );
  }

  if (isError && hasSearched) {
    return (
      <EmptyState
        icon="alert-circle"
        title="Commande non trouvée"
        message="Vérifiez votre code de suivi et réessayez"
        style={styles.errorState}
      />
    );
  }

  if (!data?.found) {
    return null;
  }

  return (
    <ScrollView style={styles.resultsContainer}>
      <TrackOrderStatusCard status={data.currentStatus} />
      {data.order && <TrackOrderDetailsCard order={data.order} />}
      {data.order?.timeline && data.order.timeline.length > 0 && (
        <TrackOrderTimeline timeline={data.order.timeline} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingState: {
    marginTop: Theme.spacing.xl,
  },
  errorState: {
    marginTop: Theme.spacing.xl,
  },
  resultsContainer: {
    flex: 1,
  },
});
