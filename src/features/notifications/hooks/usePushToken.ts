import { useState, useCallback, useEffect } from "react";
import {
  getPermissionsStatus,
  getPushToken,
  registerDevice,
  unregisterDevice,
} from "@src/services/pushNotificationService";

export interface UsePushTokenReturn {
  token: string | null;
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
  register: () => Promise<boolean>;
  unregister: () => Promise<boolean>;
  refreshToken: () => Promise<string | null>;
}

const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : "Unknown error";

export const usePushToken = (autoRegister = true): UsePushTokenReturn => {
  const [token, setToken] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const status = await getPermissionsStatus();
        if (status === "granted") {
          const pushToken = await getPushToken();
          setToken(pushToken);
          if (autoRegister && pushToken) {
            setIsRegistered(await registerDevice(pushToken));
          }
        }
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [autoRegister]);

  const register = useCallback(async (): Promise<boolean> => {
    if (!token) { setError("No push token available"); return false; }
    setIsLoading(true);
    setError(null);
    try {
      const success = await registerDevice(token);
      setIsRegistered(success);
      return success;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const unregister = useCallback(async (): Promise<boolean> => {
    if (!token) { setError("No push token available"); return false; }
    setIsLoading(true);
    setError(null);
    try {
      const success = await unregisterDevice(token);
      if (success) setIsRegistered(false);
      return success;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const refreshToken = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newToken = await getPushToken();
      setToken(newToken);
      if (isRegistered && newToken) await registerDevice(newToken);
      return newToken;
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isRegistered]);

  return { token, isRegistered, isLoading, error, register, unregister, refreshToken };
};
