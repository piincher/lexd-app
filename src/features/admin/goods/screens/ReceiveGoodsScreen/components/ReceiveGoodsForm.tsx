/**
 * ReceiveGoodsForm - Main form component
 * Composes all form sections with React Hook Form
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { GoodsDimensionsInput } from './GoodsDimensionsInput';
import { GoodsPhotosUpload } from './GoodsPhotosUpload';
import { GoodsConditionSelector } from './GoodsConditionSelector';
import { ShippingModeSelector } from '../components/ShippingModeSelector';
import { FormInput } from '../../../components/FormInput';
import { ReceiveGoodsFormSectionProps, ClientSelectionProps } from '../../types';
import { ClientSearchSection } from '../../../components/ClientSearchSection';
import { CostSummary } from '../../../components/CostSummary';
import { DatePickerModal } from 'react-native-paper-dates';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ReceiveGoodsFormProps extends ReceiveGoodsFormSectionProps {
  // Client selection
  selectedClient: ClientSelectionProps['selectedClient'];
  onSelectClient: ClientSelectionProps['onSelectClient'];
  clientError?: string;
  
  // Dimensions
  useDimensions: boolean;
  onToggleDimensions: (use: boolean) => void;
  calculatedCBM: number;
  
  // Photos
  photoUris: string[];
  onPhotoSelected: (uri: string) => void;
  onPhotoRemoved: (uri: string) => void;
  
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
  photoUris,
  onPhotoSelected,
  onPhotoRemoved,
  totalCost,
}) => {
  const unitPrice = watch('unitPrice');
  const unitPriceValue = parseFloat(unitPrice?.replace(',', '.') || '0') || 0;
  const shippingMode = watch('shippingMode');
  const weight = watch('weight');
  const weightValue = parseFloat(weight?.replace(',', '.') || '0') || 0;

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

      {/* Shipping Mode */}
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

      {/* Express Tracking Number */}
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

      {/* Dimensions / CBM */}
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

      {/* Received Date */}
      <Controller
        control={control}
        name="receivedDate"
        render={({ field: { value } }) => {
          const [show, setShow] = useState(false);
          const displayDate = value
            ? new Date(value).toLocaleDateString('fr-FR')
            : null;
          return (
            <View>
              <Pressable
                onPress={() => setShow(true)}
                style={[
                  styles.dateButton,
                  { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(0,0,0,0.06)' }
                ]}
              >
                <MaterialCommunityIcons name="calendar" size={20} color="#22C55E" />
                <Text style={styles.dateButtonText}>
                  {displayDate || 'Date de réception (optionnel)'}
                </Text>
                {value && (
                  <Pressable
                    onPress={() => setValue('receivedDate', '')}
                    hitSlop={8}
                  >
                    <MaterialCommunityIcons name="close-circle" size={18} color="#9CA3AF" />
                  </Pressable>
                )}
              </Pressable>
              {errors.receivedDate?.message && (
                <Text style={styles.dateError}>{errors.receivedDate.message}</Text>
              )}
              <DatePickerModal
                locale="fr"
                mode="single"
                visible={show}
                onDismiss={() => setShow(false)}
                date={value ? new Date(value) : undefined}
                onConfirm={({ date }) => {
                  setShow(false);
                  if (date) {
                    setValue('receivedDate', date.toISOString(), {
                      shouldValidate: true,
                    });
                  }
                }}
                validRange={{ endDate: new Date() }}
              />
            </View>
          );
        }}
      />

      {/* Condition */}
      <GoodsConditionSelector
        control={control}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />

      {/* Photos Upload */}
      <GoodsPhotosUpload
        photoUris={photoUris}
        onPhotoSelected={onPhotoSelected}
        onPhotoRemoved={onPhotoRemoved}
      />

      {/* Cost Summary */}
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    marginTop: 4,
    gap: 10,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
  },
  dateError: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
});
