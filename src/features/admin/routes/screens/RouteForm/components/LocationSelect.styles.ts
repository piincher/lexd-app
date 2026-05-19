import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: colors.status.error,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    backgroundColor: colors.background.card,
  },
  dropdownButtonError: {
    borderColor: colors.status.error,
  },
  dropdownButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.neutral[800],
    flex: 1,
  },
  dropdownButtonPlaceholder: {
    color: colors.neutral[400],
  },
  menuContent: {
    borderRadius: Theme.radius.lg,
    backgroundColor: colors.background.card,
    width: '85%',
  },
  menuScroll: {
    maxHeight: 200,
  },
  menuItemActive: {
    color: colors.primary[600],
    fontWeight: '600',
  },
});
