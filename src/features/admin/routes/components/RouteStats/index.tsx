/**
 * RouteStats - Statistics dashboard component
 */

import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './RouteStats.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  gradient: readonly [string, string, ...string[]];
  styles: ReturnType<typeof createStyles>;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient, styles, iconColor }) => (
  <View style={styles.statCard}>
    <LinearGradient
      colors={gradient}
      style={styles.statIconBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Ionicons name={icon as any} size={20} color={iconColor} />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

interface RouteStatsProps {
  stats: {
    total: number;
    sea: number;
    air: number;
    active: number;
  };
}

export const RouteStats: React.FC<RouteStatsProps> = ({ stats }) => {
  const { colors, isDark } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.statsContainer}
    >
      <StatCard
        label="Total"
        value={stats.total}
        icon="map"
        gradient={Theme.gradients.primary}
        styles={styles}
        iconColor={colors.text.inverse}
      />
      <StatCard
        label="Maritime"
        value={stats.sea}
        icon="boat"
        gradient={[colors.status.info, colors.accent.sky]}
        styles={styles}
        iconColor={colors.text.inverse}
      />
      <StatCard
        label="Aérien"
        value={stats.air}
        icon="airplane"
        gradient={[colors.primary.main, colors.primary.light]}
        styles={styles}
        iconColor={colors.text.inverse}
      />
      <StatCard
        label="Actives"
        value={stats.active}
        icon="checkmark-circle"
        gradient={[colors.status.success, colors.primary.light]}
        styles={styles}
        iconColor={colors.text.inverse}
      />
    </ScrollView>
  );
};

export default RouteStats;
