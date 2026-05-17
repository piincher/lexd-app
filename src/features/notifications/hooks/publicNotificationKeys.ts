import type { PublicNotificationType } from '../types';

export const publicNotificationQueryKeys = {
  all: ['public-notifications'] as const,
  lists: () => [...publicNotificationQueryKeys.all, 'list'] as const,
  list: (type?: PublicNotificationType) => [...publicNotificationQueryKeys.lists(), type] as const,
  infinite: (type?: PublicNotificationType) => [...publicNotificationQueryKeys.lists(), 'infinite', type] as const,
  stats: () => [...publicNotificationQueryKeys.all, 'stats'] as const,
};
