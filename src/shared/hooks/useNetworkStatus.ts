/**
 * Network Status Hook
 * Detects online/offline state and connection type
 */

import { useState, useEffect } from 'react';
import NetInfo, { 
  NetInfoState, 
  NetInfoStateType,
  NetInfoSubscription,
} from '@react-native-community/netinfo';

export interface NetworkStatus {
  isOnline: boolean;
  isOffline: boolean;
  connectionType: NetInfoStateType | 'unknown';
  isWifi: boolean;
  isCellular: boolean;
  details: NetInfoState['details'];
}

/**
 * Hook to monitor network status
 */
export const useNetworkStatus = (): NetworkStatus => {
  const [networkState, setNetworkState] = useState<NetInfoState | null>(null);

  useEffect(() => {
    let unsubscribe: NetInfoSubscription | null = null;

    // Get initial state
    NetInfo.fetch().then(setNetworkState);

    // Subscribe to changes
    unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkState(state);
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const isOnline = networkState?.isConnected ?? true;
  const connectionType = networkState?.type ?? 'unknown';

  return {
    isOnline,
    isOffline: !isOnline,
    connectionType,
    isWifi: connectionType === 'wifi',
    isCellular: connectionType === 'cellular',
    details: networkState?.details,
  };
};

/**
 * Hook that triggers a callback when network status changes
 */
export const useNetworkChange = (
  onOnline?: () => void,
  onOffline?: () => void
): void => {
  const { isOnline } = useNetworkStatus();
  const [wasOnline, setWasOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (wasOnline === null) {
      setWasOnline(isOnline);
      return;
    }

    if (!wasOnline && isOnline && onOnline) {
      onOnline();
    } else if (wasOnline && !isOnline && onOffline) {
      onOffline();
    }

    setWasOnline(isOnline);
  }, [isOnline, wasOnline, onOnline, onOffline]);
};

/**
 * Hook to check if network is metered (cellular or expensive wifi)
 */
export const useMeteredConnection = (): boolean => {
  const [isMetered, setIsMetered] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      // @ts-ignore - details might have isConnectionExpensive
      const expensive = state.details?.isConnectionExpensive ?? false;
      setIsMetered(state.type === 'cellular' || expensive);
    });
  }, []);

  return isMetered;
};

/**
 * Hook to fetch current network info once
 */
export const useNetworkInfo = (): NetInfoState | null => {
  const [info, setInfo] = useState<NetInfoState | null>(null);

  useEffect(() => {
    NetInfo.fetch().then(setInfo);
  }, []);

  return info;
};

export default useNetworkStatus;
