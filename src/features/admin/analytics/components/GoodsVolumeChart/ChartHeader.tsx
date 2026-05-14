import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsVolumeChart.styles';

interface ChartHeaderProps {
  totalGoods: number;
  totalCBM: number;
  formatNumber: (num: number) => string;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  totalGoods,
  totalCBM,
  formatNumber,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Volume de Marchandises</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="package-variant" size={16} color={colors.status.info} />
          <Text style={styles.summaryValue}>{formatNumber(totalGoods)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <MaterialCommunityIcons name="cube-outline" size={16} color={colors.status.success} />
          <Text style={styles.summaryValue}>{totalCBM.toFixed(1)} CBM</Text>
        </View>
      </View>
    </View>
  );
};
