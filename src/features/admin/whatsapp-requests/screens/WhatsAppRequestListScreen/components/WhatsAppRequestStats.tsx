/**
 * WhatsAppRequestStats - Stats dashboard with stat cards
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface WhatsAppRequestStatsProps {
  pending: number;
  processing: number;
  total: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, gradient }) => (
  <View style={styles.statCard}>
    <LinearGradient colors={gradient} style={styles.statIconBg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Ionicons name={icon as any} size={20} color="#FFF" />
    </LinearGradient>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

export const WhatsAppRequestStats: React.FC<WhatsAppRequestStatsProps> = ({ pending, processing, total }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsContainer}>
    <StatCard label="En attente" value={pending} icon="time" gradient={['#F59E0B', '#FBBF24']} />
    <StatCard label="En cours" value={processing} icon="hammer" gradient={['#3B82F6', '#60A5FA']} />
    <StatCard label="Total" value={total} icon="list" gradient={Theme.gradients.primary} />
  </ScrollView>
);

const styles = StyleSheet.create({
  statsContainer: {
    paddingRight: Theme.spacing.xl,
    gap: Theme.spacing.md,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.neutral.white,
    borderRadius: Theme.radius.xl,
    padding: Theme.spacing.md,
    minWidth: 130,
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

export default WhatsAppRequestStats;
