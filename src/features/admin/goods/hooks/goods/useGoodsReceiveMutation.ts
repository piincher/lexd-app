/**
 * Goods Receive Mutation Hook
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goodsService } from '../../services/GoodsService';
import { ReceiveGoodsInput } from '../../types';
import { goodsQueryKeys } from './useGoodsQueries';

export const useReceiveGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      photoUris,
      onProgress,
    }: {
      data: ReceiveGoodsInput;
      photoUris?: string[];
      onProgress?: (progress: number) => void;
    }) => {
      if (photoUris && photoUris.length > 0) {
        return goodsService.receiveWithPhoto(data, photoUris, onProgress);
      }
      return goodsService.receive(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goodsQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
  });
};
