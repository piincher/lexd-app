import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 4,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 10,
      fontFamily: Fonts.semiBold,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    statCard: {
      flex: 1,
      minWidth: '23%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.background.card,
      borderLeftWidth: 3,
      elevation: 1,
    },
    statIconContainer: {
      marginRight: 8,
    },
    statIconBg: {
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    statContent: {
      flex: 1,
    },
    statValue: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
      fontFamily: Fonts.bold,
    },
    statLabel: {
      fontSize: 10,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      marginTop: 1,
    },
    revenueCard: {
      marginTop: 10,
      padding: 12,
      borderRadius: 10,
      backgroundColor: colors.background.card,
      elevation: 1,
    },
    revenueRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    revenueIconBg: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.status.success,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    revenueContent: {
      flex: 1,
    },
    revenueLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    revenueValue: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.status.success,
      fontFamily: Fonts.bold,
    },
  });

export default createStyles;
