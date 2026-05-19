import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ShipmentSummary.styles';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  lib: 'mci' | 'feather';
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, lib, color }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <View style={styles.iconCircle}>
        {lib === 'mci' ? (
          <MaterialCommunityIcons name={icon as any} size={22} color={colors.neutral.white} />
        ) : (
          <Feather name={icon as any} size={22} color={colors.neutral.white} />
        )}
      </View>
      <Text style={[styles.statNumber, { color: colors.neutral.white }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.neutral.white, opacity: 0.85 }]}>
        {label}
      </Text>
    </View>
  );
};
