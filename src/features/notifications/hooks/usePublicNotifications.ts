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

  const notifications = useMemo(() => {
    const flat = data?.pages.flatMap(page => page.data) || [];
    // De-duplicate by _id before formatting: overlapping offset pages would
    // otherwise produce duplicate React keys downstream.
    const seen = new Set<string>();
    const deduped = flat.filter((n: { _id?: string }) => {
      const id = n?._id;
      if (!id) return true;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
    return formatNotifications(deduped);
  }, [data, formatNotifications]);

  return {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};
