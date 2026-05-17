/**
 * ShippingModeCard
 * SRP: Visual air vs sea shipping mode breakdown
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ShippingModeSplitBar } from './ShippingModeSplitBar';
import { ShippingModeDetail } from './ShippingModeDetail';
import { createShippingModeCardStyles } from './ShippingModeCard.styles';

interface ShippingModeCardProps {
  shippingModeCounts: { air: number; sea: number };
}

export const ShippingModeCard: React.FC<ShippingModeCardProps> = ({
  shippingModeCounts,
}) => {
  const { colors } = useAppTheme();
  const total = shippingModeCounts.air + shippingModeCounts.sea;
  const airPercent = total > 0 ? (shippingModeCounts.air / total) * 100 : 50;
  const seaPercent = total > 0 ? (shippingModeCounts.sea / total) * 100 : 50;
  const styles = createShippingModeCardStyles(colors);

  return (
    <Animated.View
      entering={FadeInUp.delay(200).springify().damping(15)}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Mode d'expedition</Text>
        <Text style={styles.totalText}>{total} total</Text>
      </View>

      <ShippingModeSplitBar
        airPercent={airPercent}
        seaPercent={seaPercent}
        airColor={colors.status.info}
        seaColor={colors.status.success}
      />

      <View style={styles.modesRow}>
        <ShippingModeDetail
          icon="airplane"
          value={shippingModeCounts.air}
          label="Aerien"
          percent={airPercent}
          iconBgColor={colors.feedback.infoBg}
          iconColor={colors.status.info}
          badgeBgColor={colors.feedback.infoBg}
          textColor={colors.status.info}
          valueColor={colors.text.primary}
          labelColor={colors.text.secondary}
        />

        <View style={styles.divider} />

        <ShippingModeDetail
          icon="boat"
          value={shippingModeCounts.sea}
          label="Maritime"
          percent={seaPercent}
          iconBgColor={colors.feedback.successBg}
          iconColor={colors.status.success}
          badgeBgColor={colors.feedback.successBg}
          textColor={colors.status.success}
          valueColor={colors.text.primary}
          labelColor={colors.text.secondary}
        />
      </View>
    </Animated.View>
  );
};
