import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.neutral[50],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
  },
  selectorText: {
    fontSize: 15,
    fontWeight: '500',
    color: Theme.colors.text.secondary,
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Theme.colors.background.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Theme.colors.background.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.text.primary,
  },
  closeButton: {
    fontSize: 20,
    color: Theme.colors.text.secondary,
    padding: 4,
  },
  clientList: {
    maxHeight: 400,
  },
  clientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[100],
  },
  clientItemSelected: {
    backgroundColor: Theme.colors.status.success + '10',
  },
  clientInfo: {
    flex: 1,
  },
  clientItemText: {
    fontSize: 16,
    color: Theme.colors.text.secondary,
    fontWeight: '500',
  },
  clientItemTextSelected: {
    color: Theme.colors.status.success,
    fontWeight: '600',
  },
  clientMeta: {
    fontSize: 13,
    color: Theme.colors.text.secondary,
    marginTop: 4,
  },
  checkmark: {
    fontSize: 18,
    color: Theme.colors.status.success,
    fontWeight: '700',
    marginLeft: 8,
  },
});
