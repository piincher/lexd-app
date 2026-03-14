import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue,
    paddingTop: Theme.spacing['4xl'],
    paddingBottom: Theme.spacing['3xl'],
    borderBottomLeftRadius: Theme.radius['2xl'],
    borderBottomRightRadius: Theme.radius['2xl'],
  },
  content: {
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Theme.neutral.white,
  },
  titleAccent: {
    fontFamily: Fonts.black,
    fontSize: 32,
    color: '#1ED7B5',
    marginBottom: Theme.spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: `${Theme.neutral.white}CC`,
    marginBottom: Theme.spacing.xl,
    lineHeight: 24,
  },
  trackingContainer: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.neutral.white,
  },
  trackingLabel: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.neutral[50],
    height: 48,
  },
  inputOutline: {
    borderRadius: Theme.radius.md,
  },
  trackButton: {
    borderRadius: Theme.radius.md,
    justifyContent: 'center',
  },
  trackButtonContent: {
    height: 48,
  },
  trackingHint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Theme.neutral[500],
    marginTop: Theme.spacing.sm,
    textAlign: 'center',
  },
});
