import React from 'react';
import { ScrollView, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditDatePreset, AuditStatus } from '../types';
import {
  AUDIT_DATE_PRESET_LABELS,
  AUDIT_STATUSES,
  AUDIT_STATUS_COLORS,
  AUDIT_STATUS_LABELS,
} from '../types';
import { styles } from './AuditFilterBar.styles';
import { AuditSearchInput } from './AuditSearchInput';
import { AuditChip } from './AuditChip';

interface AuditFilterBarProps {
  search: string;
  action: string;
  status?: AuditStatus;
  datePreset?: AuditDatePreset;
  onSearchChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onStatusChange: (value?: AuditStatus) => void;
  onDatePresetChange: (value?: AuditDatePreset) => void;
}

const DATE_PRESETS: AuditDatePreset[] = ['today', '7d', '30d'];

export const AuditFilterBar: React.FC<AuditFilterBarProps> = ({
  search,
  action,
  status,
  datePreset,
  onSearchChange,
  onActionChange,
  onStatusChange,
  onDatePresetChange,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <AuditSearchInput
        icon="magnify"
        placeholder="Search actor, action, resource"
        value={search}
        onChangeText={onSearchChange}
        returnKeyType="search"
      />
      <AuditSearchInput
        icon="gesture-tap"
        placeholder="Filter by exact action"
        value={action}
        onChangeText={onActionChange}
        autoCapitalize="characters"
        returnKeyType="done"
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        <AuditChip label="All" active={!status} onPress={() => onStatusChange(undefined)} />
        {AUDIT_STATUSES.map((item) => (
          <AuditChip
            key={item}
            label={AUDIT_STATUS_LABELS[item]}
            active={item === status}
            color={AUDIT_STATUS_COLORS[item]}
            onPress={() => onStatusChange(item === status ? undefined : item)}
          />
        ))}
        {DATE_PRESETS.map((item) => (
          <AuditChip
            key={item}
            label={AUDIT_DATE_PRESET_LABELS[item]}
            active={item === datePreset}
            onPress={() => onDatePresetChange(item === datePreset ? undefined : item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
