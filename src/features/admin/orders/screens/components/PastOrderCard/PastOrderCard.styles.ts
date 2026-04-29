import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { LOGISTICS_COLORS } from '../pastOrderConstants';

const windowWidth = Dimensions.get('window').width;

export const createStyles = () =>
  StyleSheet.create({
    card: {
      backgroundColor: LOGISTICS_COLORS.white,
      borderRadius: 16,
      marginBottom: 20,
      overflow: 'hidden',
    },
    snackbar: {
      position: 'absolute',
      top: 80,
      left: 20,
      right: 20,
      backgroundColor: LOGISTICS_COLORS.success,
      padding: 15,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    snackbarText: {
      color: LOGISTICS_COLORS.white,
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
      color: LOGISTICS_COLORS.dark,
      marginRight: 10,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: LOGISTICS_COLORS.gray[100],
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
      color: LOGISTICS_COLORS.gray[700],
    },
    trackingCode: {
      backgroundColor: '#1E90FF',
      color: '#FFFFFF',
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
      color: LOGISTICS_COLORS.gray[700],
    },
    priceText: {
      color: LOGISTICS_COLORS.success,
      fontFamily: Fonts.bold,
    },
    expandedContent: {
      marginTop: 15,
      borderTopWidth: 1,
      borderTopColor: LOGISTICS_COLORS.gray[200],
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
      backgroundColor: LOGISTICS_COLORS.primary,
      padding: 14,
      borderRadius: 12,
    },
    copyButtonText: {
      color: '#FFFFFF',
      marginLeft: 8,
      fontFamily: Fonts.bold,
    },
    expandButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: LOGISTICS_COLORS.gray[100],
      padding: 14,
      borderRadius: 12,
    },
    expandButtonText: {
      color: LOGISTICS_COLORS.primary,
      marginRight: 8,
      fontFamily: Fonts.meduim,
    },
  });
