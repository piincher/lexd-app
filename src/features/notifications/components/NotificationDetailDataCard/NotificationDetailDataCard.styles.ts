import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    dataCard: {
      margin: 16,
      marginTop: 0,
      padding: 20,
      borderRadius: RADIUS.card,
      backgroundColor: colors.background.card,
      // Waybill: border-first, no drop shadow.
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    dataTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 12,
    },
    dataItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dataLabel: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
    },
    dataValue: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: colors.text.primary,
    },
    progressContainer: {
      marginBottom: 12,
    },
    progressLabel: {
      fontFamily: Fonts.medium,
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    trackingSection: {
      marginBottom: 16,
    },
    trackingItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 6,
    },
    trackingBullet: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: colors.status.success,
      marginRight: 8,
      marginTop: 2,
    },
    trackingText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
      flex: 1,
      lineHeight: 20,
    },
    trackingSubtext: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
  });
