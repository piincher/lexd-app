/**
 * Tracking Query Keys
 */

export const trackingQueryKeys = {
  all: ['tracking'] as const,
  lists: () => [...trackingQueryKeys.all, 'list'] as const,
  list: (containerId: string) =>
    [...trackingQueryKeys.lists(), containerId] as const,
  public: () => [...trackingQueryKeys.all, 'public'] as const,
  publicTracking: (containerNumber: string) =>
    [...trackingQueryKeys.public(), containerNumber] as const,
  events: () => [...trackingQueryKeys.all, 'events'] as const,
  progress: (containerId: string) =>
    [...trackingQueryKeys.list(containerId), 'progress'] as const,
  estimatedDelivery: (containerId: string) =>
    [...trackingQueryKeys.list(containerId), 'estimated-delivery'] as const,
};
