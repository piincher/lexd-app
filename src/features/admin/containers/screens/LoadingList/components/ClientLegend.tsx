import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { WeightDistribution } from '../types';

interface ClientLegendProps {
  weightDistribution: WeightDistribution[];
}

export const ClientLegend: React.FC<ClientLegendProps> = ({ weightDistribution }) => {
  if (weightDistribution.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.delay(200)} style={styles.legendCard}>
      <Text style={styles.legendTitle}>Progression par client</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.legendItems}>
          {weightDistribution.map((client) => {
            const loadedItems = client.loadedItems ?? 0;
            const totalItems = client.totalItems ?? 0;
            const progress = totalItems > 0 ? (loadedItems / totalItems) * 100 : 0;
            return (
              <View key={client.clientId} style={styles.legendItem}>
                <View style={styles.legendHeader}>
                  <View style={[styles.legendDot, { backgroundColor: client.color }]} />
                  <Text style={styles.legendName} numberOfLines={1}>{client.clientName}</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress}%`, backgroundColor: client.color },
                    ]}
                  />
                </View>
                <View style={styles.legendMeta}>
                  <Text style={styles.legendProgress}>{loadedItems}/{totalItems} chargés</Text>
                  <Text style={styles.legendWeight}>{client.weight.toFixed(0)} kg</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  legendCard: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius['2xl'],
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    ...Theme.shadows.md,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.md,
  },
  legendItems: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  legendItem: {
    width: 176,
    gap: Theme.spacing.xs,
    backgroundColor: Theme.neutral[50],
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
  },
  legendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendName: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[700],
    maxWidth: 100,
  },
  progressTrack: {
    height: 6,
    borderRadius: Theme.radius.full,
    overflow: 'hidden',
    backgroundColor: Theme.neutral[200],
  },
  progressFill: {
    height: '100%',
    borderRadius: Theme.radius.full,
  },
  legendMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendProgress: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.neutral[700],
  },
  legendWeight: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
});
