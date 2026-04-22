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
      <Text style={styles.legendTitle}>Code Couleur Clients</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.legendItems}>
          {weightDistribution.map((client) => (
            <View key={client.clientId} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: client.color }]} />
              <Text style={styles.legendName} numberOfLines={1}>{client.clientName}</Text>
              <Text style={styles.legendWeight}>{client.weight.toFixed(0)} kg</Text>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Theme.neutral[50],
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Theme.radius.full,
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
  legendWeight: {
    fontSize: 11,
    fontWeight: '500',
    color: Theme.neutral[500],
  },
});
