import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/constants/Theme';

const createStyles = (colors: ThemeContextType['colors']) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background?.default ?? '#F9FAFB',
    },
  });

export default createStyles;
