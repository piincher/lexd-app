import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: Theme.primary[600],
    borderRadius: 12,
    elevation: 2,
  },
  deleteButton: {
    flex: 1,
    borderColor: Theme.status.error,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
