import { StyleSheet } from 'react-native';
import { Fonts } from '@src/constants/Fonts';

export const useMyContainersHeaderStyles = () => {
  return StyleSheet.create({
    headerTitle: {
      fontFamily: Fonts.bold,
    },
  });
};
