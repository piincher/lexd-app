import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    ...Theme.shadows.sm,
  },
  unreadCard: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  accentBar: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.medium,
    fontWeight: '500',
    color: colors.neutral[700],
  },
  unreadTitle: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: colors.neutral[900],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  message: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: colors.neutral[500],
    lineHeight: 18,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeLabel: {
    fontSize: 11,
    fontFamily: Fonts.semiBold,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: colors.neutral[400],
  },
});
