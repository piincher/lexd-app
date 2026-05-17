import { StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';

export const createStatsSkeletonStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    headerSkeleton: {
      backgroundColor: colors.neutral[200],
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 28,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    kpiGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      paddingHorizontal: 20,
      marginTop: -16,
    },
    kpiCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 14,
      ...Theme.shadows.sm,
    },
    periodRow: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 8,
      marginTop: 16,
    },
    card: {
      marginHorizontal: 20,
      marginTop: 12,
      backgroundColor: colors.background.card,
      borderRadius: 16,
      padding: 18,
      ...Theme.shadows.sm,
    },
    statusRow: {
      marginTop: 12,
    },
    statusRowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    modesRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 14,
    },
    modeItem: {
      alignItems: 'center',
      gap: 2,
    },
    paymentRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 14,
    },
    paymentCard: {
      flex: 1,
      backgroundColor: colors.background.paper,
      borderRadius: 12,
      padding: 14,
    },
  });
