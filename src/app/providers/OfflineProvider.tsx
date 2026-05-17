/**
 * Offline Provider
 * Context provider for offline mode functionality
 * Handles initialization, hydration, and network change detection
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { QueryClient, onlineManager } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import * as EncryptedStorage from '@src/shared/lib/encryptedStorage';
import NetInfo from '@react-native-community/netinfo';
import { getQueryClient, persistOptions, prefetchForOffline } from '@src/shared/lib/queryClient';
import { initBackgroundSync, checkAndSync, registerBackgroundSync } from '@src/shared/lib/backgroundSync';
import { showMessage } from 'react-native-flash-message';
import { useAuth } from '@src/store/Auth';

interface OfflineContextValue {
  /** Whether the app is hydrated and ready */
  isHydrated: boolean;
  /** Whether offline features are initialized */
  isInitialized: boolean;
  /** Trigger manual sync */
  syncNow: () => Promise<void>;
  /** Prefetch critical data */
  prefetchData: () => Promise<void>;
  /** Clear all offline data */
  clearOfflineData: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextValue | undefined>(undefined);

interface OfflineProviderProps {
  children: ReactNode;
  /** Custom query client */
  queryClient?: QueryClient;
  /** Data to prefetch when online */
  prefetchQueries?: Array<{ queryKey: string[]; queryFn: () => Promise<any> }>;
  /** Show toast messages */
  showToasts?: boolean;
}

export const OfflineProvider: React.FC<OfflineProviderProps> = ({
  children,
  queryClient: customQueryClient,
  prefetchQueries,
  showToasts = true,
}) => {
  const [queryClient] = useState(() => customQueryClient || getQueryClient());
  const [isHydrated, setIsHydrated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync React Query online manager with NetInfo
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);

  // Initialize offline features
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize background sync
        initBackgroundSync(queryClient);

        // Register background task
        await registerBackgroundSync();

        setIsInitialized(true);
        console.log('[OfflineProvider] Initialized successfully');
      } catch (error) {
        console.error('[OfflineProvider] Initialization error:', error);
      }
    };

    initialize();
  }, [queryClient]);

  // Handle app state changes
  useEffect(() => {
    let lastSyncTime = 0;
    const SYNC_COOLDOWN = 30 * 1000; // Minimum 30s between foreground syncs

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        const now = Date.now();
        if (now - lastSyncTime < SYNC_COOLDOWN) return;

        // App came to foreground - check network and sync
        const netInfo = await NetInfo.fetch();
        
        if (netInfo.isConnected) {
          lastSyncTime = now;
          await checkAndSync();
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  // Handle hydration complete
  const handleHydrate = () => {
    setIsHydrated(true);
    console.log('[OfflineProvider] Hydration complete');
  };

  // Expired-token guard after hydration
  useEffect(() => {
    if (!isHydrated) return;
    const { token, refreshToken, expiresAt } = useAuth.getState();
    const isExpired = expiresAt && Date.now() >= expiresAt;
    if (token && isExpired && !refreshToken) {
      console.warn('[OfflineProvider] Token expired and no refresh token available');
      // Do NOT auto-logout — users should only be logged out manually
    }
  }, [isHydrated]);

  // Manual sync trigger
  const syncNow = async () => {
    const result = await checkAndSync();
    
    if (showToasts) {
      if (result.processed > 0) {
        showMessage({
          message: 'Synchronisation terminée',
          description: `${result.processed} élément${result.processed > 1 ? 's' : ''} synchronisé${result.processed > 1 ? 's' : ''}`,
          type: 'success',
        });
      } else if (result.failed > 0) {
        showMessage({
          message: 'Synchronisation incomplète',
          description: `${result.failed} élément${result.failed > 1 ? 's' : ''} en échec`,
          type: 'warning',
        });
      } else {
        showMessage({
          message: 'Synchronisation',
          description: 'Tous les éléments sont à jour',
          type: 'success',
        });
      }
    }
  };

  // Prefetch critical data
  const prefetchData = async () => {
    if (!prefetchQueries || prefetchQueries.length === 0) return;

    try {
      await prefetchForOffline(prefetchQueries);
      
      if (showToasts) {
        showMessage({
          message: 'Données mises en cache',
          description: 'Les données sont disponibles hors ligne',
          type: 'success',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('[OfflineProvider] Prefetch error:', error);
    }
  };

  // Clear all offline data
  const clearOfflineData = async () => {
    try {
      // Clear React Query cache
      queryClient.clear();
      
      // Clear AsyncStorage
      await EncryptedStorage.clear();
      
      if (showToasts) {
        showMessage({
          message: 'Cache vidé',
          description: 'Toutes les données hors ligne ont été supprimées',
          type: 'info',
        });
      }
    } catch (error) {
      console.error('[OfflineProvider] Clear error:', error);
      
      if (showToasts) {
        showMessage({
          message: 'Erreur',
          description: 'Impossible de vider le cache',
          type: 'danger',
        });
      }
    }
  };

  const contextValue: OfflineContextValue = {
    isHydrated,
    isInitialized,
    syncNow,
    prefetchData,
    clearOfflineData,
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
      onSuccess={handleHydrate}
    >
      <OfflineContext.Provider value={contextValue}>
        {children}
      </OfflineContext.Provider>
    </PersistQueryClientProvider>
  );
};

/**
 * Hook to access offline context
 */
export const useOffline = (): OfflineContextValue => {
  const context = useContext(OfflineContext);
  
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  
  return context;
};

export default OfflineProvider;
