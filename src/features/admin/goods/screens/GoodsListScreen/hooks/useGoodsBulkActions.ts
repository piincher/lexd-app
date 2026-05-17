import { useGoodsSelection } from './useGoodsSelection';
import { useGoodsBulkOptions } from './useGoodsBulkOptions';
import { useGoodsBulkMutations } from './useGoodsBulkMutations';

export const useGoodsBulkActions = (goods: any[], onRefresh?: () => Promise<void>) => {
  const selection = useGoodsSelection(goods);
  const options = useGoodsBulkOptions();
  const mutations = useGoodsBulkMutations(selection.selectedGoodsIds, selection.exitSelectionMode, onRefresh);

  return {
    ...selection,
    ...options,
    ...mutations,
  };
};
