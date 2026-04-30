import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { AuditLogFilters, AuditStatus } from '../types';
import { createAuditFiltersStyles } from './AuditFilters.styles';

interface AuditFiltersProps {
  filters: AuditLogFilters;
  onChange: (filters: AuditLogFilters) => void;
}

const STATUS_OPTIONS: Array<AuditStatus | 'ALL'> = ['ALL', 'SUCCESS', 'FAILED', 'DENIED'];

export const AuditFilters: React.FC<AuditFiltersProps> = ({ filters, onChange }) => {
  const { colors } = useAppTheme();
  const styles = createAuditFiltersStyles(colors);

  const setStatus = (status: AuditStatus | 'ALL') => {
    onChange({ ...filters, status, page: 1 });
  };

  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel="Rechercher dans les journaux"
        value={filters.q || ''}
        onChangeText={(q) => onChange({ ...filters, q, page: 1 })}
        placeholder="Rechercher action, ressource, admin..."
        placeholderTextColor={colors.text.disabled}
        style={styles.search}
        returnKeyType="search"
      />
      <View style={styles.chipRow}>
        {STATUS_OPTIONS.map((status) => {
          const active = (filters.status || 'ALL') === status;
          return (
            <Pressable
              key={status}
              accessibilityRole="button"
              onPress={() => setStatus(status)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {status === 'ALL' ? 'Tous' : status}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
