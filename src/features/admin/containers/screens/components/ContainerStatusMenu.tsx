import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Menu } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import {
  getContainerStatusColors,
  ContainerStatus,
} from '../../types';

type HeaderStatusIcon = keyof typeof Ionicons.glyphMap;

interface StatusStep {
  status: ContainerStatus;
  label: string;
  icon: HeaderStatusIcon;
}

interface ContainerStatusMenuProps {
  status: ContainerStatus;
  statusColor: string;
  statusLabel: string;
  visible: boolean;
  steps: StatusStep[];
  isUpdatingStatus: boolean;
  onSetVisible: (visible: boolean) => void;
  onUpdateStatus: (status: ContainerStatus) => void;
}

export const ContainerStatusMenu: React.FC<ContainerStatusMenuProps> = ({
  status,
  statusColor,
  statusLabel,
  visible,
  steps,
  isUpdatingStatus,
  onSetVisible,
  onUpdateStatus,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  const handleUpdateStatus = (newStatus: ContainerStatus) => {
    if (isUpdatingStatus) return;
    onSetVisible(false);
    onUpdateStatus(newStatus);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => onSetVisible(false)}
      anchor={
        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: statusColor }]}
          onPress={() => !isUpdatingStatus && onSetVisible(true)}
          disabled={isUpdatingStatus}
          accessibilityRole="button"
          accessibilityLabel="Changer le statut du conteneur"
          accessibilityState={{ busy: isUpdatingStatus, disabled: isUpdatingStatus }}
        >
          <Text style={styles.statusText}>{statusLabel}</Text>
          {isUpdatingStatus ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <Ionicons name="chevron-down" size={16} color={colors.text.inverse} />
          )}
        </TouchableOpacity>
      }
    >
      {steps.map((step) => (
        <Menu.Item
          key={step.status}
          onPress={() => handleUpdateStatus(step.status)}
          title={step.label}
          disabled={isUpdatingStatus}
          leadingIcon={() => (
            <Ionicons
              name={step.icon}
              size={20}
              color={getContainerStatusColors(colors)[step.status]}
            />
          )}
          style={status === step.status ? styles.menuItemActive : undefined}
        />
      ))}
    </Menu>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    minHeight: 40,
  },
  statusText: {
    color: colors.text.inverse,
    fontWeight: '700',
    fontSize: 12,
  },
  menuItemActive: {
    backgroundColor: colors.status.success + '1A',
  },
});

export default ContainerStatusMenu;
