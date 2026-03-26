/**
 * Edit Goods Screen Hook
 * Handles form state, validation, and API calls for editing goods
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetGoodsDetail, useUpdateGoods } from '../../hooks';
import { UpdateGoodsInput } from '../../api/types';

export interface EditGoodsFormData {
  description: string;
  quantity: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  cbm: string;
  unitPrice: string;
  location: string;
  shippingMode: 'AIR' | 'SEA';
  receivedByName: string;
  useDimensions: boolean;
}

const initialFormData: EditGoodsFormData = {
  description: '',
  quantity: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  cbm: '',
  unitPrice: '',
  location: '',
  shippingMode: 'SEA',
  receivedByName: '',
  useDimensions: true,
};

export const useEditGoodsScreen = (goodsId: string, isAdmin: boolean) => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<EditGoodsFormData>(initialFormData);

  const { data: goods, isLoading, isError, error } = useGetGoodsDetail(goodsId);
  const updateMutation = useUpdateGoods();

  // Check if goods can be edited (only admin and RECEIVED_AT_WAREHOUSE status)
  const canEdit = isAdmin && goods?.status === 'RECEIVED_AT_WAREHOUSE';

  // Populate form when goods data loads
  useEffect(() => {
    if (goods) {
      const hasDimensions = !!(goods.dimensions?.length && goods.dimensions?.width && goods.dimensions?.height);
      setFormData({
        description: goods.description || '',
        quantity: goods.quantity?.toString() || '1',
        weight: goods.weight?.toString() || '',
        length: goods.dimensions?.length?.toString() || '',
        width: goods.dimensions?.width?.toString() || '',
        height: goods.dimensions?.height?.toString() || '',
        cbm: goods.actualCBM?.toString() || goods.cbm?.toString() || '',
        unitPrice: goods.unitPrice?.toString() || '',
        location: goods.warehouseLocation || '',
        shippingMode: goods.shippingMode || 'SEA',
        receivedByName: goods.receivedByName || '',
        useDimensions: hasDimensions,
      });
    }
  }, [goods]);

  // Calculated CBM from dimensions
  const calculatedCBM = useMemo(() => {
    if (!formData.useDimensions) return null;
    const l = parseFloat(formData.length) || 0;
    const w = parseFloat(formData.width) || 0;
    const h = parseFloat(formData.height) || 0;
    if (l > 0 && w > 0 && h > 0) {
      return (l * w * h) / 1000000;
    }
    return null;
  }, [formData.length, formData.width, formData.height, formData.useDimensions]);

  // Calculated total cost
  const calculatedTotalCost = useMemo(() => {
    const price = parseFloat(formData.unitPrice) || 0;
    if (formData.shippingMode === 'AIR') {
      const w = parseFloat(formData.weight) || 0;
      return w * price;
    }
    const cbm = formData.useDimensions ? (calculatedCBM || 0) : (parseFloat(formData.cbm) || 0);
    return cbm * price;
  }, [formData.unitPrice, formData.weight, formData.shippingMode, formData.useDimensions, formData.cbm, calculatedCBM]);

  const updateField = useCallback((field: keyof EditGoodsFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!isAdmin || !canEdit) return;

    // Validation
    if (!formData.description.trim()) {
      Alert.alert('Erreur', 'La description est requise');
      return;
    }
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      Alert.alert('Erreur', 'Le poids doit être supérieur à 0');
      return;
    }
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      Alert.alert('Erreur', 'Le prix unitaire doit être supérieur à 0');
      return;
    }
    if (!formData.location.trim()) {
      Alert.alert('Erreur', "L'emplacement est requis");
      return;
    }

    const updateData: UpdateGoodsInput = {
      description: formData.description.trim(),
      quantity: parseInt(formData.quantity, 10) || 1,
      weight: parseFloat(formData.weight) || 0,
      unitPrice: parseFloat(formData.unitPrice) || 0,
      warehouseLocation: formData.location.trim().toUpperCase(),
      shippingMode: formData.shippingMode,
      receivedByName: formData.receivedByName.trim(),
    };

    // Dimensions / CBM
    if (formData.useDimensions) {
      const length = parseFloat(formData.length);
      const width = parseFloat(formData.width);
      const height = parseFloat(formData.height);
      if (length && width && height) {
        updateData.dimensions = { length, width, height };
      }
    } else {
      const cbm = parseFloat(formData.cbm);
      if (cbm > 0) {
        updateData.actualCBM = cbm;
      }
    }

    updateMutation.mutate(
      { goodsId, data: updateData },
      {
        onSuccess: () => {
          Alert.alert('Succès', 'Marchandise mise à jour avec succès', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        },
        onError: (err: any) => {
          Alert.alert('Erreur', err?.message || 'Impossible de mettre à jour la marchandise');
        },
      }
    );
  }, [formData, isAdmin, canEdit, goodsId, updateMutation, navigation]);

  // Only show error state after loading is complete
  const showError = !isLoading && (isError || !canEdit);

  return {
    formData,
    isLoading,
    isSaving: updateMutation.isPending,
    isError: showError,
    error: !isAdmin
      ? 'Accès réservé aux administrateurs'
      : canEdit
      ? error?.message
      : 'Les marchandises ne peuvent être modifiées après leur assignation à un conteneur.',
    canEdit,
    goods,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSave,
  };
};
