import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      gap: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text.primary,
      marginBottom: 4,
    },
    ruleCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      borderRadius: RADIUS.card,
      padding: 14,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
    },
    ruleContent: {
      flex: 1,
      gap: 4,
    },
    ruleTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    ruleDescription: {
      fontSize: 13,
      color: colors.text.secondary,
      lineHeight: 18,
    },
    ruleExample: {
      fontSize: 12,
      color: colors.primary.main,
      fontWeight: '600',
      marginTop: 2,
    },
  });
