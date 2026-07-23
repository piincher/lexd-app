import { StyleSheet } from 'react-native';

export const packageLabelStyles = StyleSheet.create({
  card: { marginHorizontal: 16, marginTop: 12, borderRadius: 14 },
  content: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  titleWrap: { flex: 1 },
  title: { fontSize: 16, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 2, lineHeight: 17 },
  metrics: { flexDirection: 'row', gap: 8, marginVertical: 14 },
  metric: { flex: 1, padding: 10, borderRadius: 10 },
  value: { fontSize: 18, fontWeight: '900' },
  label: { fontSize: 11, marginTop: 2 },
  button: { borderRadius: 10 },
});
