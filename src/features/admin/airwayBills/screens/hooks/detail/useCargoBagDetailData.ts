import { useMemo } from 'react';
import {
  useGetCargoBagById,
  useGetCargoBagWaypoints,
} from '../../../hooks/useCargoBags';
import { AirwayBillGoods } from '../../../types';

export const useCargoBagDetailData = (cargoBagId: string) => {
  const { data, isLoading, isFetching, refetch } = useGetCargoBagById(cargoBagId);
  const { data: waypointData, refetch: refetchWaypoints } = useGetCargoBagWaypoints(cargoBagId);

  const cargoBag = data?.data?.cargoBag;
  const waypointPayload = waypointData?.data;
  const goodsList = useMemo(
    () => (cargoBag?.goodsIds || []).filter((goods): goods is AirwayBillGoods => typeof goods !== 'string'),
    [cargoBag]
  );
  const isRefreshing = isFetching && !isLoading;

  return {
    cargoBag,
    waypointPayload,
    goodsList,
    isLoading,
    isRefreshing,
    refetch,
    refetchWaypoints,
  };
};
