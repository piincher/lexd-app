/**
 * useReceiveSessionDefaults - Smart defaults for the receive-goods form.
 * Pre-fills the receiver from the logged-in user, the date as today, and remembers the
 * last warehouse location used so repeat intake needs zero typing for these three fields.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@src/store/Auth';

const LAST_LOCATION_KEY = '@lexd/receive_last_location';

export const useReceiveSessionDefaults = () => {
  const user = useAuth((s) => s.user);

  // Receiver = the operator who is logged in.
  const defaultReceivedByName = useMemo(
    () => `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
    [user?.firstName, user?.lastName],
  );

  // Date = today (captured once at mount).
  const defaultReceivedDate = useMemo(() => new Date().toISOString(), []);

  const [lastLocation, setLastLocation] = useState<string>('');
  const [locationLoaded, setLocationLoaded] = useState(false);
  const loadedOnce = useRef(false);

  useEffect(() => {
    AsyncStorage.getItem(LAST_LOCATION_KEY)
      .then((v) => {
        if (v) setLastLocation(v);
      })
      .catch(() => {})
      .finally(() => {
        loadedOnce.current = true;
        setLocationLoaded(true);
      });
  }, []);

  // Persist the last-used bay so the next intake defaults to it.
  const persistLocation = useCallback((loc?: string) => {
    const value = (loc || '').trim();
    if (!value) return;
    setLastLocation(value);
    AsyncStorage.setItem(LAST_LOCATION_KEY, value).catch(() => {});
  }, []);

  return {
    defaultReceivedByName,
    defaultReceivedDate,
    lastLocation,
    locationLoaded,
    persistLocation,
  };
};
