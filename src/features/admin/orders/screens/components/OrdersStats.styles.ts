/* Hallmark · pre-emit critique: P5 H4 E4 S5 R4 V4 · genre: modern-minimal · macrostructure: Workbench · design-system: app theme · designed-as-app */
import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingTop: 8,
      paddingBottom: 6,
    },
    workbenchHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
      fontFamily: Fonts.bold,
    },
    sectionSubtitle: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      marginTop: 2,
    },
    totalBadge: {
      minHeight: 28,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      backgroundColor: colors.background.paper,
      color: colors.text.secondary,
      fontFamily: Fonts.semiBold,
      fontSize: 11,
      overflow: 'hidden',
    },
    balanceCard: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 1,
      marginBottom: 10,
    },
    balanceLabel: {
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      fontSize: 12,
    },
    balanceValue: {
      color: colors.status.error,
      fontFamily: Fonts.bold,
      fontSize: 20,
      marginTop: 2,
    },
    balanceMeta: {
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 12,
      marginTop: 6,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    statCard: {
      flex: 1,
      minWidth: '47%',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.background.card,
      borderLeftWidth: 3,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 1,
    },
    statIconBg: {
      width: 32,
      height: 32,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
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
  });

export default createStyles;
