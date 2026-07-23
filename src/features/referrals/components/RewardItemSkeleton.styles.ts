import { StyleSheet } from 'react-native';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      paddingHorizontal: 16,
    },
    card: {
      width: '47%',
      flexGrow: 1,
      borderRadius: RADIUS.card,
      backgroundColor: colors.background.card,
      borderWidth: HAIRLINE,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 120,
      backgroundColor: colors.background.paper,
    },
    body: {
      padding: 10,
      gap: 8,
    },
    line: {
      height: 10,
      borderRadius: RADIUS.badge,
      backgroundColor: colors.background.paper,
    },
    lineWide: {
      height: 14,
      marginTop: 2,
    },
  });
