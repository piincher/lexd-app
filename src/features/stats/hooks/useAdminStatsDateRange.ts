/**
 * useAdminStatsDateRange Hook
 * SRP: Period filter state management for admin stats
 */

import { useState } from 'react';
import { PeriodFilter } from '../types';

export const useAdminStatsDateRange = () => {
  const [period, setPeriod] = useState<PeriodFilter>('30d');
  return { period, setPeriod };
};
