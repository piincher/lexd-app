import { StyleSheet } from 'react-native';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

type AppColors = ThemeContextType['colors'];
export const createCompactSortStyles = (colors: AppColors, isDark?: boolean) => StyleSheet.create({
  container: { paddingVertical: Theme.spacing.sm, borderBottomWidth: 1, borderBottomColor: isDark ? colors.neutral[700] : colors.neutral[200], backgroundColor: colors.background.card },
  label: { paddingHorizontal: Theme.spacing.md, marginBottom: 4, fontSize: 12, fontWeight: '700', color: colors.text.secondary },
  options: { gap: Theme.spacing.sm, paddingHorizontal: Theme.spacing.md },
  option: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Theme.spacing.md, borderRadius: Theme.radius.full, backgroundColor: colors.neutral[50], borderWidth: 1, borderColor: colors.neutral[200] },
  optionSelected: { backgroundColor: colors.primary[100], borderColor: colors.primary[300] },
  optionText: { fontSize: 13, fontWeight: '700', color: colors.text.secondary },
  optionTextSelected: { color: colors.primary[700] },
});
