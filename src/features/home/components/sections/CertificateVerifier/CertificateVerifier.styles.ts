import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginTop: 32,
      paddingHorizontal: 16,
    },
    pressed: {
      opacity: 0.92,
      transform: [{ scale: 0.97 }],
    },
    verifyCard: {
      borderRadius: 20,
      padding: 18,
      ...Theme.shadows.md,
    },
    verifyHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    shieldCircle: {
      width: 44,
      height: 44,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verifyHeaderText: {
      flex: 1,
    },
    verifyTitle: {
      fontFamily: Fonts.bold,
      fontSize: 15,
    },
    verifyHint: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      marginTop: 1,
    },
    inputRow: {
      flexDirection: 'row',
      gap: 10,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderRadius: 14,
      paddingHorizontal: 14,
      height: 50,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontFamily: Fonts.meduim,
      fontSize: 14,
      letterSpacing: 1,
      paddingVertical: 0,
    },
    verifyButton: {
      borderRadius: 14,
      overflow: 'hidden',
    },
    verifyButtonDisabled: {
      opacity: 0.6,
    },
    verifyButtonGradient: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
    },
  });
