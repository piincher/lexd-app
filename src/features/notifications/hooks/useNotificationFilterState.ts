import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import type { FilterTab } from '../types';

export const useNotificationFilterState = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const handleFilterChange = useCallback((filter: FilterTab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveFilter(filter);
  }, []);

  return { activeFilter, handleFilterChange };
};
