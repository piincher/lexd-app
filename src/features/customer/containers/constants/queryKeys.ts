/**
 * Container Tracking Query Keys
 * Centralized query keys for TanStack Query cache management
 */

export const trackingQueryKeys = {
  all: ['container-tracking'] as const,
  lists: () => [...trackingQueryKeys.all, 'list'] as const,
  container: (containerId: string) =>
    [...trackingQueryKeys.lists(), containerId] as const,
  gps: (containerId: string) =>
    [...trackingQueryKeys.container(containerId), 'gps'] as const,
  eta: (containerId: string) =>
    [...trackingQueryKeys.container(containerId), 'eta'] as const,
} as const;
