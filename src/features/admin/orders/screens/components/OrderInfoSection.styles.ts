import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
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
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.secondary,
      fontFamily: Fonts.semiBold,
      marginBottom: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    grid: {
      gap: 12,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
    },
    divider: {
      marginVertical: 16,
      backgroundColor: colors.border,
    },
    notesSection: {
      backgroundColor: colors.accent.goldLight,
      borderRadius: 10,
      padding: 12,
    },
    notesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 6,
    },
    notesTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.accent.goldDark,
      fontFamily: Fonts.semiBold,
    },
    notesText: {
      fontSize: 13,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      lineHeight: 18,
    },
  });

export default createStyles;
