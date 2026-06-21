import { StyleSheet, Dimensions } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type Colors = typeof lightTheme.colors;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const createStyles = (colors: Colors, backgroundColor: string, textColor: string) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: backgroundColor || colors.background.paper,
    },
    safeArea: {
      flex: 1,
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slide: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
    imageContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT * 0.55,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 32,
      paddingBottom: 24,
      justifyContent: 'space-between',
    },
    textContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 12,
      color: textColor || colors.text.primary,
    },
    body: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      color: textColor || colors.text.primary,
      opacity: 0.9,
    },
    ctaContainer: {
      width: '100%',
    },
    primaryButton: {
      backgroundColor: colors.primary.main,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 12,
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      paddingVertical: 12,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: textColor || colors.text.primary,
      fontSize: 14,
      opacity: 0.8,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
    paginationActive: {
      backgroundColor: textColor || colors.text.primary,
      width: 24,
    },
    paginationInactive: {
      backgroundColor: textColor || colors.text.primary,
      opacity: 0.3,
    },
  });
