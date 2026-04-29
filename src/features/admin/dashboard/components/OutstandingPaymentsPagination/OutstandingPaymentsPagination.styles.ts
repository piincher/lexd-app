import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
    paddingBottom: 24,
  },
  pageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.background.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pageButtonDisabled: {
    backgroundColor: Theme.colors.background.paper,
  },
  pageText: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.text.secondary,
    minWidth: 80,
    textAlign: 'center',
  },
});
