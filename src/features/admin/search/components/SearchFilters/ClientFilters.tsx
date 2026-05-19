/**
 * ClientFilters - Filter sections for clients entity
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { FilterChipGroup } from '../FilterChipGroup';
import { SearchFilters as SearchFiltersType } from '../../api/searchApi';

const getClientStatuses = (colors: any) => [
  { value: 'true', label: 'Actif', color: colors.status.success },
  { value: 'false', label: 'Inactif', color: colors.status.error },
];

const getClientBalanceOptions = (colors: any) => [
  { value: 'true', label: 'Avec solde', color: colors.status.info },
  { value: 'false', label: 'Sans solde', color: colors.neutral[400] },
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
  const { colors } = useAppTheme();
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
          options={getClientStatuses(colors)}
          selectedValues={activeValue ?? ''}
          onToggle={handleToggleActive}
          multiSelect={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Solde</Text>
        <FilterChipGroup
          options={getClientBalanceOptions(colors)}
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
