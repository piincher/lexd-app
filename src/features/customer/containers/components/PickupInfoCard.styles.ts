import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createPickupInfoCardStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    sectionCard: {
      marginBottom: 16,
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 16,
      elevation: 1,
    },
    pickupCard: {
      backgroundColor: isDark ? `${colors.status.warning}15` : colors.feedback.warningBg,
    },
    pickupHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    pickupTitle: {
      fontFamily: Fonts.bold,
      fontSize: 16,
      color: colors.accent.goldDark,
      marginLeft: 8,
    },
    pickupText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 12,
      lineHeight: 20,
    },
    checklist: {
      gap: 8,
      marginBottom: 12,
    },
    checklistItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checklistText: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: colors.text.primary,
      flex: 1,
    },
    contactInfo: {
      backgroundColor: colors.background.card,
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    contactLabel: {
      fontFamily: Fonts.meduim,
      fontSize: 13,
      color: colors.text.secondary,
    },
    contactValue: {
      fontFamily: Fonts.regular,
      color: colors.text.primary,
    },
    contactButton: {
      marginTop: 8,
    },
  });
