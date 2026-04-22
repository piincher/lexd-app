/**
 * ReceiveGoodsScreen Styles
 * Separated styles for maintainability
 */

import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
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
  submitButton: {
    margin: 16,
    marginTop: 8,
    backgroundColor: colors.status.error,
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  snackbar: {
    backgroundColor: colors.background.paper,
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
