import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './GoodsDetailPricing.styles';

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
