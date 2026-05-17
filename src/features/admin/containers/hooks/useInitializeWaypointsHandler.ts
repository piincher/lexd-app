import { useState, useCallback } from "react";
import { useInitializeWaypoints } from "./useWaypoints";

export interface UseInitializeWaypointsHandlerResult {
  handleInitialize: () => Promise<void>;
  errorMessage: string | null;
  dismissError: () => void;
  isLoading: boolean;
}

export const useInitializeWaypointsHandler = (
  containerId: string,
  onInitialized?: () => void
): UseInitializeWaypointsHandlerResult => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initializeMutation = useInitializeWaypoints();

  const handleInitialize = useCallback(async () => {
    try {
      await initializeMutation.mutateAsync(containerId);
      onInitialized?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'initialisation du suivi"
      );
    }
  }, [containerId, initializeMutation, onInitialized]);

  const dismissError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    handleInitialize,
    errorMessage,
    dismissError,
    isLoading: initializeMutation.isPending,
  };
};
