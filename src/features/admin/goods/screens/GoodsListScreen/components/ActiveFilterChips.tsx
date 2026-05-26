/* Hallmark · component: active-filter-chips · genre: modern-minimal · theme: brand-aligned app theme
 * Cohesion pass: theme-aware tinted removable chips (was frozen to light-mode tokens at module load).
 * pre-emit critique: P4 H4 E5 S4 R5 V4
 */
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';
import { userData } from '@src/shared/types/user';

interface ActiveFilterChipsProps {
  selectedClient: userData | null;
  onClearClient: () => void;
  dateRange: { startDate: string; endDate: string } | null;
  onClearDateRange: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  selectedClient,
  onClearClient,
  dateRange,
  onClearDateRange,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  if (!selectedClient && !dateRange) return null;

  const formatRange = (range: { startDate: string; endDate: string }) => {
    const start = new Date(range.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const end = new Date(range.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    return `${start} - ${end}`;
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {selectedClient && (
          <Chip
            icon="account"
            onClose={onClearClient}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {selectedClient.firstName} {selectedClient.lastName}
          </Chip>
        )}
        {dateRange && (
          <Chip
            icon="calendar"
            onClose={onClearDateRange}
            style={styles.chip}
            textStyle={styles.chipText}
          >
            {formatRange(dateRange)}
          </Chip>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: Theme.spacing.sm,
    },
    list: {
      paddingHorizontal: Theme.spacing.xl,
      gap: Theme.spacing.sm,
    },
    chip: {
      backgroundColor: colors.primary[100],
      borderColor: colors.primary.main,
      borderWidth: 1,
    },
    chipText: {
      color: colors.primary[700],
      fontWeight: '600',
    },
  });

export default ActiveFilterChips;
