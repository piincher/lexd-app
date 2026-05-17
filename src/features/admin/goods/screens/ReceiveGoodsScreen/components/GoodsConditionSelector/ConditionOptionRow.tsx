import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsConditionSelector.styles';

type ConditionValue = 'new' | 'used' | 'damaged';

export interface ConditionOption {
  value: ConditionValue;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  description: string;
  color: string;
}

interface ConditionOptionRowProps {
  option: ConditionOption;
  isSelected: boolean;
  onSelect: (value: ConditionValue) => void;
}

export const ConditionOptionRow: React.FC<ConditionOptionRowProps> = ({ option, isSelected, onSelect }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={[
        styles.option,
        isSelected && styles.optionSelected,
        isSelected && { borderColor: option.color },
      ]}
      onPress={() => onSelect(option.value)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: option.color + '15' }]}>
        <MaterialCommunityIcons
          name={option.icon}
          size={24}
          color={option.color}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.optionLabel, { color: option.color }]}>
          {option.label}
        </Text>
        <Text style={styles.optionDescription}>
          {option.description}
        </Text>
      </View>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && (
          <View style={[styles.radioInner, { backgroundColor: option.color }]} />
        )}
      </View>
    </TouchableOpacity>
  );
};
