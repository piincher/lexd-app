/* Hallmark · pre-emit critique: P5 H4 E4 S5 R4 V4 · genre: modern-minimal · macrostructure: Workbench · design-system: app theme · designed-as-app */
import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import type { lightTheme } from '@src/constants/Theme';

type AppColors = typeof lightTheme.colors;

export const createStyles = (colors: AppColors, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.card,
      borderRadius: 8,
      marginHorizontal: 12,
      marginVertical: 6,
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 1,
      overflow: 'hidden',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
    },
    statusBar: {
      width: 4,
    },
    content: {
      flex: 1,
      padding: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    clientSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    avatar: {
      marginRight: 10,
    },
    avatarLabel: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
    },
    clientInfo: {
      flex: 1,
    },
    clientName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
      marginBottom: 2,
    },
    orderMeta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderCode: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      letterSpacing: 0.5,
    },
    priorityBadge: {
      backgroundColor: colors.status.error,
      borderRadius: 8,
      padding: 2,
      marginLeft: 6,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 6,
      gap: 4,
    },
    statusText: {
      fontSize: 11,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
    },
    financePanel: {
      padding: 10,
      borderRadius: 6,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 10,
    },
    financeHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    financeTitle: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.semiBold,
      textTransform: 'uppercase',
    },
    paymentPill: {
      minHeight: 28,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      borderRadius: 6,
      gap: 4,
    },
    paymentPillText: {
      fontSize: 11,
      fontFamily: Fonts.semiBold,
    },
    financeGrid: {
      flexDirection: 'row',
      gap: 8,
    },
    financeMetric: {
      flex: 1,
      minWidth: 0,
    },
    financeLabel: {
      fontSize: 10,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      marginBottom: 2,
    },
    financeValue: {
      fontSize: 12,
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
    },
    shippingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      gap: 10,
    },
    shippingMode: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      gap: 4,
    },
    shippingText: {
      fontSize: 11,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
    },
    routeInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    routeText: {
      fontSize: 11,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    containerMetaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 10,
    },
    containerMetaPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      maxWidth: '100%',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: colors.border,
    },
    containerMetaText: {
      fontSize: 11,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    manualMetaPill: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: colors.status.warning + '15',
    },
    manualMetaText: {
      fontSize: 10,
      color: colors.status.warning,
      fontFamily: Fonts.semiBold,
      textTransform: 'uppercase',
    },
    detailsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.background.paper,
      borderRadius: 6,
      padding: 10,
      gap: 8,
    },
    detailItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      minWidth: 0,
    },
    detailText: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.regular,
    },
    progressSection: {
      marginTop: 10,
    },
    progressTrack: {
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
      marginBottom: 6,
    },
    progressFill: {
      height: '100%',
      borderRadius: 2,
    },
    progressText: {
      fontSize: 10,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    checkboxColumn: {
      width: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxSelected: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
    },
    selectedContainer: {
      backgroundColor: colors.background.paper,
    },
  });
