import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@src/store/Auth';
import { hapticSuccess } from '@src/shared/lib/haptics';
import { isAdminRole } from '@src/shared/lib/roles';
import { useGetGoodsDetail } from './useGoodsQueries';
import { useUpdateGoods } from './useGoodsMutations';
import { useEditGoodsForm } from './useEditGoodsForm';
import { useEditGoodsPhotos } from './useEditGoodsPhotos';
import { useEditGoodsCalculations } from './useEditGoodsCalculations';
import type { UpdateGoodsInput } from '../api/types';

export const useEditGoods = (goodsId: string) => {
  const navigation = useNavigation();
  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  const isAdmin = isAdminRole(user?.role);
  const isAuthLoading = !token;

  const { data: goods, isLoading, isError, error } = useGetGoodsDetail(goodsId);
  const updateMutation = useUpdateGoods();

  const { formData, updateField } = useEditGoodsForm(goods);
  const { photoUris, existingPhotos, newPhotoUris, onPhotoSelected, onPhotoRemoved } = useEditGoodsPhotos(goods);
  const { calculatedCBM, calculatedTotalCost } = useEditGoodsCalculations(formData);

  // Goods can be edited at any status — corrections happen. Admin-only.
  const canEdit = isAdmin;

  const handleSave = useCallback(async () => {
    if (!isAdmin || !canEdit) return;
    if (!formData.description.trim()) { Alert.alert('Erreur', 'La description est requise'); return; }
    if (!formData.weight || parseFloat(formData.weight) <= 0) { Alert.alert('Erreur', 'Le poids doit être supérieur à 0'); return; }
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) { Alert.alert('Erreur', 'Le prix unitaire doit être supérieur à 0'); return; }
    if (!formData.location.trim()) { Alert.alert('Erreur', "L'emplacement est requis"); return; }

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
      if (length && width && height) updateData.dimensions = { length, width, height };
    } else {
      const cbm = parseFloat(formData.cbm);
      if (cbm > 0) updateData.actualCBM = cbm;
    }

    updateMutation.mutate(
      { goodsId, data: updateData },
      {
        onSuccess: (response: any) => {
          const invoiceWarning = response?.data?.invoiceWarning;
          const message = invoiceWarning
            ? `Marchandise mise à jour.\n\n⚠️ ${invoiceWarning}`
            : 'Marchandise mise à jour avec succès';
          Alert.alert('Succès', message, [{ text: 'OK', onPress: () => navigation.goBack() }]);
        },
        onError: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Impossible de mettre à jour la marchandise';
          Alert.alert('Erreur', message);
        },
      }
    );
  }, [formData, isAdmin, canEdit, goodsId, updateMutation, navigation, existingPhotos, newPhotoUris]);

  const handleSaveWithHaptic = useCallback(() => {
    hapticSuccess();
    handleSave();
  }, [handleSave]);

  const status = isAuthLoading || isLoading ? 'loading' : (isError || !canEdit) ? 'error' : 'ready';
  const displayError = !isAdmin
    ? 'Accès réservé aux administrateurs'
    : canEdit
    ? error?.message
    : 'Les marchandises ne peuvent être modifiées après leur assignation à un conteneur.';

  return {
    status,
    isSaving: updateMutation.isPending,
    error: displayError,
    isAdmin,
    formData,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSaveWithHaptic,
    photoUris,
    onPhotoSelected,
    onPhotoRemoved,
  };
};
