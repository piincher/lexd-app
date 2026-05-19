import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
    borderLeftWidth: 4,
    borderLeftColor: colors.status.success,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  divider: {
    marginVertical: 8,
    backgroundColor: colors.neutral[200],
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[600],
  },
  chipContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  chip: {
    height: 36,
    paddingHorizontal: 8,
  },
});
