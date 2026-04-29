import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  card: {
    width: '47%',
    height: 120,
    borderRadius: Theme.radius.lg,
  },
  chart: {
    height: 250,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
  },
  list: {
    height: 200,
    borderRadius: Theme.radius.lg,
  },
});
