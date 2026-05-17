/**
 * NotificationEmpty
 * SRP: Empty state display for notifications
 */

import React from 'react';
import { NotificationErrorState } from './NotificationErrorState';
import { NotificationFilterEmpty } from './NotificationFilterEmpty';
import type { FilterTab } from '../../types';

interface NotificationEmptyProps {
  filter: FilterTab;
  isError: boolean;
  onRetry: () => void;
}

export const NotificationEmpty: React.FC<NotificationEmptyProps> = ({
  filter,
  isError,
  onRetry,
}) => {
  if (isError) {
    return <NotificationErrorState onRetry={onRetry} />;
  }

  return <NotificationFilterEmpty filter={filter} />;
};
