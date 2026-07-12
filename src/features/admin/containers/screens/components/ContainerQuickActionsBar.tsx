import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ContainerQuickActionsBarProps {
  hasGoods: boolean;
  canMarkReadyForPickup: boolean;
  canMarkDelivered: boolean;
  canArchive?: boolean;
  canUnarchive?: boolean;
  isArchiving?: boolean;
  isUnarchiving?: boolean;
  onAssignGoods: () => void;
  onScanAssign: () => void;
  onSharePackingList: () => void;
  onOpenPackingList: () => void;
  onOpenLoadingList: () => void;
  onMarkReadyForPickup: () => void;
  onMarkDelivered: () => void;
  onArchive?: () => void;
  onUnarchive?: () => void;
}

interface ActionItem {
  key: string;
  label: string;
  icon: IconName;
  onPress: () => void;
  disabled?: boolean;
  accent?: 'primary' | 'warning' | 'success';
}

export const ContainerQuickActionsBar: React.FC<ContainerQuickActionsBarProps> = ({
  hasGoods,
  canMarkReadyForPickup,
  canMarkDelivered,
  canArchive,
  canUnarchive,
  isArchiving,
  isUnarchiving,
  onAssignGoods,
  onScanAssign,
  onSharePackingList,
  onOpenPackingList,
  onOpenLoadingList,
  onMarkReadyForPickup,
  onMarkDelivered,
  onArchive,
  onUnarchive,
}) => {
  const { colors } = useAppTheme();
  const actions: ActionItem[] = [
    { key: 'assign', label: 'Assigner colis', icon: 'add-circle-outline', onPress: onAssignGoods, accent: 'primary' },
    { key: 'scan', label: 'Scanner colis', icon: 'scan-outline', onPress: onScanAssign, accent: 'primary' },
    { key: 'share', label: 'Partager PDF', icon: 'share-social-outline', onPress: onSharePackingList, disabled: !hasGoods, accent: 'primary' },
    { key: 'packing', label: 'Packing', icon: 'document-text-outline', onPress: onOpenPackingList, disabled: !hasGoods },
    { key: 'loading', label: 'Loading', icon: 'list-outline', onPress: onOpenLoadingList, disabled: !hasGoods, accent: 'warning' },
  ];

  if (canMarkReadyForPickup) {
    actions.push({ key: 'ready', label: 'Prêt retrait', icon: 'checkmark-done-circle-outline', onPress: onMarkReadyForPickup, accent: 'warning' });
  }
  if (canMarkDelivered) {
    actions.push({ key: 'delivered', label: 'Livré', icon: 'checkmark-circle-outline', onPress: onMarkDelivered, accent: 'success' });
  }
  if (canArchive && onArchive) {
    actions.push({ key: 'archive', label: isArchiving ? 'Archivage...' : 'Archiver', icon: 'archive-outline', onPress: onArchive, disabled: isArchiving, accent: 'warning' });
  }
  if (canUnarchive && onUnarchive) {
    actions.push({ key: 'unarchive', label: isUnarchiving ? 'Restauration...' : 'Désarchiver', icon: 'arrow-up-circle-outline', onPress: onUnarchive, disabled: isUnarchiving, accent: 'warning' });
  }

  return (
    <View style={[styles.panel, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text.primary }]}>Actions rapides</Text>
      <View style={styles.grid}>
        {actions.map((action) => {
          const tone = action.accent === 'success'
            ? colors.status.success
            : action.accent === 'warning'
              ? colors.status.warning
              : colors.primary[600];
          return (
            <Pressable
              key={action.key}
              onPress={action.onPress}
              disabled={action.disabled}
              style={[styles.action, { borderColor: colors.border, opacity: action.disabled ? 0.45 : 1 }]}
            >
              <Ionicons name={action.icon} size={20} color={tone} />
              <Text style={[styles.actionText, { color: colors.text.primary }]} numberOfLines={1}>
                {action.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: { marginHorizontal: 16, marginTop: 14, marginBottom: 14, padding: 12, borderRadius: 8, borderWidth: 1 },
  title: { fontSize: 15, fontWeight: '800', marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  action: { width: '48.6%', minHeight: 50, borderRadius: 8, borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionText: { flex: 1, fontSize: 12, fontWeight: '800' },
});

export default ContainerQuickActionsBar;
