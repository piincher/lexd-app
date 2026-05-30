import { StyleSheet, Platform } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'android' ? 12 : 20,
      paddingBottom: 16,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.neutral[100],
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },
    headerTitleContainer: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 22,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginBottom: 2,
    },
    headerSubtitle: {
      fontSize: 14,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    scroll: {
      padding: 16,
      gap: 16,
      paddingBottom: 100,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    searchButton: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 12,
      backgroundColor: colors.primary.main,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchButtonText: {
      fontSize: 14,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
    userCard: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.light,
      alignItems: 'center',
      gap: 8,
    },
    userName: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    userPhone: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    userPoints: {
      fontSize: 28,
      fontFamily: Fonts.bold,
      color: colors.primary.main,
      marginTop: 4,
    },
    userPointsLabel: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    section: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.light,
      gap: 12,
    },
    sectionTitle: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginBottom: 4,
    },
    ledgerItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
    ledgerItemLast: {
      borderBottomWidth: 0,
    },
    ledgerNote: {
      flex: 1,
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
      marginRight: 8,
    },
    ledgerDelta: {
      fontSize: 14,
      fontFamily: Fonts.bold,
    },
    ledgerDate: {
      fontSize: 11,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
      marginTop: 2,
    },
    adjustForm: {
      gap: 12,
    },
    saveButton: {
      marginTop: 8,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: colors.primary.main,
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
    empty: {
      alignItems: 'center',
      paddingVertical: 32,
    },
    emptyText: {
      textAlign: 'center',
      color: colors.text.disabled,
      fontFamily: Fonts.regular,
      fontSize: 14,
    },
  });
