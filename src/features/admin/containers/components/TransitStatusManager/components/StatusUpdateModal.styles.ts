import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.overlay,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: Theme.radius['3xl'],
    borderTopRightRadius: Theme.radius['3xl'],
    maxHeight: '90%',
    ...Theme.shadows.xl,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    gap: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    color: colors.neutral[800],
  },
  scrollView: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
  },
  footerSpacer: {
    height: Theme.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    gap: Theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  actionButton: {
    minHeight: 44,
  },
});
