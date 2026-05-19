import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  capacityContainer: {
    backgroundColor: colors.neutral[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  capacityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  capacityValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
