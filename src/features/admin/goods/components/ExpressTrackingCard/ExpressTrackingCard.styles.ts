import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: Theme.colors.background.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    marginLeft: 10,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Theme.neutral[800],
    letterSpacing: 0.5,
  },
});
