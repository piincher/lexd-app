import { StyleSheet } from 'react-native';

export const scannerStyles = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 56, paddingBottom: 14 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 22, fontWeight: '900' },
  subtitle: { marginTop: 4, fontSize: 13, fontWeight: '600' },
  close: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 14 },
  permission: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  cameraWrap: { flex: 1, marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  camera: { ...StyleSheet.absoluteFillObject },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  target: { width: 230, height: 230, borderWidth: 3, borderRadius: 18 },
  torch: { position: 'absolute', right: 14, top: 14, borderRadius: 24 },
  feedback: { position: 'absolute', left: 14, right: 14, bottom: 14, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10 },
  feedbackText: { flex: 1, fontSize: 13, fontWeight: '700' },
  footer: { padding: 16, paddingBottom: 28 },
  manualRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  manualInput: { flex: 1, height: 48 },
  manualButton: { minWidth: 52 },
  done: { borderRadius: 9 },
});
