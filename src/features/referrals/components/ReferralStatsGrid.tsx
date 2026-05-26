import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { ReferralStats } from '../types';
import { createStyles } from './ReferralStatsGrid.styles';

interface ReferralStatsGridProps {
  stats: ReferralStats;
  rewardPoints: number;
}

type StatItem = {
  label: string;
  value: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const ReferralStatsGrid: React.FC<ReferralStatsGridProps> = ({ stats, rewardPoints }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const items: StatItem[] = [
    { label: 'Filleuls', value: stats.referredCount, icon: 'account-multiple-outline' },
    { label: 'Récompensés', value: stats.rewardedCount, icon: 'check-circle-outline' },
    { label: 'En attente', value: stats.pendingCount, icon: 'clock-outline' },
    { label: 'Points totaux', value: rewardPoints, icon: 'star-circle-outline' },
  ];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons name={item.icon} size={18} color={colors.primary.main} />
            <Text style={[styles.label, { color: colors.text.secondary }]}>{item.label}</Text>
          </View>
          <Text style={[styles.value, { color: colors.text.primary }]}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};
