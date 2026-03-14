import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { DimensionsInput } from '../DimensionsInput';
import { FormInput } from '../FormInput';

interface FormErrors {
  description?: string;
  length?: string;
  width?: string;
  height?: string;
  cbm?: string;
  weight?: string;
  quantity?: string;
  unitPrice?: string;
  location?: string;
  receivedByName?: string;
}

interface GoodsVerificationFormProps {
  formData: {
    description: string;
    length: string;
    width: string;
    height: string;
    cbm: string;
    weight: string;
    quantity: string;
    unitPrice: string;
    location: string;
    receivedByName: string;
  };
  errors: FormErrors;
  useDimensions: boolean;
  calculatedCBM: number;
  onChangeField: (field: string, value: string) => void;
  onToggleDimensions: (use: boolean) => void;
}

export const GoodsVerificationForm: React.FC<GoodsVerificationFormProps> = ({
  formData,
  errors,
  useDimensions,
  calculatedCBM,
  onChangeField,
  onToggleDimensions,
}) => {
  return (
    <>
      {/* Goods Information */}
      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.content}>
          <Text style={styles.sectionLabel}>Informations</Text>
          
          <FormInput
            label="Description"
            value={formData.description}
            onChangeText={(value) => onChangeField('description', value)}
            error={errors.description}
            multiline
            numberOfLines={2}
            placeholder="Description de la marchandise"
          />
          
          <Divider style={styles.divider} />
          
          <DimensionsInput
            useDimensions={useDimensions}
            onToggleMode={onToggleDimensions}
            length={formData.length}
            width={formData.width}
            height={formData.height}
            cbm={formData.cbm}
            onChangeLength={(v) => onChangeField('length', v)}
            onChangeWidth={(v) => onChangeField('width', v)}
            onChangeHeight={(v) => onChangeField('height', v)}
            onChangeCBM={(v) => onChangeField('cbm', v)}
            errors={{
              length: errors.length,
              width: errors.width,
              height: errors.height,
              cbm: errors.cbm,
            }}
            calculatedCBM={calculatedCBM}
          />
        </Card.Content>
      </Card>

      {/* Physical Properties */}
      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.content}>
          <Text style={styles.sectionLabel}>Propriétés physiques</Text>
          
          <View style={styles.row}>
            <View style={styles.halfColumn}>
              <FormInput
                label="Poids"
                value={formData.weight}
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
                value={formData.quantity}
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
            value={formData.unitPrice}
            onChangeText={(value) => onChangeField('unitPrice', value)}
            error={errors.unitPrice}
            keyboardType="decimal-pad"
            placeholder="0"
            suffix="FCFA/m³"
          />
        </Card.Content>
      </Card>

      {/* Location */}
      <Card style={styles.card} elevation={2}>
        <Card.Content style={styles.content}>
          <Text style={styles.sectionLabel}>Emplacement</Text>
          
          <FormInput
            label="Code d'emplacement"
            value={formData.location}
            onChangeText={(value) => onChangeField('location', value.toUpperCase())}
            error={errors.location}
            placeholder="Ex: C3-A12"
            autoCapitalize="characters"
          />
          
          <Divider style={styles.divider} />
          
          <FormInput
            label="Reçu par"
            value={formData.receivedByName}
            onChangeText={(value) => onChangeField('receivedByName', value)}
            error={errors.receivedByName}
            placeholder="Nom de la personne qui reçoit"
            autoCapitalize="words"
          />
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  content: {
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
    backgroundColor: '#e0e0e0',
  },
});
