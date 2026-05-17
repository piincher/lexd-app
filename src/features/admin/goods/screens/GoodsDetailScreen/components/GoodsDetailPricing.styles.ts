import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  sectionCard: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: Theme.colors.background.card,
  },
  financialCard: {
    borderLeftWidth: 4,
    borderLeftColor: Theme.status.success,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
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
    backgroundColor: Theme.primary[50],
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  financialLabel: {
    fontSize: 14,
    color: Theme.neutral[600],
  },
  financialLabelHighlight: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
  },
  financialValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  financialValueTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: Theme.primary[600],
  },
  divider: {
    marginVertical: 8,
    backgroundColor: Theme.neutral[200],
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
