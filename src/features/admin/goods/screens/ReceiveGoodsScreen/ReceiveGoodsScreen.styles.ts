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
});
