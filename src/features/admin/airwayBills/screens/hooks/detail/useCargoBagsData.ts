import { useMemo } from 'react';
import { useGetCargoBagsByAwb } from '../../../hooks/useCargoBags';
import { CargoBag } from '../../../types';

export const useCargoBagsData = (airwayBillId: string) => {
  const {
    data: cargoBagsData,
    isLoading: isLoadingCargoBags,
    isFetching: isFetchingCargoBags,
    refetch: refetchCargoBags,
  } = useGetCargoBagsByAwb(airwayBillId);

  const cargoBags = useMemo(
    () => (cargoBagsData?.data?.cargoBags || []) as CargoBag[],
    [cargoBagsData]
  );
  const isRefreshingCargoBags = isFetchingCargoBags && !isLoadingCargoBags;

  return {
    cargoBags,
    isLoadingCargoBags,
    isRefreshingCargoBags,
    refetchCargoBags,
  };
};
