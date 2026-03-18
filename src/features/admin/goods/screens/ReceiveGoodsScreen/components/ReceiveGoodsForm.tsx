/**
 * ReceiveGoodsForm - Main form component
 * Composes all form sections with React Hook Form
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Controller } from 'react-hook-form';
import { GoodsDimensionsInput } from './GoodsDimensionsInput';
import { GoodsPhotosUpload } from './GoodsPhotosUpload';
import { GoodsConditionSelector } from './GoodsConditionSelector';
import { FormInput } from '../../../components/FormInput';
import { ReceiveGoodsFormSectionProps, ClientSelectionProps } from '../../types';
import { ClientSearchSection } from '../../../components/ClientSearchSection';
import { CostSummary } from '../../../components/CostSummary';

interface ReceiveGoodsFormProps extends ReceiveGoodsFormSectionProps {
  // Client selection
  selectedClient: ClientSelectionProps['selectedClient'];
  onSelectClient: ClientSelectionProps['onSelectClient'];
  clientError?: string;
  
  // Dimensions
  useDimensions: boolean;
  onToggleDimensions: (use: boolean) => void;
  calculatedCBM: number;
  
  // Photo
  photoUri: string | null;
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: () => void;
  
  // Cost summary
  totalCost: number;
}

export const ReceiveGoodsForm: React.FC<ReceiveGoodsFormProps> = ({
  control,
  errors,
  setValue,
  watch,
  selectedClient,
  onSelectClient,
  clientError,
  useDimensions,
  onToggleDimensions,
  calculatedCBM,
  photoUri,
  onPhotoSelected,
  onPhotoRemoved,
  totalCost,
}) => {
  const unitPrice = watch('unitPrice');
  const unitPriceValue = parseFloat(unitPrice?.replace(',', '.') || '0') || 0;

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Client Selection */}
      <ClientSearchSection
        selectedClient={selectedClient}
        onSelectClient={onSelectClient}
        error={clientError}
      />

      {/* Description */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Description"
            value={value}
            onChangeText={onChange}
            error={errors.description?.message}
            placeholder="Description de la marchandise"
            multiline
            numberOfLines={3}
          />
        )}
      />

      {/* Dimensions / CBM */}
      <GoodsDimensionsInput
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
        useDimensions={useDimensions}
        onToggleMode={onToggleDimensions}
        calculatedCBM={calculatedCBM}
      />

      {/* Weight & Quantity Row */}
      <View style={styles.row}>
        <View style={styles.halfColumn}>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value } }) => (
              <FormInput
                label="Poids"
                value={value}
                onChangeText={onChange}
                error={errors.weight?.message}
                keyboardType="decimal-pad"
                placeholder="0"
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
                suffix="FCFA/m³"
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

      {/* Condition */}
      <GoodsConditionSelector
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />

      {/* Photo Upload */}
      <GoodsPhotosUpload
        photoUri={photoUri}
        onPhotoSelected={onPhotoSelected}
        onPhotoRemoved={onPhotoRemoved}
      />

      {/* Cost Summary */}
      <CostSummary
        cbm={calculatedCBM}
        unitPrice={unitPriceValue}
        totalCost={totalCost}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
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
});
