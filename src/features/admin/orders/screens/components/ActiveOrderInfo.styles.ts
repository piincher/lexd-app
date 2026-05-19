import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: Fonts.semiBold,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: Fonts.medium,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    fontFamily: Fonts.semiBold,
    maxWidth: '45%',
    textAlign: 'right',
  },
  divider: {
    marginVertical: 6,
    backgroundColor: colors.border,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: colors.feedback.warningBg,
    borderRadius: 10,
    padding: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    fontFamily: Fonts.regular,
    lineHeight: 18,
  },
});
