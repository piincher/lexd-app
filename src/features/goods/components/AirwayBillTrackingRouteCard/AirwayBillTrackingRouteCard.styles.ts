import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
  routeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  airport: { alignItems: 'center', flex: 1 },
  airportCode: { fontSize: 24, fontWeight: '800', color: colors.neutral[900] },
  airportLabel: { fontSize: 12, color: colors.neutral[400], marginTop: 2 },
  routeLine: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Theme.spacing.md },
});
