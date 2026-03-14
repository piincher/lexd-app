import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { COLORS } from '@src/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
    gap: Theme.spacing.md,
    paddingRight: Theme.spacing.lg,
  },
  card: {
    width: SCREEN_WIDTH * 0.8,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
  },
  quoteIcon: {
    marginBottom: Theme.spacing.sm,
  },
  content: {
    fontSize: 14,
    color: Theme.neutral[600],
    lineHeight: 22,
    marginBottom: Theme.spacing.md,
  },
  rating: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: Theme.spacing.md,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Theme.neutral.white,
    fontSize: 16,
  },
  name: {
    fontSize: 14,
    color: Theme.neutral[800],
  },
  role: {
    fontSize: 12,
    color: Theme.neutral[500],
  },
});
