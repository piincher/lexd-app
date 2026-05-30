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
      paddingVertical: 10,
      backgroundColor: colors.background.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral[200],
    },
    filterScroll: {
      paddingHorizontal: 12,
      gap: 8,
      paddingVertical: 10,
      backgroundColor: colors.background.card,
    },
    filterChip: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.neutral[200],
      marginHorizontal: 4,
    },
    filterChipActive: {
      backgroundColor: colors.primary.main,
    },
    filterChipText: {
      fontSize: 13,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    filterChipTextActive: {
      color: colors.text.inverse,
    },
    listContent: {
      padding: 16,
      gap: 12,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border.light,
      gap: 10,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    cardUser: {
      flex: 1,
      gap: 2,
    },
    cardUserName: {
      fontSize: 15,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    cardUserPhone: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    cardMeta: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 4,
    },
    cardMetaText: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    cardRemarks: {
      backgroundColor: colors.background.default,
      borderRadius: 10,
      padding: 10,
      gap: 4,
    },
    cardRemarksLabel: {
      fontSize: 12,
      fontFamily: Fonts.medium,
      color: colors.text.secondary,
    },
    cardRemarksText: {
      fontSize: 13,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 4,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonPrimary: {
      backgroundColor: colors.primary.main,
    },
    actionButtonDanger: {
      backgroundColor: colors.status.error + '15',
      borderWidth: 1,
      borderColor: colors.status.error + '30',
    },
    actionButtonSuccess: {
      backgroundColor: colors.status.success + '15',
      borderWidth: 1,
      borderColor: colors.status.success + '30',
    },
    actionButtonText: {
      fontSize: 13,
      fontFamily: Fonts.bold,
      color: colors.text.inverse,
    },
    actionButtonTextDanger: {
      color: colors.status.error,
    },
    actionButtonTextSuccess: {
      color: colors.status.success,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 16,
      gap: 16,
    },
    pageButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.background.card,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.neutral[200],
    },
    pageButtonDisabled: {
      opacity: 0.4,
    },
    pageText: {
      fontFamily: Fonts.medium,
      fontSize: 14,
      color: colors.text.secondary,
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
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.background.overlay,
      justifyContent: 'center',
      padding: 20,
    },
    modalCard: {
      backgroundColor: colors.background.card,
      borderRadius: 20,
      padding: 20,
      gap: 12,
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: Fonts.bold,
      color: colors.text.primary,
    },
    modalInput: {
      backgroundColor: colors.background.default,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border.light,
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: colors.text.primary,
      minHeight: 80,
      textAlignVertical: 'top',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 4,
    },
  });
