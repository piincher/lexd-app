import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AdvancedOrderFilters } from '../hooks/useAllOrdersAdvancedFilters';
import { createStyles } from '../screens/AllOrdersScreen.styles';

interface AllOrdersDateRangeFieldsProps {
  filters: AdvancedOrderFilters;
  onChange: <K extends keyof AdvancedOrderFilters>(key: K, value: AdvancedOrderFilters[K]) => void;
}

export const AllOrdersDateRangeFields: React.FC<AllOrdersDateRangeFieldsProps> = ({
  filters,
  onChange,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.rangeRow}>
      <TextInput
        mode="outlined"
        label="Créé du"
        placeholder="YYYY-MM-DD"
        value={filters.startDate}
        onChangeText={(value) => onChange('startDate', value)}
        left={<TextInput.Icon icon="calendar-start" />}
        style={[styles.advancedInput, styles.rangeInput]}
      />
      <TextInput
        mode="outlined"
        label="Créé au"
        placeholder="YYYY-MM-DD"
        value={filters.endDate}
        onChangeText={(value) => onChange('endDate', value)}
        left={<TextInput.Icon icon="calendar-end" />}
        style={[styles.advancedInput, styles.rangeInput]}
      />
    </View>
  );
};
