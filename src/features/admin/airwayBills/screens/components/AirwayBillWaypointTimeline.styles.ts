import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 14 },
  title: { fontSize: 16, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 3 },
  empty: { fontSize: 13, lineHeight: 19, marginTop: 8 },
  progressTrack: { height: 6, borderRadius: 99, backgroundColor: Theme.colors.neutral[200], overflow: 'hidden', marginBottom: 14 },
  progressFill: { height: '100%', borderRadius: 99 },
  item: { flexDirection: 'row', position: 'relative', paddingBottom: 16 },
  iconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  itemBody: { flex: 1, marginLeft: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  location: { fontSize: 14, fontWeight: '800', flex: 1 },
  status: { fontSize: 11, fontWeight: '800' },
  description: { fontSize: 12, lineHeight: 17, marginTop: 3 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  meta: { fontSize: 11, fontWeight: '600' },
  current: { fontSize: 11, fontWeight: '800' },
  connector: { position: 'absolute', left: 17, top: 36, bottom: 0, width: 2 },
});
