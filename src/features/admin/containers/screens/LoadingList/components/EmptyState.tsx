import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

export const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="cube-outline" size={64} color={Theme.neutral[400]} />
      <Text style={styles.emptyTitle}>Aucune marchandise</Text>
      <Text style={styles.emptySubtitle}>Ce container est vide</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    padding: Theme.spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    marginTop: Theme.spacing.lg,
    fontSize: 18,
    fontWeight: '600',
    color: Theme.neutral[600],
  },
  emptySubtitle: {
    marginTop: Theme.spacing.xs,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[400],
    textAlign: 'center',
  },
});
