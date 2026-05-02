import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FullSyncStatusProps {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  failedCount: number;
  lastSyncText: string;
  statusText: string;
  statusColor: string;
  spin: Animated.AnimatedInterpolation<string>;
  colors: any;
  styles: any;
  onSync: () => void;
}

export const FullSyncStatus: React.FC<FullSyncStatusProps> = ({
  isOnline, isSyncing, pendingCount, failedCount, lastSyncText, statusText, statusColor, spin, colors, styles, onSync,
}) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.statusRow}>
        <MaterialCommunityIcons
          name={isOnline ? "cloud-check" : "cloud-off"}
          size={24}
          color={isOnline ? colors.status.success : colors.status.error}
        />
        <Text style={styles.statusText}>{isOnline ? "Connecté" : "Hors ligne"}</Text>
      </View>
      <TouchableOpacity
        style={[styles.syncButton, (isSyncing || !isOnline) && styles.syncButtonDisabled]}
        onPress={onSync}
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
        <Text style={[styles.statValue, failedCount > 0 && styles.errorText]}>{failedCount}</Text>
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
        <Text style={[styles.statusBannerText, { color: statusColor }]}>{statusText}</Text>
      </View>
    )}
  </View>
);
