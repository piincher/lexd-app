import React from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CompactSyncStatusProps {
  pendingCount: number;
  failedCount: number;
  isSyncing: boolean;
  isOnline: boolean;
  statusColor: string;
  spin: Animated.AnimatedInterpolation<string>;
  styles: any;
  onPress: () => void;
}

export const CompactSyncStatus: React.FC<CompactSyncStatusProps> = ({
  pendingCount, failedCount, isSyncing, isOnline, statusColor, spin, styles, onPress,
}) => (
  <TouchableOpacity style={styles.compactContainer} onPress={onPress} disabled={isSyncing || !isOnline}>
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <MaterialCommunityIcons
        name={pendingCount > 0 || failedCount > 0 ? "sync" : "check-circle"}
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
