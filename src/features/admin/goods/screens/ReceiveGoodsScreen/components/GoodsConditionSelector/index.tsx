/**
 * GoodsConditionSelector - Form section for goods condition
 * Radio-style selection for new/used/damaged
 */
import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoodsConditionSelectorProps } from '../types';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './GoodsConditionSelector.styles';
import { ConditionOptionRow, ConditionOption } from './ConditionOptionRow';

export const GoodsConditionSelector: React.FC<GoodsConditionSelectorProps> = ({
  control,
  errors,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const CONDITION_OPTIONS: ConditionOption[] = [
    {
      value: 'new',
      label: 'Neuf',
      icon: 'package-variant-closed',
      description: 'Marchandise en parfait état',
      color: colors.status.success,
    },
    {
      value: 'used',
      label: 'Occasion',
      icon: 'package-variant',
      description: 'Marchandise déjà utilisée',
      color: colors.status.warning,
    },
    {
      value: 'damaged',
      label: 'Endommagé',
      icon: 'package-variant-closed-remove',
      description: 'Marchandise avec dommages',
      color: colors.status.error,
    },
  ];

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.sectionLabel}>État de la marchandise</Text>

        <Controller
          control={control}
          name="condition"
          render={({ field: { onChange, value } }) => (
            <View style={styles.optionsContainer}>
              {CONDITION_OPTIONS.map((option) => (
                <ConditionOptionRow
                  key={option.value}
                  option={option}
                  isSelected={value === option.value}
                  onSelect={onChange}
                />
              ))}
            </View>
          )}
        />

        {errors.condition && (
          <Text style={styles.errorText}>{errors.condition.message}</Text>
        )}
      </Card.Content>
    </Card>
  );
};

export default GoodsConditionSelector;
