/**
 * TrackOrderDetailsCard Component
 * Displays order details for tracked orders
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Card } from '@src/shared/ui/Card';
import { ClientOrder } from '../api/clientOrdersApi';
import { Theme } from '@src/constants/Theme';

interface TrackOrderDetailsCardProps {
  order: ClientOrder;
}

export const TrackOrderDetailsCard: React.FC<TrackOrderDetailsCardProps> = ({ order }) => {
  return (
    <Card style={styles.resultCard}>
      <Text style={styles.sectionTitle}>Détails</Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Numéro</Text>
        <Text style={styles.detailValue}>{order.orderNumber}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Destination</Text>
        <Text style={styles.detailValue}>{order.destination}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.neutral[100],
  },
  detailLabel: {
    fontSize: 14,
    color: Theme.neutral[500],
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[800],
  },
});
