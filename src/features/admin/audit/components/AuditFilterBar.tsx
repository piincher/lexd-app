import React from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditDatePreset, AuditStatus } from '../types';
import {
  AUDIT_DATE_PRESET_LABELS,
  AUDIT_STATUSES,
  AUDIT_STATUS_COLORS,
  AUDIT_STATUS_LABELS,
} from '../types';

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
      <View style={[styles.search, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.text.secondary} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Search actor, action, resource"
          placeholderTextColor={colors.text.secondary}
          value={search}
          onChangeText={onSearchChange}
          returnKeyType="search"
        />
      </View>
      <View style={[styles.search, { backgroundColor: colors.background.card, borderColor: colors.border }]}>
        <MaterialCommunityIcons name="gesture-tap" size={18} color={colors.text.secondary} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder="Filter by exact action"
          placeholderTextColor={colors.text.secondary}
          value={action}
          onChangeText={onActionChange}
          autoCapitalize="characters"
          returnKeyType="done"
        />
      </View>
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

interface AuditChipProps {
  label: string;
  active: boolean;
  color?: string;
  onPress: () => void;
}

const AuditChip: React.FC<AuditChipProps> = ({ label, active, color, onPress }) => {
  const { colors } = useAppTheme();
  const activeColor = color ?? colors.primary.main;

  return (
    <Pressable
      accessibilityRole="button"
      style={[
        styles.chip,
        { borderColor: active ? activeColor : colors.border },
        { backgroundColor: active ? `${activeColor}18` : colors.background.card },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, { color: active ? activeColor : colors.text.primary }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  search: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    paddingVertical: 8,
  },
  chips: {
    gap: 8,
    paddingBottom: 12,
    paddingTop: 4,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 36,
    paddingHorizontal: 12,
  },
  chipText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
});
