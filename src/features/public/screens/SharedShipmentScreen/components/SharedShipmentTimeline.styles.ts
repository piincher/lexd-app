import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const useSharedShipmentTimelineStyles = () => {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    card: {
      padding: Theme.spacing.lg,
      borderRadius: Theme.radius.xl,
      marginTop: Theme.spacing.lg,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 18,
      color: colors.text.primary,
      marginBottom: Theme.spacing.md,
    },
    container: {
      paddingTop: Theme.spacing.sm,
    },
    item: {
      flexDirection: 'row',
    },
    left: {
      width: 24,
      alignItems: 'center',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    line: {
      width: 2,
      flex: 1,
      backgroundColor: colors.border,
      marginVertical: 4,
    },
    content: {
      flex: 1,
      paddingLeft: Theme.spacing.md,
      paddingBottom: Theme.spacing.lg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statusText: {
      fontFamily: Fonts.bold,
      fontSize: 14,
      color: colors.text.primary,
    },
    date: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.disabled,
    },
    location: {
      fontFamily: Fonts.medium,
      fontSize: 13,
      color: colors.text.secondary,
      marginTop: 2,
    },
    description: {
      fontFamily: Fonts.regular,
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 4,
    },
    empty: {
      alignItems: 'center',
      paddingVertical: Theme.spacing.xl,
    },
    emptyText: {
      fontFamily: Fonts.regular,
      fontSize: 14,
      color: colors.text.disabled,
      marginTop: Theme.spacing.md,
    },
  });
};
