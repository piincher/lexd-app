/**
 * usePublicNotifications - Public notification hooks and composer
 */

import { useMemo } from 'react';
import type { PublicNotificationType } from '../types';
import { usePublicNotificationDisplay } from './usePublicNotificationDisplay';
import { useGetPublicNotificationsInfinite } from './usePublicNotificationQueries';

export { publicNotificationQueryKeys } from './publicNotificationKeys';
export {
  useGetPublicNotifications,
  useGetPublicNotificationsInfinite,
  useGetPublicNotificationsPolling,
  useGetPublicNotificationStats,
} from './usePublicNotificationQueries';
export { usePublicNotificationDisplay } from './usePublicNotificationDisplay';

export const usePublicNotifications = (type?: PublicNotificationType) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPublicNotificationsInfinite(type);

  const { formatNotifications } = usePublicNotificationDisplay();

  const notifications = useMemo(
    () => formatNotifications(data?.pages.flatMap(page => page.data) || []),
    [data, formatNotifications]
  );

  return {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
