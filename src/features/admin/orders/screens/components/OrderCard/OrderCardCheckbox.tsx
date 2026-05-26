import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './OrderCard.styles';

interface OrderCardCheckboxProps {
  isSelected: boolean;
}

export const OrderCardCheckbox: React.FC<OrderCardCheckboxProps> = ({ isSelected }) => {
  const { colors, isDark } = useAppTheme();
  const styles = createStyles(colors, isDark);

  return (
    <View style={styles.checkboxColumn}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <MaterialIcons name="check" size={18} color={colors.text.inverse} />}
      </View>
    </View>
  );
};
