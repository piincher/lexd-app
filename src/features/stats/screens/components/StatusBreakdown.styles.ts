import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';

export const createStatusBreakdownStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 18,
      ...Theme.shadows.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    headerSubtitle: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      marginTop: 2,
    },
    totalBadgeContainer: {
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 12,
    },
    totalBadge: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      fontWeight: '700',
    },
    totalBadgeLabel: {
      fontSize: 10,
      fontFamily: Fonts.regular,
    },
  });
