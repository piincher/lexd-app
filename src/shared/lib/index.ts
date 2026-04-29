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

export {
  normalizePhotos,
  type PhotoNormalizeInput,
} from './normalizePhotos';

export {
  useThemedToasts,
  type ToastOptions,
} from './use-themed-toasts';

export { usePressScale } from './use-press-scale';

export { useGlobalPending } from './use-global-pending';

export {
  listItemSpring,
  quickSpring,
  fadeInUp,
  fadeInDown,
  fadeIn,
  staggeredFadeIn,
  easing,
} from './layout-animations';

export { useHideTabBarOnScroll } from './use-hide-tab-bar-on-scroll';

// Theme hooks
export {
  useAppTheme,
  useThemeStyles,
  useThemeColors,
  useIsDarkMode,
  useThemeColor,
  useThemedStyles,
  useThemeToggle,
  useShadowStyles,
  useBorderRadius,
  useSpacing,
  useCardStyles,
  useTextStyles,
} from './hooks/useTheme';

// Clipboard hook
export { useClipboard } from './hooks/useClipboard';

// Confirmation hook
export { useConfirmationNotification } from './hooks/useConfirmation';
