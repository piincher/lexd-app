import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: Theme.spacing.lg },
  awbNumber: { fontSize: 22, fontWeight: '800', color: Theme.neutral[900], marginTop: Theme.spacing.sm },
  flightInfo: { fontSize: 14, color: Theme.neutral[500], marginTop: 4 },
});
