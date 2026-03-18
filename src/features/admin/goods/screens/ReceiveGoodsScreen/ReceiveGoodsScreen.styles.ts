/**
 * ReceiveGoodsScreen Styles
 * Separated styles for maintainability
 */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  formContainer: {
    flex: 1,
  },
  submitButton: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#dc3545',
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  snackbar: {
    backgroundColor: '#333',
  },
  dialog: {
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
  },
  dialogText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
  dialogButton: {
    paddingHorizontal: 32,
  },
  // Choice Dialog Styles
  choiceDialog: {
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  choiceDialogText: {
    textAlign: 'center',
    color: '#666',
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
    backgroundColor: '#dc3545',
  },
  choiceDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
  },
});
