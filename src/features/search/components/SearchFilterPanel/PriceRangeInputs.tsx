import React from 'react';
import { View, Text } from 'react-native';
import { Input } from '@src/shared/ui/Input';
import { useSearchFilterPanelStyles } from './SearchFilterPanel.styles';

interface PriceRangeInputsProps {
  minPrice?: number;
  maxPrice?: number;
  onChange: (minPrice?: number, maxPrice?: number) => void;
}

export const PriceRangeInputs: React.FC<PriceRangeInputsProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const styles = useSearchFilterPanelStyles();

  return (
    <View style={styles.priceInputs}>
      <Input
        placeholder="Min"
        keyboardType="numeric"
        value={minPrice?.toString() || ''}
        onChangeText={(v) => onChange(v ? parseFloat(v) : undefined, maxPrice)}
        containerStyle={styles.priceInput}
      />
      <Text style={styles.priceSeparator}>-</Text>
      <Input
        placeholder="Max"
        keyboardType="numeric"
        value={maxPrice?.toString() || ''}
        onChangeText={(v) => onChange(minPrice, v ? parseFloat(v) : undefined)}
        containerStyle={styles.priceInput}
      />
    </View>
  );
};
