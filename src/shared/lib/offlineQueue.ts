/**
 * Offline Queue System
 * Queues mutations when offline and processes them when back online
 */

import { getItem, setItem, removeItem, getAllKeys } from './offlineStorage';

export type QueuedActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'CUSTOM';

export interface QueuedAction {
  id: string;
  type: QueuedActionType;
  endpoint: string;
  payload: any;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  priority: 'high' | 'normal' | 'low';
  metadata?: {
    entityType?: string;
    entityId?: string;
    optimisticId?: string;
  };
}

export interface QueueStats {
  total: number;
  pending: number;
  failed: number;
  lastProcessedAt: number | null;
}

const QUEUE_KEY_PREFIX = '@offline_queue_';
const QUEUE_STATS_KEY = '@offline_queue_stats';

/**
 * Generate unique ID for queued action
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Add an action to the offline queue
 */
export const addToQueue = async (
  action: Omit<QueuedAction, 'id' | 'timestamp' | 'retryCount'>
): Promise<QueuedAction> => {
  const fullAction: QueuedAction = {
    ...action,
    id: generateId(),
    timestamp: Date.now(),
    retryCount: 0,
  };

  try {
    await setItem(`${QUEUE_KEY_PREFIX}${fullAction.id}`, fullAction);
    await updateQueueStats();
    console.log(`[OfflineQueue] Added action ${fullAction.id} to queue`);
    return fullAction;
  } catch (error) {
    console.error('[OfflineQueue] Error adding to queue:', error);
    throw error;
  }
};

/**
 * Get all queued actions sorted by priority and timestamp
 */
export const getQueue = async (): Promise<QueuedAction[]> => {
  try {
    const keys = await getAllKeys();
    const queueKeys = keys.filter(key => key.startsWith(QUEUE_KEY_PREFIX));
    
    if (queueKeys.length === 0) return [];

    const actions = await Promise.all(
      queueKeys.map(async (key) => {
        const action = await getItem<QueuedAction>(key);
        return action;
      })
    );

    // Filter out nulls and sort by priority and timestamp
    const priorityOrder = { high: 0, normal: 1, low: 2 };
    return actions
      .filter((a): a is QueuedAction => a !== null)
      .sort((a, b) => {
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return a.timestamp - b.timestamp;
      });
  } catch (error) {
    console.error('[OfflineQueue] Error getting queue:', error);
    return [];
  }
};

/**
 * Remove an action from the queue
 */
export const removeFromQueue = async (id: string): Promise<void> => {
  try {
    await removeItem(`${QUEUE_KEY_PREFIX}${id}`);
    await updateQueueStats();
    console.log(`[OfflineQueue] Removed action ${id} from queue`);
  } catch (error) {
    console.error('[OfflineQueue] Error removing from queue:', error);
    throw error;
  }
};

/**
 * Update retry count for an action
 */
export const incrementRetryCount = async (id: string): Promise<void> => {
  try {
    const action = await getItem<QueuedAction>(`${QUEUE_KEY_PREFIX}${id}`);
    if (action) {
      action.retryCount += 1;
      await setItem(`${QUEUE_KEY_PREFIX}${id}`, action);
    }
  } catch (error) {
    console.error('[OfflineQueue] Error incrementing retry count:', error);
  }
};

/**
 * Clear all queued actions
 */
export const clearQueue = async (): Promise<void> => {
  try {
    const keys = await getAllKeys();
    const queueKeys = keys.filter(key => key.startsWith(QUEUE_KEY_PREFIX));
    
    await Promise.all(queueKeys.map(key => removeItem(key)));
    await updateQueueStats();
    console.log('[OfflineQueue] Cleared all queued actions');
  } catch (error) {
    console.error('[OfflineQueue] Error clearing queue:', error);
    throw error;
  }
};

/**
 * Get queue statistics
 */
export const getQueueStats = async (): Promise<QueueStats> => {
  const defaultStats: QueueStats = {
    total: 0,
    pending: 0,
    failed: 0,
    lastProcessedAt: null,
  };

  try {
    const stats = await getItem<QueueStats>(QUEUE_STATS_KEY);
    return stats || defaultStats;
  } catch (error) {
    return defaultStats;
  }
};

/**
 * Update queue statistics
 */
const updateQueueStats = async (): Promise<void> => {
  try {
    const queue = await getQueue();
    const stats: QueueStats = {
      total: queue.length,
      pending: queue.filter(a => a.retryCount < a.maxRetries).length,
      failed: queue.filter(a => a.retryCount >= a.maxRetries).length,
      lastProcessedAt: Date.now(),
    };
    await setItem(QUEUE_STATS_KEY, stats);
  } catch (error) {
    console.error('[OfflineQueue] Error updating stats:', error);
  }
};

/**
 * Process the offline queue
 * @param processor Function to process each action
 * @returns Results of processing
 */
export const processQueue = async <T>(
  processor: (action: QueuedAction) => Promise<T>
): Promise<{
  successful: string[];
  failed: Array<{ id: string; error: Error }>;
  skipped: string[];
}> => {
  const queue = await getQueue();
  const results = {
    successful: [] as string[],
    failed: [] as Array<{ id: string; error: Error }>,
    skipped: [] as string[],
  };

  console.log(`[OfflineQueue] Processing ${queue.length} queued actions`);

  for (const action of queue) {
    // Skip actions that have exceeded max retries
    if (action.retryCount >= action.maxRetries) {
      results.skipped.push(action.id);
      continue;
    }

    try {
      await processor(action);
      await removeFromQueue(action.id);
      results.successful.push(action.id);
    } catch (error) {
      await incrementRetryCount(action.id);
      results.failed.push({ 
        id: action.id, 
        error: error instanceof Error ? error : new Error(String(error)) 
      });
    }
  }

  await updateQueueStats();
  console.log(
    `[OfflineQueue] Processing complete: ${results.successful.length} successful, ${results.failed.length} failed, ${results.skipped.length} skipped`
  );

  return results;
};

/**
 * Check if queue has any pending actions
 */
export const hasPendingActions = async (): Promise<boolean> => {
  const queue = await getQueue();
  return queue.some(a => a.retryCount < a.maxRetries);
};

/**
 * Get failed actions (exceeded max retries)
 */
export const getFailedActions = async (): Promise<QueuedAction[]> => {
  const queue = await getQueue();
  return queue.filter(a => a.retryCount >= a.maxRetries);
};

export default {
  addToQueue,
  getQueue,
  removeFromQueue,
  clearQueue,
  processQueue,
  getQueueStats,
  hasPendingActions,
  getFailedActions,
  incrementRetryCount,
};
