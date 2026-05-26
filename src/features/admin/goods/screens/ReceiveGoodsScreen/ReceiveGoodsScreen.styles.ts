/**
 * ReceiveGoodsScreen Styles
 * Separated styles for maintainability
 */

import { StyleSheet } from 'react-native';
import type { AppTheme } from '@src/constants/Theme';

type ThemeColors = AppTheme['colors'];

export const createStyles = (colors: ThemeColors, isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 2,
  },
  formContainer: {
    flex: 1,
  },
  buttonGroup: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 10,
  },
  secondaryButton: {
    borderColor: colors.primary.main,
    borderWidth: 1.5,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: colors.status.error,
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  sessionCounter: {
    marginHorizontal: 16,
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.primary[50] ?? colors.background.paper,
    borderWidth: 1,
    borderColor: colors.primary[100] ?? colors.border,
    alignItems: 'center',
  },
  sessionCounterText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary.main,
  },
  snackbar: {
    backgroundColor: colors.background.paper,
  },
  infoSnackbar: {
    backgroundColor: colors.status.success,
  },
  dialog: {
    borderRadius: 16,
    backgroundColor: colors.background.card,
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dialogText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: 15,
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  dialogButton: {
    paddingHorizontal: 32,
  },
  choiceDialog: {
    borderRadius: 16,
    backgroundColor: colors.background.card,
  },
  choiceDialogText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontSize: 15,
    marginTop: 8,
  },
  choiceDialogActions: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  choiceButton: {
    width: '100%',
    borderRadius: 8,
  },
  assignButton: {
    backgroundColor: colors.status.error,
  },
  choiceDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: colors.text.disabled,
    fontSize: 14,
  },
});
