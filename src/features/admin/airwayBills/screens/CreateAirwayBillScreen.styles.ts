import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.card },
  content: { padding: Theme.spacing.lg, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: '800', color: colors.neutral[900], marginBottom: Theme.spacing.lg },
  helper: { fontSize: 13, color: colors.neutral[500], marginBottom: Theme.spacing.md, lineHeight: 18 },
  input: { marginBottom: Theme.spacing.md, backgroundColor: colors.background.card },
  submitButton: { marginTop: Theme.spacing.lg, borderRadius: Theme.radius.lg },
});
