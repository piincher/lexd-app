import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text?.primary || '#1F2937',
    marginBottom: Theme.spacing.md,
  },
  reasonButton: {
    marginBottom: Theme.spacing.md,
  },
});
