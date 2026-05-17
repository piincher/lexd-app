import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { styles } from './GoodsListItem.styles';

interface GoodsListItemCheckboxProps {
  isSelected: boolean;
}

export const GoodsListItemCheckbox: React.FC<GoodsListItemCheckboxProps> = ({ isSelected }) => (
  <View style={styles.checkboxContainer}>
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && <Ionicons name="checkmark" size={18} color={Theme.colors.background.card} />}
    </View>
  </View>
);
