/**
 * ClientFilters - Filter sections for clients entity
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';
import { FilterChipGroup } from '../FilterChipGroup';
import { SearchFilters as SearchFiltersType } from '../../api/searchApi';

const CLIENT_STATUSES = [
  { value: 'true', label: 'Actif', color: '#10B981' },
  { value: 'false', label: 'Inactif', color: '#EF4444' },
];

const CLIENT_BALANCE_OPTIONS = [
  { value: 'true', label: 'Avec solde', color: '#6366F1' },
  { value: 'false', label: 'Sans solde', color: '#94A3B8' },
];

const CLIENT_ROLES = [
  { value: 'user', label: 'Client' },
  { value: 'staff', label: 'Staff' },
  { value: 'admin', label: 'Admin' },
  { value: 'superadmin', label: 'Superadmin' },
];

interface ClientFiltersProps {
  filters: SearchFiltersType;
  onSetIsActive: (isActive: boolean | undefined) => void;
  onSetHasBalance: (hasBalance: boolean | undefined) => void;
  onToggleRole: (role: string) => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  filters,
  onSetIsActive,
  onSetHasBalance,
  onToggleRole,
}) => {
  const activeValue = filters.isActive === undefined ? undefined : String(filters.isActive);
  const balanceValue = filters.hasBalance === undefined ? undefined : String(filters.hasBalance);

  const handleToggleActive = (value: string) => {
    onSetIsActive(value === 'true');
  };

  const handleToggleBalance = (value: string) => {
    onSetHasBalance(value === 'true');
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.label}>Statut du compte</Text>
        <FilterChipGroup
          options={CLIENT_STATUSES}
          selectedValues={activeValue ?? ''}
          onToggle={handleToggleActive}
          multiSelect={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Solde</Text>
        <FilterChipGroup
          options={CLIENT_BALANCE_OPTIONS}
          selectedValues={balanceValue ?? ''}
          onToggle={handleToggleBalance}
          multiSelect={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Rôle</Text>
        <FilterChipGroup
          options={CLIENT_ROLES}
          selectedValues={filters.role ?? []}
          onToggle={onToggleRole}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: Theme.spacing.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
});
