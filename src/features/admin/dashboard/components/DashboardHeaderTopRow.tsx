import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { createDashboardHeaderStyles } from './DashboardHeader.styles';

type DashboardHeaderStyles = ReturnType<typeof createDashboardHeaderStyles>;

interface DashboardHeaderTopRowProps {
  styles: DashboardHeaderStyles;
  dateText: string;
  onSearchPress: () => void;
  onNotificationPress: () => void;
  iconColor: string;
}

export const DashboardHeaderTopRow: React.FC<DashboardHeaderTopRowProps> = ({
  styles,
  dateText,
  onSearchPress,
  onNotificationPress,
  iconColor,
}) => (
  <View style={styles.topRow}>
    <View style={styles.dateBadge}>
      <MaterialCommunityIcons name="calendar-today" size={12} color={iconColor} />
      <Text style={styles.dateText}>{dateText}</Text>
    </View>

    <View style={styles.actions}>
      <Pressable
        onPress={onSearchPress}
        style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        hitSlop={8}
        accessibilityLabel="Recherche"
      >
        <MaterialCommunityIcons name="magnify" size={20} color={iconColor} />
      </Pressable>
      <View style={styles.iconBtn}>
        <NotificationBell onPress={onNotificationPress} size={20} color={iconColor} />
      </View>
    </View>
  </View>
);
