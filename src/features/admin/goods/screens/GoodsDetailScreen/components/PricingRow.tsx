import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsDetailPricing.styles';

interface PricingRowProps {
  label: string;
  value: string;
  highlight?: boolean;
  valueColor?: string;
}

export const PricingRow: React.FC<PricingRowProps> = ({
  label,
  value,
  highlight = false,
  valueColor,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (highlight) {
    return (
      <View style={styles.financialRowHighlight}>
        <Text style={styles.financialLabelHighlight}>{label}</Text>
        <Text style={styles.financialValueTotal}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.financialRow}>
      <Text style={styles.financialLabel}>{label}</Text>
      <Text style={[styles.financialValue, valueColor ? { color: valueColor } : undefined]}>
        {value}
      </Text>
    </View>
  );
};
