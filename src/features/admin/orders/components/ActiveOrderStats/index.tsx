import React from 'react';
import { View, Text } from 'react-native';
import { Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './ActiveOrderStats.styles';

interface ActiveOrderStatsProps {
  quantity?: number | string;
  packageWeight?: string | number;
  packageCBM?: string | number;
}

export const ActiveOrderStats: React.FC<ActiveOrderStatsProps> = ({
  quantity,
  packageWeight,
  packageCBM,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Surface style={styles.card}>
      <View style={styles.statItem}>
        <MaterialCommunityIcons name="package-variant-closed" size={20} color={colors.status.info} />
        <Text style={styles.statValue}>{quantity ?? 1}</Text>
        <Text style={styles.statLabel}>Colis</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <MaterialCommunityIcons name="weight" size={20} color={colors.status.warning} />
        <Text style={styles.statValue}>
          {packageWeight ? `${packageWeight}` : '--'}
        </Text>
        <Text style={styles.statLabel}>Poids (kg)</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <MaterialCommunityIcons name="cube-outline" size={20} color={colors.status.success} />
        <Text style={styles.statValue}>{packageCBM || '0'}</Text>
        <Text style={styles.statLabel}>CBM (m³)</Text>
      </View>
    </Surface>
  );
};

export default ActiveOrderStats;
