/**
 * KPIGrid
 * SRP: Horizontal scrolling strip of key metrics
 * Hallmark: snap-scroll strip replaces generic 2×2 grid
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Fonts } from '@src/constants/Fonts';
import { KPIItem } from '../../types';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface KPIGridProps {
  items: KPIItem[];
}

const KPICard: React.FC<{ item: KPIItem; index: number }> = ({ item, index }) => {
  const { colors } = useAppTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          width: 132,
          backgroundColor: colors.background.card,
          borderRadius: 14,
          padding: 14,
          borderWidth: 1,
          borderColor: colors.border,
        },
        iconContainer: {
          width: 32,
          height: 32,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        },
        cardValue: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
          marginBottom: 2,
        },
        cardLabel: {
          fontSize: 11,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        cardSubtitle: {
          fontSize: 10,
          fontFamily: Fonts.regular,
          color: colors.text.disabled,
          marginTop: 3,
        },
      }),
    [colors]
  );

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 60).springify().damping(15)}
      style={styles.card}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <Ionicons name={item.icon as any} size={16} color={item.color} />
      </View>
      <Text style={styles.cardValue} numberOfLines={1}>{item.value}</Text>
      <Text style={styles.cardLabel} numberOfLines={1}>{item.label}</Text>
      {item.subtitle && (
        <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
      )}
    </Animated.View>
  );
};

export const KPIGrid: React.FC<KPIGridProps> = ({ items }) => {
  return (
    <View style={staticStyles.outer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={staticStyles.scrollContent}
        snapToInterval={144}
        decelerationRate="fast"
      >
        {items.map((item, index) => (
          <KPICard key={item.label} item={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const staticStyles = StyleSheet.create({
  outer: {
    marginTop: 16,
    marginBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
});
