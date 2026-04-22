/**
 * VoidHistorySection - Displays void history for an order
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from '@src/shared/ui/Card';
import { Theme } from '@src/constants/Theme';
import { VoidHistoryItem } from '../api/types';

interface VoidHistorySectionProps {
  history: VoidHistoryItem[];
}

export const VoidHistorySection: React.FC<VoidHistorySectionProps> = ({ history }) => {
  const renderItem = ({ item }: { item: VoidHistoryItem }) => (
    <View style={styles.historyItem}>
      <Text style={styles.goodsId}>Goods: {item.goodsId}</Text>
      <Text style={styles.reason}>Reason: {item.reason}</Text>
      <Text style={styles.voidedAt}>Voided: {new Date(item.voidedAt).toLocaleDateString()}</Text>
      <Text style={styles.voidedBy}>By: {item.voidedBy}</Text>
    </View>
  );

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.title}>Void History ({history.length})</Text>
      <FlashList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.h4.fontSize,
    fontWeight: '600',
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.md,
  },
  historyItem: {
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  goodsId: {
    fontSize: Theme.typography.body.fontSize,
    color: Theme.colors.text.primary,
  },
  reason: {
    fontSize: Theme.typography.bodySmall.fontSize,
    color: Theme.colors.status.error,
  },
  voidedAt: {
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.text.secondary,
  },
  voidedBy: {
    fontSize: Theme.typography.caption.fontSize,
    color: Theme.colors.text.muted,
  },
});

export default VoidHistorySection;
