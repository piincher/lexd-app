import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FormInput } from '../../../../components/FormInput';
import type { ReceiveGoodsFormData } from '../../types';

interface PackageCountFieldProps {
  control: Control<ReceiveGoodsFormData>;
  errors: FieldErrors<ReceiveGoodsFormData>;
}

export const PackageCountField: React.FC<PackageCountFieldProps> = ({ control, errors }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="packageCount"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Nombre de colis physiques"
            value={value}
            onChangeText={onChange}
            error={errors.packageCount?.message}
            keyboardType="number-pad"
            placeholder="1"
          />
        )}
      />
      <Text style={[styles.hint, { color: colors.text.secondary }]}>1 carton, sac ou caisse = 1 étiquette QR unique</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 4 },
  hint: { marginTop: -4, marginBottom: 4, fontSize: 12, lineHeight: 16 },
});
