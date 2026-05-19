import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: colors.background.card,
  },
  financialCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.status.success,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.neutral[800],
    marginLeft: 10,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  financialRowHighlight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: colors.neutral[600],
  },
  financialLabelHighlight: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[700],
  },
  financialValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  financialValueTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary[600],
  },
  divider: {
    marginVertical: 8,
    backgroundColor: colors.neutral[200],
  },
  paymentStatusContainer: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  paymentChip: {
    height: 36,
    paddingHorizontal: 8,
  },
});
