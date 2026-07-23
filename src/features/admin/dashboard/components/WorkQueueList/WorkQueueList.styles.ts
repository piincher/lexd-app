import { StyleSheet } from 'react-native';
import type { ThemeContextType } from '@src/constants/Theme';

export const createStyles = (colors: ThemeContextType['colors']) => StyleSheet.create({
  content: { paddingBottom: 40, backgroundColor: colors.background.default },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background.default },
});
