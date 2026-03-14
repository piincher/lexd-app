import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsApi } from '../api/goodsApi';
import { goodsQueryKeys } from '../constants'; 
import { GoodsStatus } from '@src/shared/types/goods';

export const useGoodsStatus = (goodsId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (status: GoodsStatus) => 
      goodsApi.updateStatus(goodsId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: goodsQueryKeys.detail(goodsId)
      });
    },
  });
};
