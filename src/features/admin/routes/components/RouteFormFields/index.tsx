/**
 * RouteFormFields - Main route form fields component
 * Extracted from RouteFormScreen for reusability
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '@src/shared/ui/Input';
import { Theme } from '@src/constants/Theme';
import { RouteFormData } from '../../types';

export interface RouteFormFieldsProps {
  formData: RouteFormData;
  onUpdateField: (field: keyof RouteFormData, value: any) => void;
  errors?: Record<string, string>;
}

export const RouteFormFields: React.FC<RouteFormFieldsProps> = ({
  formData,
  onUpdateField,
  errors = {},
}) => {
  return (
    <View style={styles.container}>
      <Input
        label="Origine"
        value={formData.origin}
        onChangeText={(value) => onUpdateField('origin', value)}
        placeholder="Ex: Chine (Guangzhou)"
        error={errors.origin}
        containerStyle={styles.input}
      />

      <Input
        label="Destination"
        value={formData.destination}
        onChangeText={(value) => onUpdateField('destination', value)}
        placeholder="Ex: Mali (Bamako)"
        error={errors.destination}
        containerStyle={styles.input}
      />

      <Input
        label="Prix"
        value={formData.price?.toString() || ''}
        onChangeText={(value) => onUpdateField('price', parseFloat(value) || 0)}
        placeholder="0.00"
        keyboardType="numeric"
        error={errors.price}
        containerStyle={styles.input}
      />

      <Input
        label="Date de départ"
        value={formData.scheduleDate || ''}
        onChangeText={(value) => onUpdateField('scheduleDate', value)}
        placeholder="YYYY-MM-DD"
        error={errors.scheduleDate}
        containerStyle={styles.input}
      />

      <View style={styles.radioContainer}>
        <Input
          label="Mode de transport"
          value={formData.shippingMode === 'AIR' ? 'Aérien' : 'Maritime'}
          onChangeText={() => {}}
          editable={false}
          containerStyle={styles.input}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    marginBottom: Theme.spacing.md,
  },
  radioContainer: {
    marginTop: Theme.spacing.sm,
  },
});

export default RouteFormFields;
