import React, { useState, useMemo } from "react";
import { Animated } from "react-native";
import { useSyncStatus, useFormattedSyncStatus } from "../hooks/useSyncStatus";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { syncNow, retryFailedActions } from "../lib/backgroundSync";
import { showMessage } from "react-native-flash-message";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./SyncStatus.styles";
import { CompactSyncStatus } from "./CompactSyncStatus";
import { FullSyncStatus } from "./FullSyncStatus";

interface SyncStatusProps {
  compact?: boolean;
  style?: any;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ compact = false, style }) => {
  const { colors } = useAppTheme();
  const { isOnline } = useNetworkStatus();
  const { pendingCount, failedCount, isLoading, refresh } = useSyncStatus();
  const { statusText, statusColor, lastSyncText } = useFormattedSyncStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [spinAnim] = useState(new Animated.Value(0));

  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleSync = async () => {
    if (!isOnline) {
      showMessage({ message: "Hors ligne", description: "Connexion internet requise pour synchroniser", type: "warning" });
      return;
    }
    setIsSyncing(true);
    Animated.loop(Animated.timing(spinAnim, { toValue: 1, duration: 1000, useNativeDriver: true })).start();
    try {
      if (failedCount > 0) await retryFailedActions();
      const result = await syncNow();
      if (result.success) {
        showMessage({ message: "Synchronisation réussie", description: `${result.processed} élément${result.processed > 1 ? "s" : ""} synchronisé${result.processed > 1 ? "s" : ""}`, type: "success" });
      } else if (result.failed > 0) {
        showMessage({ message: "Synchronisation partielle", description: `${result.failed} échec${result.failed > 1 ? "s" : ""}`, type: "warning" });
      }
    } catch (error) {
      showMessage({ message: "Erreur de synchronisation", description: error instanceof Error ? error.message : "Une erreur est survenue", type: "danger" });
    } finally {
      setIsSyncing(false);
      spinAnim.setValue(0);
      refresh();
    }
  };

  const spin = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  if (compact) {
    return (
      <CompactSyncStatus
        pendingCount={pendingCount}
        failedCount={failedCount}
        isSyncing={isSyncing}
        isOnline={isOnline}
        statusColor={statusColor}
        spin={spin}
        styles={styles}
        onPress={handleSync}
      />
    );
  }

  return (
    <FullSyncStatus
      isOnline={isOnline}
      isSyncing={isSyncing}
      pendingCount={pendingCount}
      failedCount={failedCount}
      lastSyncText={lastSyncText}
      statusText={statusText}
      statusColor={statusColor}
      spin={spin}
      colors={colors}
      styles={styles}
      onSync={handleSync}
    />
  );
};

export default SyncStatus;
