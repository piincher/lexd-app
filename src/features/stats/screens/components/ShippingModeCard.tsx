/**
 * ShippingModeCard
 * SRP: Visual air vs sea shipping mode breakdown
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface ShippingModeCardProps {
  shippingModeCounts: { air: number; sea: number };
}

export const ShippingModeCard: React.FC<ShippingModeCardProps> = ({ shippingModeCounts }) => {
  const { colors } = useAppTheme();
  const total = shippingModeCounts.air + shippingModeCounts.sea;
  const airPercent = total > 0 ? (shippingModeCounts.air / total) * 100 : 50;
  const seaPercent = total > 0 ? (shippingModeCounts.sea / total) * 100 : 50;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginHorizontal: 20,
          backgroundColor: colors.background.card,
          borderRadius: 16,
          padding: 18,
          ...Theme.shadows.sm,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        },
        title: {
          fontSize: 15,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
        },
        totalText: {
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: colors.text.disabled,
        },
        splitBar: {
          flexDirection: 'row',
          height: 6,
          borderRadius: 3,
          overflow: 'hidden',
          marginBottom: 18,
        },
        splitAir: {
          backgroundColor: '#3B82F6',
          borderRadius: 3,
        },
        splitGap: {
          width: 3,
        },
        splitSea: {
          backgroundColor: '#10B981',
          borderRadius: 3,
        },
        modesRow: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        modeCard: {
          flex: 1,
          alignItems: 'center',
          gap: 4,
        },
        modeIcon: {
          width: 38,
          height: 38,
          borderRadius: 11,
          justifyContent: 'center',
          alignItems: 'center',
        },
        modeValue: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          fontWeight: '700',
          color: colors.text.primary,
        },
        modeLabel: {
          fontSize: 11,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        percentBadge: {
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 10,
          marginTop: 2,
        },
        percentText: {
          fontSize: 11,
          fontFamily: Fonts.bold,
          fontWeight: '700',
        },
        divider: {
          width: 1,
          height: 60,
          backgroundColor: colors.border,
          marginHorizontal: 8,
        },
      }),
    [colors]
  );

  return (
    <Animated.View entering={FadeInUp.delay(200).springify().damping(15)} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mode d'expedition</Text>
        <Text style={styles.totalText}>{total} total</Text>
      </View>

      {/* Split bar */}
      <View style={styles.splitBar}>
        <View style={[styles.splitAir, { flex: airPercent || 1 }]} />
        <View style={styles.splitGap} />
        <View style={[styles.splitSea, { flex: seaPercent || 1 }]} />
      </View>

      {/* Mode details */}
      <View style={styles.modesRow}>
        <View style={styles.modeCard}>
          <View style={[styles.modeIcon, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="airplane" size={18} color="#3B82F6" />
          </View>
          <Text style={styles.modeValue}>{shippingModeCounts.air}</Text>
          <Text style={styles.modeLabel}>Aerien</Text>
          <View style={[styles.percentBadge, { backgroundColor: '#EFF6FF' }]}>
            <Text style={[styles.percentText, { color: '#3B82F6' }]}>{airPercent.toFixed(0)}%</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.modeCard}>
          <View style={[styles.modeIcon, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="boat" size={18} color="#10B981" />
          </View>
          <Text style={styles.modeValue}>{shippingModeCounts.sea}</Text>
          <Text style={styles.modeLabel}>Maritime</Text>
          <View style={[styles.percentBadge, { backgroundColor: '#F0FDF4' }]}>
            <Text style={[styles.percentText, { color: '#10B981' }]}>{seaPercent.toFixed(0)}%</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
