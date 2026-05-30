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
    searchContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
    listContent: {
      padding: 16,
      gap: 12,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border.light,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    image: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.neutral[200],
    },
    imagePlaceholder: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.neutral[200],
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      flex: 1,
      gap: 4,
    },
    name: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    meta: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary.main,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
    empty: {
      alignItems: 'center',
      paddingVertical: 48,
    },
    emptyText: {
      marginTop: 12,
      textAlign: 'center',
      color: colors.text.disabled,
      fontFamily: Fonts.regular,
      fontSize: 14,
    },
    loader: {
      paddingVertical: 40,
      alignItems: 'center',
    },
    loaderText: {
      marginTop: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
      fontSize: 14,
    },
  });
