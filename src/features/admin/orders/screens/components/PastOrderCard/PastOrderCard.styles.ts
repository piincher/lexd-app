import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

const windowWidth = Dimensions.get('window').width;

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      marginBottom: 20,
      overflow: 'hidden',
    },
    snackbar: {
      position: 'absolute',
      top: 80,
      left: 20,
      right: 20,
      backgroundColor: colors.status.success,
      padding: 15,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    snackbarText: {
      color: colors.text.inverse,
      marginLeft: 10,
      fontFamily: Fonts.medium,
    },
    imageContainer: {
      width: windowWidth,
    },
    image: {
      width: windowWidth,
      height: 250,
    },
    cardContent: {
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clientName: {
      fontFamily: Fonts.bold,
      color: colors.text.primary,
      marginRight: 10,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
    },
    statusText: {
      fontFamily: Fonts.meduim,
      color: colors.text.secondary,
    },
    trackingCode: {
      backgroundColor: colors.status.info,
      color: colors.text.inverse,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 8,
      fontFamily: Fonts.bold,
    },
    detailsContainer: {
      marginBottom: 20,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    detailText: {
      marginLeft: 10,
      fontFamily: Fonts.regular,
      color: colors.text.secondary,
    },
    priceText: {
      color: colors.status.success,
      fontFamily: Fonts.bold,
    },
    expandedContent: {
      marginTop: 15,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 15,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    copyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary.main,
      padding: 14,
      borderRadius: 12,
    },
    copyButtonText: {
      color: colors.text.inverse,
      marginLeft: 8,
      fontFamily: Fonts.bold,
    },
    expandButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
      padding: 14,
      borderRadius: 12,
    },
    expandButtonText: {
      color: colors.primary.main,
      marginRight: 8,
      fontFamily: Fonts.meduim,
    },
  });
