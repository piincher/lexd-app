import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ExpenseType } from '../types';
import { EXPENSE_TYPE_CONFIG } from '../types';

interface ExpenseTypeIconProps {
  type: ExpenseType;
  size?: number;
  showBackground?: boolean;
}

export const ExpenseTypeIcon: React.FC<ExpenseTypeIconProps> = ({
  type,
  size = 24,
  showBackground = true,
}) => {
  const config = EXPENSE_TYPE_CONFIG[type];

  return (
    <View
      style={[
        styles.container,
        showBackground && {
          backgroundColor: `${config.color}20`,
          width: size * 1.5,
          height: size * 1.5,
          borderRadius: size * 0.5,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={config.icon as any}
        size={size}
        color={config.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
