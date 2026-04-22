import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
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
  grid: {
    gap: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Theme.neutral[500],
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: Theme.neutral[800],
  },
  subtext: {
    fontSize: 13,
    color: Theme.neutral[500],
    marginTop: 2,
  },
});
