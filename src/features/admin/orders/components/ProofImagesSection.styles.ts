import { StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const createProofImagesSectionStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      elevation: 2,
      backgroundColor: colors.background.card,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      fontFamily: Fonts.semiBold,
      marginLeft: 8,
      color: colors.text.primary,
    },
    proofGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    proofImageContainer: {
      width: (SCREEN_WIDTH - 80) / 3,
      height: (SCREEN_WIDTH - 80) / 3,
      borderRadius: 8,
      overflow: 'hidden',
      position: 'relative',
    },
    proofImage: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
    proofOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.background.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: colors.background.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    modalContent: {
      width: SCREEN_WIDTH,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenImage: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 16,
      zIndex: 10,
      backgroundColor: colors.background.overlay,
    },
  });
