import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, size: 'sm' | 'md') =>
  StyleSheet.create({
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: size === 'sm' ? 3 : 5,
      paddingHorizontal: size === 'sm' ? 6 : 10,
      paddingVertical: size === 'sm' ? 2 : 5,
      borderRadius: size === 'sm' ? 4 : 6,
    },
    label: {
      fontSize: size === 'sm' ? 11 : 13,
      fontWeight: '700',
    },
  });
