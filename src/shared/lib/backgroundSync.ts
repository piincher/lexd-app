/**
 * Background Sync Module
 * Handles syncing data when app comes back online
 * Processes queued mutations and syncs data in background
 */

import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
import type { AppStateStatus } from 'react-native';
import { QueryClient } from '@tanstack/react-query';
import { 
  processQueue, 
  getQueue, 
  getFailedActions,
  QueuedAction,
  removeFromQueue,
} from './offlineQueue';


const BACKGROUND_SYNC_TASK = 'CHINALINK_BACKGROUND_SYNC';

export interface SyncResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: Array<{ id: string; message: string }>;
}

export interface ConflictResolution {
  type: 'server-wins' | 'client-wins' | 'manual';
  serverData?: any;
  clientData?: any;
  resolved?: boolean;
}

export type ConflictHandler = (
  action: QueuedAction,
  serverData: any,
  clientData: any
) => Promise<ConflictResolution>;

// Global state
let isSyncing = false;
let lastSyncTime: number | null = null;
let conflictHandler: ConflictHandler | null = null;
let queryClient: QueryClient | null = null;

/**
 * Initialize background sync
 */
export const initBackgroundSync = (client: QueryClient): void => {
  queryClient = client;
  
  console.log('[BackgroundSync] Initialized');
};

/**
 * Handle app state changes
 */
const handleAppStateChange = async (nextAppState: AppStateStatus): Promise<void> => {
  if (nextAppState === 'active') {
    // App came to foreground - check and sync
    await checkAndSync();
  }
};

/**
 * Check queue and sync if needed
 */
export const checkAndSync = async (): Promise<SyncResult> => {
  const queue = await getQueue();
  
  if (queue.length === 0) {
    return { success: true, processed: 0, failed: 0, errors: [] };
  }

  return syncNow();
};

/**
 * Perform sync immediately
 */
export const syncNow = async (): Promise<SyncResult> => {
  if (isSyncing) {
    console.log('[BackgroundSync] Sync already in progress');
    return { success: false, processed: 0, failed: 0, errors: [] };
  }

  isSyncing = true;
  console.log('[BackgroundSync] Starting sync...');

  try {
    const results = await processQueue(async (action) => {
      return await executeAction(action);
    });

    lastSyncTime = Date.now();

    const failedErrors = results.failed.map(({ id, error }) => ({
      id,
      message: error.message,
    }));

    console.log(
      `[BackgroundSync] Sync complete: ${results.successful.length} successful, ${results.failed.length} failed`
    );

    // Invalidate affected queries
    if (results.successful.length > 0 && queryClient) {
      await invalidateAffectedQueries(results.successful);
    }

    return {
      success: true,
      processed: results.successful.length,
      failed: results.failed.length,
      errors: failedErrors,
    };
  } catch (error) {
    console.error('[BackgroundSync] Sync error:', error);
    return {
      success: false,
      processed: 0,
      failed: 0,
      errors: [{ id: 'sync', message: String(error) }],
    };
  } finally {
    isSyncing = false;
  }
};

/**
 * Execute a single queued action
 */
const executeAction = async (action: QueuedAction): Promise<void> => {
  // This function should be provided by the API layer
  // For now, we'll throw an error that indicates the action needs to be handled
  console.log(`[BackgroundSync] Executing action: ${action.type} - ${action.endpoint}`);
  
  // The actual implementation would call the API
  // throw new Error('API execution not implemented - should be provided by caller');
  
  // Placeholder: simulate success
  await new Promise((resolve) => setTimeout(resolve, 100));
};

/**
 * Set the API execution function for processing queue
 */
export const setActionExecutor = (
  executor: (action: QueuedAction) => Promise<void>
): void => {
  // Override the executeAction function
  // This is a simplified approach - in production, use dependency injection
};

/**
 * Set conflict resolution handler
 */
export const setConflictHandler = (handler: ConflictHandler): void => {
  conflictHandler = handler;
};

/**
 * Handle sync conflict
 */
export const resolveConflict = async (
  action: QueuedAction,
  serverData: any,
  clientData: any
): Promise<ConflictResolution> => {
  if (conflictHandler) {
    return await conflictHandler(action, serverData, clientData);
  }

  // Default: server wins
  return { type: 'server-wins', serverData, clientData };
};

/**
 * Invalidate queries affected by synced actions
 */
const invalidateAffectedQueries = async (actionIds: string[]): Promise<void> => {
  if (!queryClient) return;

  const queue = await getQueue();
  const affectedTypes = new Set<string>();

  // Find entity types from completed actions
  actionIds.forEach((id) => {
    const action = queue.find((a) => a.id === id);
    if (action?.metadata?.entityType) {
      affectedTypes.add(action.metadata.entityType);
    }
  });

  // Invalidate queries for affected types
  affectedTypes.forEach((type) => {
    queryClient?.invalidateQueries({ queryKey: [type] });
  });
};

/**
 * Get sync status
 */
export const getSyncStatus = (): {
  isSyncing: boolean;
  lastSyncTime: number | null;
} => {
  return {
    isSyncing,
    lastSyncTime,
  };
};

/**
 * Retry failed actions
 */
export const retryFailedActions = async (): Promise<SyncResult> => {
  const failedActions = await getFailedActions();
  
  if (failedActions.length === 0) {
    return { success: true, processed: 0, failed: 0, errors: [] };
  }

  // Reset retry count for failed actions
  for (const action of failedActions) {
    action.retryCount = 0;
    // Re-add to queue
    const { addToQueue } = await import('./offlineQueue');
    await addToQueue(action);
    await removeFromQueue(action.id);
  }

  return syncNow();
};

/**
 * Register background fetch task
 */
export const registerBackgroundSync = async (): Promise<void> => {
  try {
    await BackgroundTask.registerTaskAsync(BACKGROUND_SYNC_TASK, {
      minimumInterval: 15, // 15 minutes (expo-background-task uses minutes)
    });
    console.log('[BackgroundSync] Background task registered');
  } catch (error) {
    console.error('[BackgroundSync] Error registering background task:', error);
  }
};

/**
 * Unregister background fetch task
 */
export const unregisterBackgroundSync = async (): Promise<void> => {
  try {
    await BackgroundTask.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
    console.log('[BackgroundSync] Background task unregistered');
  } catch (error) {
    console.error('[BackgroundSync] Error unregistering background task:', error);
  }
};

// Define the background task
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  console.log('[BackgroundSync] Background task running');
  
  try {
    const result = await checkAndSync();
    
    return result.failed === 0
      ? BackgroundTask.BackgroundTaskResult.Success
      : BackgroundTask.BackgroundTaskResult.Failed;
  } catch (error) {
    console.error('[BackgroundSync] Background task error:', error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export default {
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
};
