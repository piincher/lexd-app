import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CargoBagStatusMenu } from './CargoBagStatusMenu';
import type { CargoBag, CargoBagStatus } from '../../types';

interface Props {
  cargoBag: CargoBag;
  removeMode: boolean;
  onToggleRemoveMode: () => void;
  isEmpty: boolean;
  statusMenuVisible: boolean;
  onStatusMenuVisibleChange: (visible: boolean) => void;
  onChangeStatus: (status: CargoBagStatus) => void;
  onDeleteBag: () => void;
  isUpdatingStatus: boolean;
  onBack: () => void;
}

export const CargoBagDetailHeader: React.FC<Props> = ({
  cargoBag,
  removeMode,
  onToggleRemoveMode,
  isEmpty,
  statusMenuVisible,
  onStatusMenuVisibleChange,
  onChangeStatus,
  onDeleteBag,
  isUpdatingStatus,
  onBack,
}) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={colors.neutral[800]} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text.primary }]} numberOfLines={1}>
        {cargoBag.bagNumber}
      </Text>
      <View style={styles.headerActions}>
        <TouchableOpacity onPress={onToggleRemoveMode} disabled={isEmpty}>
          <Ionicons
            name={removeMode ? 'close' : 'remove-circle-outline'}
            size={24}
            color={isEmpty ? colors.text.disabled : colors.status.error}
          />
        </TouchableOpacity>
        <CargoBagStatusMenu
          visible={statusMenuVisible}
          onDismiss={() => onStatusMenuVisibleChange(false)}
          anchor={
            <TouchableOpacity onPress={() => onStatusMenuVisibleChange(true)}>
              <Ionicons name="ellipsis-vertical" size={24} color={colors.neutral[800]} />
            </TouchableOpacity>
          }
          currentStatus={cargoBag.status}
          onStatusChange={onChangeStatus}
          onDelete={onDeleteBag}
          disabled={isUpdatingStatus}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1, marginHorizontal: 12 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
