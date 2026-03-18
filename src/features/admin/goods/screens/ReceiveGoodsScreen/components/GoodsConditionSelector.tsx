/**
 * GoodsConditionSelector - Form section for goods condition
 * Radio-style selection for new/used/damaged
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoodsConditionSelectorProps } from '../../types';
import { COLORS } from '@src/constants/Colors';

type ConditionOption = {
  value: 'new' | 'used' | 'damaged';
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  description: string;
  color: string;
};

const CONDITION_OPTIONS: ConditionOption[] = [
  {
    value: 'new',
    label: 'Neuf',
    icon: 'package-variant-closed',
    description: 'Marchandise en parfait état',
    color: '#28a745',
  },
  {
    value: 'used',
    label: 'Occasion',
    icon: 'package-variant',
    description: 'Marchandise déjà utilisée',
    color: '#ffc107',
  },
  {
    value: 'damaged',
    label: 'Endommagé',
    icon: 'package-variant-closed-remove',
    description: 'Marchandise avec dommages',
    color: '#dc3545',
  },
];

export const GoodsConditionSelector: React.FC<GoodsConditionSelectorProps> = ({
  control,
  errors,
}) => {
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
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.option,
                    value === option.value && styles.optionSelected,
                    value === option.value && { borderColor: option.color },
                  ]}
                  onPress={() => onChange(option.value)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${option.color}15` }]}>
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
                  <View style={[styles.radio, value === option.value && styles.radioSelected]}>
                    {value === option.value && (
                      <View style={[styles.radioInner, { backgroundColor: option.color }]} />
                    )}
                  </View>
                </TouchableOpacity>
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

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  optionSelected: {
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.Crimson || '#dc3545',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  errorText: {
    color: COLORS.danger || '#dc3545',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
});
