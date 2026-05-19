import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 12,
    paddingBottom: 28,
    ...Theme.shadows.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary[600],
  },
  selectAllText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  cancelText: {
    fontSize: 14,
    color: colors.status.error,
    fontWeight: '600',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary.main,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonDanger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.status.error,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonDisabled: {
    backgroundColor: colors.border,
  },
  actionButtonText: {
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 13,
  },
});
