/**
 * Shared Library
 * Utilities for offline mode, storage, and syncing
 */

export {
  setItem,
  getItem,
  removeItem,
  getAllKeys,
  multiGet,
  multiSet,
  multiRemove,
  clear,
  getStorageSize,
  isStorageNearLimit,
  mergeItem,
  type StorageStats,
} from './offlineStorage';

export {
  createQueryClient,
  createPersister,
  persistOptions,
  getQueryClient,
  resetQueryClient,
  invalidateAllQueries,
  prefetchForOffline,
  CACHE_STRATEGIES,
} from './queryClient';

export {
  addToQueue,
  getQueue,
  removeFromQueue,
  clearQueue,
  processQueue,
  getQueueStats,
  hasPendingActions,
  getFailedActions,
  incrementRetryCount,
  type QueuedAction,
  type QueuedActionType,
  type QueueStats,
} from './offlineQueue';

export {
  initBackgroundSync,
  checkAndSync,
  syncNow,
  setActionExecutor,
  setConflictHandler,
  resolveConflict,
  getSyncStatus,
  retryFailedActions,
  registerBackgroundSync,
  unregisterBackgroundSync,
  type SyncResult,
  type ConflictResolution,
  type ConflictHandler,
} from './backgroundSync';

export {
  isOnline,
  getConnectionType,
  isWifiConnected,
  isCellularConnected,
  isConnectionMetered,
  getConnectionInfo,
  waitForOnline,
  retryWhenOnline,
} from './networkStatus';

export {
  formatCurrency,
  formatAmount,
  parseAmount,
} from './currency';

export {
  formatCBM,
  formatDate,
  formatDateTime,
  formatStatusLabel,
  formatTrackingCode,
} from './formatters';

// formatCurrency is exported from './currency' above

export {
  hapticLight,
  hapticMedium,
  hapticSuccess,
  hapticError,
  hapticSelection,
} from './haptics';
