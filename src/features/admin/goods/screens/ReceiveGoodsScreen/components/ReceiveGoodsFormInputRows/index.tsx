/**
 * ReceiveGoodsFormInputRows - Weight, quantity, price, location, receiver inputs
 * Pure UI form input rows
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FormInput } from '../../../../components/FormInput';
import type { ReceiveGoodsFormData } from '../../types';

interface ReceiveGoodsFormInputRowsProps {
  control: Control<ReceiveGoodsFormData>;
  errors: FieldErrors<ReceiveGoodsFormData>;
  shippingMode: 'AIR' | 'SEA';
  priceWarning?: string | null;
}

export const ReceiveGoodsFormInputRows: React.FC<ReceiveGoodsFormInputRowsProps> = ({
  control,
  errors,
  shippingMode,
  priceWarning,
}) => {
  const { colors } = useAppTheme();

  return (
    <>
      {/* Weight & Quantity Row */}
      <View style={styles.row}>
        <View style={styles.halfColumn}>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label={shippingMode === 'AIR' ? 'Poids (optionnel)' : 'Poids'}
                value={value}
                onChangeText={onChange}
                error={errors.weight?.message}
                keyboardType="decimal-pad"
                placeholder={shippingMode === 'AIR' ? 'À confirmer' : '0'}
                suffix="kg"
              />
            )}
          />
        </View>
        <View style={styles.halfColumn}>
          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Quantité"
                value={value}
                onChangeText={onChange}
                error={errors.quantity?.message}
                keyboardType="number-pad"
                placeholder="1"
              />
            )}
          />
        </View>
      </View>

      {/* Unit Price & Location Row */}
      <View style={styles.row}>
        <View style={styles.halfColumn}>
          <Controller
            control={control}
            name="unitPrice"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Prix unitaire"
                value={value}
                onChangeText={onChange}
                error={errors.unitPrice?.message}
                keyboardType="decimal-pad"
                placeholder="0"
                suffix={shippingMode === 'AIR' ? 'FCFA/kg' : 'FCFA/m³'}
              />
            )}
          />
        </View>
        <View style={styles.halfColumn}>
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Emplacement"
                value={value}
                onChangeText={onChange}
                error={errors.location?.message}
                placeholder="Ex: C3"
                autoCapitalize="characters"
              />
            )}
          />
        </View>
      </View>
      {priceWarning ? (
        <Text style={[styles.warning, { color: colors.status.warning }]}>{priceWarning}</Text>
      ) : null}

      {/* Received By */}
      <Controller
        control={control}
        name="receivedByName"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Reçu par"
            value={value}
            onChangeText={onChange}
            error={errors.receivedByName?.message}
            placeholder="Nom du réceptionnaire"
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginVertical: 4,
  },
  halfColumn: {
    flex: 1,
    marginHorizontal: 6,
  },
  warning: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: '700',
  },
});
