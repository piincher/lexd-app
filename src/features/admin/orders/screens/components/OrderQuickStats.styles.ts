import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.background.card,
    elevation: 2,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    fontFamily: Fonts.bold,
  },
  statLabel: {
    fontSize: 11,
    color: colors.text.secondary,
    fontFamily: Fonts.medium,
  },
  divider: {
    width: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: 4,
  },
});

export default createStyles;
