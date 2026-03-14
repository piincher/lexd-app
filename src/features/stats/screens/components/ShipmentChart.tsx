import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import COLORS from '@src/constants/Colors';
import Fonts from '@src/constants/Fonts';
import styles from '../Stats.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ShipmentChartProps {
  hasChartData: boolean;
  chartData: Array<{
    value: number;
    label: string;
    frontColor: string;
  }>;
}

export const ShipmentChart: React.FC<ShipmentChartProps> = ({
  hasChartData,
  chartData,
}) => {
  if (!hasChartData) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aperçu de l'état des expéditions</Text>
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No shipment data available.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Aperçu de l'état des expéditions</Text>
      <BarChart
        data={chartData}
        width={SCREEN_WIDTH - 32}
        height={220}
        barWidth={32}
        barBorderRadius={6}
        spacing={16}
        yAxisTextStyle={{
          color: COLORS.grayDark,
          fontSize: 12,
          fontFamily: Fonts.regular,
        }}
        xAxisLabelTextStyle={{
          color: COLORS.grayDark,
          fontSize: 12,
          fontFamily: Fonts.regular,
        }}
        hideRules
        hideYAxisText={false}
        yAxisColor={COLORS.grayMedium}
        xAxisColor={COLORS.grayMedium}
        noOfSections={5}
        maxValue={Math.max(...chartData.map(d => d.value), 1)}
        minValue={0}
      />
    </View>
  );
};
