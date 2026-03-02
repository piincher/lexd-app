/**
 * Sync Status Hook
 * Provides information about sync state and pending actions
 */

import { useState, useEffect } from 'react';
import { getQueueStats, getQueue, QueueStats, QueuedAction } from '../lib/offlineQueue';
import { getSyncStatus } from '../lib/backgroundSync';

export interface SyncStatus {
  // Queue stats
  pendingCount: number;
  failedCount: number;
  totalCount: number;
  // Sync state
  isSyncing: boolean;
  lastSyncTime: Date | null;
  // Actions
  pendingActions: QueuedAction[];
  failedActions: QueuedAction[];
}

export interface UseSyncStatusReturn extends SyncStatus {
  refresh: () => Promise<void>;
  isLoading: boolean;
}

/**
 * Hook to monitor sync status
 */
export const useSyncStatus = (refreshInterval = 5000): UseSyncStatusReturn => {
  const [status, setStatus] = useState<SyncStatus>({
    pendingCount: 0,
    failedCount: 0,
    totalCount: 0,
    isSyncing: false,
    lastSyncTime: null,
    pendingActions: [],
    failedActions: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const refresh = async () => {
    try {
      const [queueStats, queue, syncStatus] = await Promise.all([
        getQueueStats(),
        getQueue(),
        Promise.resolve(getSyncStatus()),
      ]);

      const pendingActions = queue.filter((a) => a.retryCount < a.maxRetries);
      const failedActions = queue.filter((a) => a.retryCount >= a.maxRetries);

      setStatus({
        pendingCount: pendingActions.length,
        failedCount: failedActions.length,
        totalCount: queue.length,
        isSyncing: syncStatus.isSyncing,
        lastSyncTime: syncStatus.lastSyncTime ? new Date(syncStatus.lastSyncTime) : null,
        pendingActions,
        failedActions,
      });
    } catch (error) {
      console.error('[useSyncStatus] Error refreshing status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    refresh();

    // Set up interval for polling
    const intervalId = setInterval(refresh, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [refresh, refreshInterval]);

  return {
    ...status,
    refresh,
    isLoading,
  };
};

/**
 * Hook to get formatted sync status for UI
 */
export const useFormattedSyncStatus = (): {
  statusText: string;
  statusColor: string;
  badgeCount: number;
  lastSyncText: string;
} => {
  const { pendingCount, failedCount, lastSyncTime, isSyncing } = useSyncStatus();

  const formatLastSync = (date: Date | null): string => {
    if (!date) return 'Jamais synchronisé';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  let statusText = 'Synchronisé';
  let statusColor = '#4CAF50'; // Green

  if (isSyncing) {
    statusText = 'Synchronisation...';
    statusColor = '#2196F3'; // Blue
  } else if (failedCount > 0) {
    statusText = `${failedCount} erreur${failedCount > 1 ? 's' : ''}`;
    statusColor = '#F44336'; // Red
  } else if (pendingCount > 0) {
    statusText = `${pendingCount} en attente`;
    statusColor = '#FF9800'; // Orange
  }

  return {
    statusText,
    statusColor,
    badgeCount: pendingCount + failedCount,
    lastSyncText: formatLastSync(lastSyncTime),
  };
};

/**
 * Hook to check if there are unsynced changes
 */
export const useHasUnsyncedChanges = (): boolean => {
  const { pendingCount, failedCount } = useSyncStatus();
  return pendingCount > 0 || failedCount > 0;
};

export default useSyncStatus;
