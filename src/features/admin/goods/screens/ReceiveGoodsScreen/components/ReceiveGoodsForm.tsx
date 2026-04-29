/**
 * ReceiveGoodsForm - Main form component
 * Composes all form sections with React Hook Form
 */
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Controller } from 'react-hook-form';
import { GoodsDimensionsInput } from './GoodsDimensionsInput';
import { GoodsPhotosUpload } from './GoodsPhotosUpload';
import { GoodsConditionSelector } from './GoodsConditionSelector';
import { ShippingModeSelector } from '../components/ShippingModeSelector';
import { FormInput } from '../../../components/FormInput';
import { ReceiveGoodsFormSectionProps, ClientSelectionProps } from '../types';
import { ClientSearchSection } from '../../../components/ClientSearchSection';
import { CostSummary } from '../../../components/CostSummary';
import { useReceiveGoodsFormValues } from '../hooks/useReceiveGoodsFormValues';
import { ReceiveGoodsFormDateField } from './ReceiveGoodsFormDateField';
import { ReceiveGoodsFormInputRows } from './ReceiveGoodsFormInputRows';

interface ReceiveGoodsFormProps extends ReceiveGoodsFormSectionProps {
  selectedClient: ClientSelectionProps['selectedClient'];
  onSelectClient: ClientSelectionProps['onSelectClient'];
  clientError?: string;
  useDimensions: boolean;
  onToggleDimensions: (use: boolean) => void;
  calculatedCBM: number;
  photoUris: string[];
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: (uri: string) => void;
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
  photoUris,
  onPhotoSelected,
  onPhotoRemoved,
  totalCost,
}) => {
  const { unitPriceValue, weightValue, shippingMode } = useReceiveGoodsFormValues(watch);
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ClientSearchSection
        selectedClient={selectedClient}
        onSelectClient={onSelectClient}
        error={clientError}
      />
      <Controller
        control={control}
        name="shippingMode"
        render={({ field: { onChange, value } }) => (
          <ShippingModeSelector
            value={value}
            onChange={onChange}
            error={errors.shippingMode?.message}
          />
        )}
      />
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
      <Controller
        control={control}
        name="expressTrackingNumber"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="N° de suivi express (optionnel)"
            value={value}
            onChangeText={onChange}
            error={errors.expressTrackingNumber?.message}
            placeholder="Ex: 1Z999AA10123456784"
            autoCapitalize="characters"
          />
        )}
      />
      <GoodsDimensionsInput
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
        useDimensions={useDimensions}
        onToggleMode={onToggleDimensions}
        calculatedCBM={calculatedCBM}
        shippingMode={shippingMode}
      />
      <ReceiveGoodsFormInputRows
        control={control}
        errors={errors}
        shippingMode={shippingMode}
      />
      <ReceiveGoodsFormDateField
        control={control}
        setValue={setValue}
        error={errors.receivedDate?.message}
      />
      <GoodsConditionSelector
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
      <GoodsPhotosUpload
        photoUris={photoUris}
        onPhotoSelected={onPhotoSelected}
        onPhotoRemoved={onPhotoRemoved}
      />
      <CostSummary
        cbm={calculatedCBM}
        weight={weightValue}
        unitPrice={unitPriceValue}
        totalCost={totalCost}
        shippingMode={shippingMode}
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
});
