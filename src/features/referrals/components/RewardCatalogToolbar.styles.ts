import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      gap: 12,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 14,
      height: 46,
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: colors.text.primary,
      padding: 0,
    },
    controlsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    sortButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 38,
      borderRadius: RADIUS.control,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    sortLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text.primary,
      maxWidth: 150,
    },
    affordChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 38,
      borderRadius: RADIUS.control,
      borderWidth: HAIRLINE,
      borderColor: colors.primary.main,
      backgroundColor: colors.primary.main + '12',
    },
    affordChipActive: {
      backgroundColor: colors.primary.main,
    },
    affordLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.primary.main,
    },
    affordLabelActive: {
      color: colors.text.inverse,
    },
    chipsRow: {
      gap: 8,
      paddingRight: 8,
    },
    categoryChip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: RADIUS.badge,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    categoryChipActive: {
      backgroundColor: colors.text.primary,
      borderColor: colors.text.primary,
    },
    categoryLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text.secondary,
    },
    categoryLabelActive: {
      color: colors.background.card,
      fontWeight: '700',
    },
  });
