import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  dialog: {
    backgroundColor: colors.neutral[50],
    borderRadius: Theme.radius.lg,
  },
  title: {
    color: colors.neutral[900],
    fontSize: 20,
    fontWeight: '600',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.neutral[900],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.neutral[900],
    backgroundColor: colors.neutral[100],
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderRadius: Theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.neutral[100],
  },
  dropdownText: {
    fontSize: 16,
    color: colors.neutral[900],
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: colors.neutral[400],
  },
  actions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
