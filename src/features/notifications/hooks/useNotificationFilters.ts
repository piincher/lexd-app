/**
 * Notification Filters Hook
 * Manages notification filter state
 */

import { useState, useCallback } from 'react';

export type NotificationFilterType = 'all' | 'unread' | 'system';

export interface NotificationFilters {
  filter: NotificationFilterType;
}

export const useNotificationFilters = () => {
  const [filters, setFilters] = useState<NotificationFilters>({
    filter: 'all',
  });

  const setFilter = useCallback((filter: NotificationFilterType) => {
    setFilters({ filter });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ filter: 'all' });
  }, []);

  return {
    filters,
    setFilter,
    resetFilters,
  };
};
