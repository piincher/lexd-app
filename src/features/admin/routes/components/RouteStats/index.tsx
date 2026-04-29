/**
 * RouteStats - Statistics dashboard component
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { styles } from './RouteStats.styles';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient
      colors={gradient}
      style={styles.statIconBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Ionicons name={icon as any} size={20} color="#FFF" />
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
      />
      <StatCard
        label="Maritime"
        value={stats.sea}
        icon="boat"
        gradient={['#3B82F6', '#60A5FA']}
      />
      <StatCard
        label="Aérien"
        value={stats.air}
        icon="airplane"
        gradient={['#8B5CF6', '#A78BFA']}
      />
      <StatCard
        label="Actives"
        value={stats.active}
        icon="checkmark-circle"
        gradient={['#10B981', '#34D399']}
      />
    </ScrollView>
  );
};

export default RouteStats;
