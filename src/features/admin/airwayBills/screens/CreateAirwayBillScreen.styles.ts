import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background.card },
  content: { padding: Theme.spacing.lg, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: '800', color: Theme.neutral[900], marginBottom: Theme.spacing.lg },
  helper: { fontSize: 13, color: Theme.neutral[500], marginBottom: Theme.spacing.md, lineHeight: 18 },
  input: { marginBottom: Theme.spacing.md, backgroundColor: Theme.colors.background.card },
  submitButton: { marginTop: Theme.spacing.lg, borderRadius: Theme.radius.lg },
});
