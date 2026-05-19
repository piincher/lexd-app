import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  item: {
    flex: 1,
    backgroundColor: colors.neutral[50],
    padding: 14,
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    color: colors.neutral[500],
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },
});
