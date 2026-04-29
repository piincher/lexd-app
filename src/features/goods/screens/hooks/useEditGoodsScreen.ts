import { useEditGoodsData } from './edit/useEditGoodsData';
import { useEditGoodsForm } from './edit/useEditGoodsForm';
import { useEditGoodsPhotos } from './edit/useEditGoodsPhotos';
import { useEditGoodsCalculations } from './edit/useEditGoodsCalculations';
import { useEditGoodsSubmit } from './edit/useEditGoodsSubmit';

export const useEditGoodsScreen = (goodsId: string, isAdmin: boolean) => {
  const { goods, isLoading, isError, error, canEdit } = useEditGoodsData(goodsId, isAdmin);
  const { formData, updateField } = useEditGoodsForm(goods);
  const { photoUris, existingPhotos, newPhotoUris, onPhotoSelected, onPhotoRemoved } = useEditGoodsPhotos(goods);
  const { calculatedCBM, calculatedTotalCost } = useEditGoodsCalculations(formData);
  const { handleSave, isSaving } = useEditGoodsSubmit(goodsId, isAdmin, canEdit, formData, existingPhotos, newPhotoUris);

  return {
    formData,
    isLoading,
    isSaving,
    isError,
    error,
    canEdit,
    goods,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSave,
    photoUris,
    onPhotoSelected,
    onPhotoRemoved,
  };
};

export type { EditGoodsFormData } from './edit/useEditGoodsForm';
