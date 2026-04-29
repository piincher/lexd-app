import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: { borderRadius: Theme.radius.xl, marginBottom: Theme.spacing.md },
  routeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  airport: { alignItems: 'center', flex: 1 },
  airportCode: { fontSize: 24, fontWeight: '800', color: Theme.neutral[900] },
  airportLabel: { fontSize: 12, color: Theme.neutral[400], marginTop: 2 },
  routeLine: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Theme.spacing.md },
});
