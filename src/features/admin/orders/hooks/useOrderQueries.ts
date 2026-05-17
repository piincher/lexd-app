import { getActiveOrdersAdmin } from '@src/api/order';
import { LIMIT } from '@src/constants/Dimensions';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKey } from '@src/constants/queryKey';

const getNextPageParam = (lastPage: any[], allPages: any[]) =>
  lastPage.length === LIMIT ? allPages.length + 1 : undefined;

export const useGetActiveOrdersAdmin = (
  Status: string,
  departureDate: Date,
  shippingMethod: 'air' | 'sea'
) =>
  useInfiniteQuery({
    queryKey: [queryKey.ORDERKEY],
    queryFn: ({ pageParam = 1 }) => getActiveOrdersAdmin(pageParam, Status, departureDate, shippingMethod),
    getNextPageParam,
    initialPageParam: 1,
  });
