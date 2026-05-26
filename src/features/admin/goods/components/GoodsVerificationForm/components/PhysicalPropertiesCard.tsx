import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { FormInput } from '../../FormInput';
import type { FormErrors } from './types';

interface PhysicalPropertiesCardProps {
  weight: string;
  quantity: string;
  unitPrice: string;
  errors: Pick<FormErrors, 'weight' | 'quantity' | 'unitPrice'>;
  onChangeField: (field: string, value: string) => void;
}

export const PhysicalPropertiesCard: React.FC<PhysicalPropertiesCardProps> = ({
  weight,
  quantity,
  unitPrice,
  errors,
  onChangeField,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.content}>
        <Text style={styles.sectionLabel}>Propriétés physiques</Text>

        <View style={styles.row}>
          <View style={styles.halfColumn}>
            <FormInput
              label="Poids"
              value={weight}
              onChangeText={(value) => onChangeField('weight', value)}
              error={errors.weight}
              keyboardType="decimal-pad"
              placeholder="0.00"
              suffix="kg"
            />
          </View>
          <View style={styles.halfColumn}>
            <FormInput
              label="Quantité"
              value={quantity}
              onChangeText={(value) => onChangeField('quantity', value)}
              error={errors.quantity}
              keyboardType="number-pad"
              placeholder="1"
            />
          </View>
        </View>

        <Divider style={styles.divider} />

        <FormInput
          label="Prix unitaire"
          value={unitPrice}
          onChangeText={(value) => onChangeField('unitPrice', value)}
          error={errors.unitPrice}
          keyboardType="decimal-pad"
          placeholder="0"
          suffix="FCFA/m³"
        />
      </Card.Content>
    </Card>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      borderRadius: 12,
      backgroundColor: colors.background.card,
      marginBottom: 16,
    },
    content: {
      padding: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: -8,
    },
    halfColumn: {
      flex: 1,
      marginHorizontal: 8,
    },
    divider: {
      marginVertical: 16,
      backgroundColor: colors.border,
    },
  });
