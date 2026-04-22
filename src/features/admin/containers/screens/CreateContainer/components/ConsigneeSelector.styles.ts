import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  required: {
    color: colors.status.error,
  },
  searchbar: {
    backgroundColor: colors.neutral[100],
    borderRadius: Theme.radius.md,
  },
  searchbarInput: {
    fontSize: 14,
  },
  dropdownCard: {
    backgroundColor: colors.background.card,
    borderRadius: Theme.radius.md,
    marginTop: Theme.spacing.xs,
    height: 220,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  resultsList: {
    flex: 1,
  },
  dropdownState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.md,
  },
  dropdownStateText: {
    color: colors.neutral[500],
    fontSize: 13,
    marginTop: Theme.spacing.xs,
    textAlign: 'center',
  },
  consigneeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  consigneeItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  consigneeItemContent: {
    flex: 1,
  },
  consigneeItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  consigneeItemPhone: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 2,
  },
  consigneeItemAddress: {
    fontSize: 12,
    color: colors.neutral[400],
    marginTop: 2,
  },
  selectedConsigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral[50],
    borderRadius: Theme.radius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.primary[300],
  },
  selectedConsigneeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedConsigneeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  selectedConsigneeInfo: {
    flex: 1,
  },
  selectedConsigneeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  selectedConsigneeLabel: {
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 2,
  },
  clearConsigneeButton: {
    padding: Theme.spacing.sm,
  },
});
