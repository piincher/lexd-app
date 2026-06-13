import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient colors={gradient} style={styles.statIconBg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Ionicons name={icon as any} size={20} color={Theme.colors.text.inverse} />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

interface ContainerListHeaderProps {
  stats: {
    total: number;
    loading: number;
    inTransit: number;
    arrived: number;
  };
  onOpenAnalytics?: () => void;
}

export const ContainerListHeader: React.FC<ContainerListHeaderProps> = ({ stats, onOpenAnalytics }) => {
  const { colors } = useAppTheme();
  return (
    <LinearGradient colors={Theme.gradients.glass} style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.headerGreeting}>Gestion</Text>
          <Text style={styles.headerTitle}>Containers</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={onOpenAnalytics}>
          <Ionicons name="bar-chart" size={24} color={Theme.neutral[700]} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsContainer}>
        <StatCard label="Total" value={stats.total} icon="cube" gradient={Theme.gradients.primary} />
        <StatCard label="En chargement" value={stats.loading} icon="hammer" gradient={[colors.status.warning, colors.status.warning]} />
        <StatCard label="En transit" value={stats.inTransit} icon="airplane" gradient={[colors.primary.main, colors.primary.light]} />
        <StatCard label="Arrivés" value={stats.arrived} icon="flag" gradient={[colors.status.success, colors.status.success]} />

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.lg,
  },
  headerGreeting: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[500],
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.neutral[800],
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.background.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  statsContainer: {
    paddingRight: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background.card,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    minWidth: 140,
    ...Theme.shadows.sm,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.neutral[800],
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.neutral[400],
  },
});
