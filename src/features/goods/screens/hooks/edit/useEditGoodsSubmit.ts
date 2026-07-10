import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUpdateGoods } from '../../../hooks';
import type { UpdateGoodsInput } from '../../../api/types';
import type { EditGoodsFormData } from './useEditGoodsForm';

export const useEditGoodsSubmit = (
  goodsId: string,
  isAdmin: boolean,
  canEdit: boolean,
  formData: EditGoodsFormData,
  existingPhotos: string[],
  newPhotoUris: string[]
) => {
  const navigation = useNavigation();
  const updateMutation = useUpdateGoods();

  const handleSave = useCallback(async () => {
    if (!isAdmin || !canEdit) return;

    if (!formData.description.trim()) {
      Alert.alert('Erreur', 'La description est requise');
      return;
    }
    if (
      formData.shippingMode === 'SEA' &&
      (!formData.weight || parseFloat(formData.weight) <= 0)
    ) {
      Alert.alert('Erreur', 'Le poids est requis pour le transport maritime');
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
      photosToKeep: existingPhotos,
      newPhotoUris: newPhotoUris.length > 0 ? newPhotoUris : undefined,
    };

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
        onError: (err: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          Alert.alert('Erreur', err?.message || 'Impossible de mettre à jour la marchandise');
        },
      }
    );
  }, [formData, isAdmin, canEdit, goodsId, updateMutation, navigation, existingPhotos, newPhotoUris]);

  return { handleSave, isSaving: updateMutation.isPending };
};
