import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing['2xl'],
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.lg,
  },
  scrollContent: {
    gap: Theme.spacing.xl,
    paddingRight: Theme.spacing.lg,
  },
  logoContainer: {
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});
