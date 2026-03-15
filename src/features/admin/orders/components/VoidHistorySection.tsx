/**
 * VoidHistorySection - Displays void history for an order
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from '@src/shared/ui';
import { lightTheme } from '@src/constants/Theme';
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
      <FlatList
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
    marginBottom: lightTheme.spacing.lg,
    padding: lightTheme.spacing.lg,
  },
  title: {
    fontSize: lightTheme.typography.h4.fontSize,
    fontWeight: '600',
    color: lightTheme.colors.text.primary,
    marginBottom: lightTheme.spacing.md,
  },
  historyItem: {
    paddingVertical: lightTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.colors.neutral[200],
  },
  goodsId: {
    fontSize: lightTheme.typography.body.fontSize,
    color: lightTheme.colors.text.primary,
  },
  reason: {
    fontSize: lightTheme.typography.bodySmall.fontSize,
    color: lightTheme.colors.status.error,
  },
  voidedAt: {
    fontSize: lightTheme.typography.caption.fontSize,
    color: lightTheme.colors.text.secondary,
  },
  voidedBy: {
    fontSize: lightTheme.typography.caption.fontSize,
    color: lightTheme.colors.text.muted,
  },
});

export default VoidHistorySection;
