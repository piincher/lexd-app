import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  header: { alignItems: 'center', marginBottom: Theme.spacing.lg },
  awbNumber: { fontSize: 22, fontWeight: '800', color: colors.neutral[900], marginTop: Theme.spacing.sm },
  flightInfo: { fontSize: 14, color: colors.neutral[500], marginTop: 4 },
});
