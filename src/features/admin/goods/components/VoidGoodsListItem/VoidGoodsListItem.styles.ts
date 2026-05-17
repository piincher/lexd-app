import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const getStyles = (colors: any) =>
  StyleSheet.create({
  goodsCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goodsIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goodsId: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[800],
  },
  voidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors.feedback.errorBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  voidButtonText: {
    marginLeft: 8,
    color: colors.status.error,
    fontWeight: '600',
  },
  });
