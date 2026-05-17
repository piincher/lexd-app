import { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@src/navigations/type';
import {
  useGetAirwayBillById,
  useGetUnassignedAirGoods,
} from '../../hooks/useAirwayBills';
import {
  useGetCargoBagsByAwb,
  useGetCargoBagEligibleGoods,
} from '../../hooks/useCargoBags';
import type { AirwayBillGoods } from '../../types';

export const useAssignGoodsData = (selectedBagId: string | null) => {
  const route = useRoute<RouteProp<RootStackParamList, 'AssignAirwayGoods'>>();
  const { airwayBillId } = route.params;

  const { data: airwayBillData, isLoading: isLoadingAwb } = useGetAirwayBillById(airwayBillId);
  const { data: goodsData, isLoading: isLoadingUnassigned } = useGetUnassignedAirGoods();
  const { data: cargoBagsData, isLoading: isLoadingBags } = useGetCargoBagsByAwb(airwayBillId);
  const { data: eligibleGoodsData, isLoading: isLoadingEligibleGoods } =
    useGetCargoBagEligibleGoods(selectedBagId);

  const airwayBill = airwayBillData?.data?.airwayBill;
  const unassignedGoodsList = useMemo(() => goodsData?.data?.goods || [], [goodsData]);
  const cargoBags = cargoBagsData?.data?.cargoBags || [];
  const capacityWeight = airwayBill?.capacityWeight || 0;
  const currentTotalWeight = airwayBill?.totalWeight || 0;

  const goodsList: AirwayBillGoods[] = useMemo(() => {
    if (selectedBagId) {
      return eligibleGoodsData?.data?.goods || [];
    }
    return unassignedGoodsList;
  }, [selectedBagId, eligibleGoodsData, unassignedGoodsList]);

  const isLoading = selectedBagId ? isLoadingEligibleGoods || isLoadingAwb : isLoadingUnassigned;

  return {
    airwayBillId,
    airwayBill,
    goodsList,
    cargoBags,
    isLoading,
    isLoadingBags,
    capacityWeight,
    currentTotalWeight,
  };
};
