import { useState, useEffect, useCallback } from "react";
import { getPermissionsStatus } from "@src/shared/services/notificationService";

export const useNotificationPermissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [masterEnabled, setMasterEnabled] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const status = await getPermissionsStatus();
      setPermissionStatus(status);
      setMasterEnabled(status === "granted");
    } catch (error) {
      console.error("Error loading notification settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return { isLoading, masterEnabled, permissionStatus, setMasterEnabled, setPermissionStatus };
};
