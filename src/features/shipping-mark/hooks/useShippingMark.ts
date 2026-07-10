import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { fetchMyShippingMark } from '../api/shippingMarkApi';

const SHIPPING_MARK_QUERY_KEY = 'my-shipping-mark';

export const useShippingMark = () => {
  return useQuery({
    queryKey: [SHIPPING_MARK_QUERY_KEY],
    queryFn: fetchMyShippingMark,
    select: (response) => response.data,
    staleTime: DEFAULT_STALE_TIME,
  });
};
