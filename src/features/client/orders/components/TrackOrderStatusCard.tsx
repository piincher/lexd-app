/**
 * TrackOrderStatusCard Component
 * Displays the current status of a tracked order
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Card } from '@src/shared/ui/Card';
import { Theme } from '@src/constants/Theme';

interface TrackOrderStatusCardProps {
  status: string;
}

export const TrackOrderStatusCard: React.FC<TrackOrderStatusCardProps> = ({ status }) => {
  return (
    <Card style={styles.resultCard}>
      <Text style={styles.statusLabel}>Statut</Text>
      <Text style={styles.statusValue}>{status}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    marginBottom: Theme.spacing.md,
  },
  statusLabel: {
    fontSize: 14,
    color: Theme.neutral[500],
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginTop: Theme.spacing.xs,
  },
});
