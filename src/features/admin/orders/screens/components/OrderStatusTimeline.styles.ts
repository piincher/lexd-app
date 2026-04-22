import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 12,
      marginBottom: 12,
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      fontFamily: Fonts.semiBold,
    },
    timeline: {
      paddingLeft: 8,
    },
    timelineItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      position: 'relative',
    },
    connector: {
      position: 'absolute',
      left: 11,
      top: -12,
      width: 2,
      height: 24,
      backgroundColor: colors.border,
    },
    connectorCompleted: {
      backgroundColor: colors.status.success,
    },
    statusCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      zIndex: 1,
      borderWidth: 2,
      borderColor: colors.border,
    },
    statusCircleCompleted: {
      backgroundColor: colors.status.success,
      borderColor: colors.status.success,
    },
    statusCircleCurrent: {
      backgroundColor: colors.primary.main,
      borderColor: colors.primary.main,
      transform: [{ scale: 1.1 }],
    },
    statusContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
    },
    statusLabelCompleted: {
      color: colors.status.success,
      fontWeight: '600',
    },
    statusLabelCurrent: {
      color: colors.primary.main,
      fontWeight: '700',
      fontFamily: Fonts.bold,
    },
    currentBadge: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.text.inverse,
      backgroundColor: colors.primary.main,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      fontFamily: Fonts.semiBold,
    },
    locationSection: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    locationLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: Fonts.medium,
      marginBottom: 8,
    },
    locationCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.background.paper,
      padding: 12,
      borderRadius: 10,
    },
    locationText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.primary.main,
      fontFamily: Fonts.semiBold,
    },
  });

export default createStyles;
