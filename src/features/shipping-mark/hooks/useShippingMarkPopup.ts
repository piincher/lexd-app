import { useQuery } from '@tanstack/react-query';
import { DEFAULT_STALE_TIME } from '@src/shared/constants/queryConfig';
import { useAuth } from '@src/app/store/Auth';
import { fetchShippingMarkPopupConfig } from '../api/shippingMarkApi';

const SHIPPING_MARK_POPUP_CONFIG_KEY = 'shipping-mark-popup-config';

export const useShippingMarkPopup = () => {
  // The provider mounts at the app root, so this query would otherwise fire
  // before the persisted token has rehydrated (or while logged out): a 401 that
  // never recovers leaves config undefined and the popup hidden forever. Gate on
  // the token so it only runs once authenticated and refetches right after login.
  const token = useAuth((state) => state.token);

  return useQuery({
    queryKey: [SHIPPING_MARK_POPUP_CONFIG_KEY],
    queryFn: fetchShippingMarkPopupConfig,
    staleTime: DEFAULT_STALE_TIME,
    enabled: Boolean(token),
  });
};
