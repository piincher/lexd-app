import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './GoodsListItem.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsListItemCheckboxProps {
  isSelected: boolean;
}

export const GoodsListItemCheckbox: React.FC<GoodsListItemCheckboxProps> = ({ isSelected }) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  return (
  <View style={styles.checkboxContainer}>
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && <Ionicons name="checkmark" size={18} color={colors.background.card} />}
    </View>
  </View>
  );
};
