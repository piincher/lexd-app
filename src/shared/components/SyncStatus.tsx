/**
 * Sync Status Component
 * Shows pending sync count, last sync time, and manual sync button
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useSyncStatus, useFormattedSyncStatus } from '../hooks/useSyncStatus';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { syncNow, retryFailedActions } from '../lib/backgroundSync';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SyncStatusProps {
  /** Show compact version */
  compact?: boolean;
  /** Custom styles */
  style?: any;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ compact = false, style }) => {
  const { colors } = useAppTheme();
  const { isOnline } = useNetworkStatus();
  const { pendingCount, failedCount, isLoading, refresh } = useSyncStatus();
  const { statusText, statusColor, lastSyncText } = useFormattedSyncStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [spinAnim] = useState(new Animated.Value(0));

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background.card,
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        compactContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        },
        statusRow: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        statusText: {
          fontSize: 16,
          fontWeight: '600',
          marginLeft: 8,
          color: colors.text.primary,
        },
        syncButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary.main,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          gap: 6,
        },
        syncButtonDisabled: {
          backgroundColor: colors.text.disabled,
        },
        syncButtonText: {
          color: colors.text.inverse,
          fontSize: 14,
          fontWeight: '600',
        },
        statsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: colors.background.paper,
          borderRadius: 8,
        },
        statItem: {
          alignItems: 'center',
          flex: 1,
        },
        statValue: {
          fontSize: 18,
          fontWeight: '700',
          color: colors.text.primary,
        },
        statLabel: {
          fontSize: 12,
          color: colors.text.secondary,
          marginTop: 2,
        },
        statDivider: {
          width: 1,
          height: 30,
          backgroundColor: colors.border,
        },
        errorText: {
          color: colors.status.error,
        },
        statusBanner: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          borderRadius: 8,
          marginTop: 12,
          gap: 6,
        },
        statusBannerText: {
          fontSize: 13,
          fontWeight: '500',
        },
        badge: {
          position: 'absolute',
          top: -4,
          right: -4,
          minWidth: 18,
          height: 18,
          borderRadius: 9,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 4,
        },
        badgeText: {
          color: colors.text.inverse,
          fontSize: 10,
          fontWeight: '700',
        },
      }),
    [colors]
  );

  const handleSync = async () => {
    if (!isOnline) {
      showMessage({
        message: 'Hors ligne',
        description: 'Connexion internet requise pour synchroniser',
        type: 'warning',
      });
      return;
    }

    setIsSyncing(true);

    // Start spinning animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    try {
      // Retry failed actions first
      if (failedCount > 0) {
        await retryFailedActions();
      }

      // Process queue
      const result = await syncNow();

      if (result.success) {
        showMessage({
          message: 'Synchronisation réussie',
          description: `${result.processed} élément${result.processed > 1 ? 's' : ''} synchronisé${result.processed > 1 ? 's' : ''}`,
          type: 'success',
        });
      } else if (result.failed > 0) {
        showMessage({
          message: 'Synchronisation partielle',
          description: `${result.failed} échec${result.failed > 1 ? 's' : ''}`,
          type: 'warning',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Erreur de synchronisation',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        type: 'danger',
      });
    } finally {
      setIsSyncing(false);
      spinAnim.setValue(0);
      refresh();
    }
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (compact) {
    return (
      <TouchableOpacity
        style={[styles.compactContainer, style]}
        onPress={handleSync}
        disabled={isSyncing || !isOnline}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <MaterialCommunityIcons
            name={pendingCount > 0 || failedCount > 0 ? 'sync' : 'check-circle'}
            size={20}
            color={statusColor}
          />
        </Animated.View>
        {(pendingCount > 0 || failedCount > 0) && (
          <View style={[styles.badge, { backgroundColor: statusColor }]}>
            <Text style={styles.badgeText}>{pendingCount + failedCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.statusRow}>
          <MaterialCommunityIcons
            name={isOnline ? 'cloud-check' : 'cloud-off'}
            size={24}
            color={isOnline ? colors.status.success : colors.status.error}
          />
          <Text style={styles.statusText}>
            {isOnline ? 'Connecté' : 'Hors ligne'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.syncButton, (isSyncing || !isOnline) && styles.syncButtonDisabled]}
          onPress={handleSync}
          disabled={isSyncing || !isOnline}
        >
          {isSyncing ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialCommunityIcons name="sync" size={18} color={colors.text.inverse} />
              </Animated.View>
              <Text style={styles.syncButtonText}>Synchroniser</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{pendingCount}</Text>
          <Text style={styles.statLabel}>En attente</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={[styles.statValue, failedCount > 0 && styles.errorText]}>
            {failedCount}
          </Text>
          <Text style={styles.statLabel}>Échecs</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{lastSyncText}</Text>
          <Text style={styles.statLabel}>Dernière sync</Text>
        </View>
      </View>

      {(pendingCount > 0 || failedCount > 0) && (
        <View style={[styles.statusBanner, { backgroundColor: `${statusColor}20` }]}>
          <MaterialCommunityIcons name="information" size={16} color={statusColor} />
          <Text style={[styles.statusBannerText, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SyncStatus;
