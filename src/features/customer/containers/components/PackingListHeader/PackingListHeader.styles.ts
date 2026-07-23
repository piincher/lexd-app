import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any, isDark: boolean) => StyleSheet.create({
  documentCard: {
    borderWidth: HAIRLINE,
    borderColor: colors.border,
    marginBottom: 16,
  },
  headerCard: {
    backgroundColor: colors.background.card,
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentTitleContainer: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: colors.text.primary,
    letterSpacing: 1,
  },
  documentSubtitle: {
    fontFamily: Fonts.meduim,
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 4,
  },
  headerDivider: {
    marginVertical: 16,
  },
  documentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginLeft: 6,
  },
});
