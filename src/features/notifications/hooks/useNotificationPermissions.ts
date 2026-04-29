/**
 * useNotificationPermissions Hook
 * Manages notification permission status
 */

import { useState, useCallback, useEffect } from "react";
import {
  getPermissionsStatus,
  requestPermissions,
  NotificationPermissionStatus,
} from "@src/services/pushNotificationService";

export interface UseNotificationPermissionsReturn {
  permissionStatus: NotificationPermissionStatus;
  isEnabled: boolean;
  isLoading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
}

export const useNotificationPermissions = (): UseNotificationPermissionsReturn => {
  const [permissionStatus, setPermissionStatus] =
    useState<NotificationPermissionStatus>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const status = await getPermissionsStatus();
        setPermissionStatus(status);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const status = await requestPermissions();
      setPermissionStatus(status);
      return status === "granted";
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isEnabled = permissionStatus === "granted";

  return { permissionStatus, isEnabled, isLoading, error, requestPermission };
};
