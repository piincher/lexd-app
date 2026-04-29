import { useGetGoodsDetail } from '../../../hooks';

export const useEditGoodsData = (goodsId: string, isAdmin: boolean) => {
  const { data: goods, isLoading, isError, error } = useGetGoodsDetail(goodsId);
  const canEdit = isAdmin && goods?.status === 'RECEIVED_AT_WAREHOUSE';
  const showError = !isLoading && (isError || !canEdit);
  const displayError = !isAdmin
    ? 'Accès réservé aux administrateurs'
    : canEdit
    ? error?.message
    : 'Les marchandises ne peuvent être modifiées après leur assignation à un conteneur.';

  return {
    goods,
    isLoading,
    isError: showError,
    error: displayError,
    canEdit,
  };
};
