import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      gap: 0,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 12,
    },
    stepRow: {
      flexDirection: 'row',
      gap: 12,
    },
    leftColumn: {
      alignItems: 'center',
      width: 32,
    },
    iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    connector: {
      width: 2,
      flex: 1,
      marginVertical: 4,
    },
    content: {
      flex: 1,
      paddingTop: 6,
      paddingBottom: 16,
    },
    stepLabel: {
      fontSize: 14,
      fontWeight: '600',
    },
    stepSublabel: {
      fontSize: 12,
      marginTop: 2,
    },
  });
