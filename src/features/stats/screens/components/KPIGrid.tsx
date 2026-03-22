/**
 * KPIGrid
 * SRP: Displays 4 key metric cards in a 2x2 grid with animated entry
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { KPIItem } from '../../types';

interface KPIGridProps {
  items: KPIItem[];
}

const KPICard: React.FC<{ item: KPIItem; index: number }> = ({ item, index }) => (
  <Animated.View
    entering={FadeInDown.delay(index * 80).springify().damping(15)}
    style={styles.card}
  >
    <View style={styles.cardTop}>
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <Ionicons name={item.icon as any} size={20} color={item.color} />
      </View>
    </View>
    <Text style={styles.cardValue} numberOfLines={1}>{item.value}</Text>
    <Text style={styles.cardLabel} numberOfLines={1}>{item.label}</Text>
    {item.subtitle && (
      <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
    )}
  </Animated.View>
);

export const KPIGrid: React.FC<KPIGridProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <KPICard key={item.label} item={item} index={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: -16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    ...Theme.shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginBottom: 2,
  },
  cardLabel: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: Theme.neutral[500],
  },
  cardSubtitle: {
    fontSize: 10,
    fontFamily: Fonts.regular,
    color: Theme.neutral[400],
    marginTop: 4,
  },
});
