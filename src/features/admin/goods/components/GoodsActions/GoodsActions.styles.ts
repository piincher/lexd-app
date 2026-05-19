import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.primary[600],
    borderRadius: 12,
    elevation: 2,
  },
  deleteButton: {
    flex: 1,
    borderColor: colors.status.error,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
