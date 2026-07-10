import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { fetchShippingMarkPopupConfig } from '../api/shippingMarkApi';

const SHIPPING_MARK_POPUP_CONFIG_KEY = 'shipping-mark-popup-config';

export const useShippingMarkPopup = () => {
  return useQuery({
    queryKey: [SHIPPING_MARK_POPUP_CONFIG_KEY],
    queryFn: fetchShippingMarkPopupConfig,
    staleTime: DEFAULT_STALE_TIME,
  });
};
