import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 12,
      marginBottom: 12,
      borderRadius: 16,
      backgroundColor: colors.background.card,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      overflow: 'hidden',
    },
    mainImage: {
      width: '100%',
      height: 220,
    },
    placeholder: {
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
    },
    placeholderText: {
      marginTop: 8,
      fontSize: 13,
      color: colors.text.secondary,
    },
    countBadge: {
      position: 'absolute',
      top: 12,
      right: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.background.overlay,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    countText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text.inverse,
    },
    thumbnailRow: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      gap: 8,
    },
    thumbnail: {
      width: 56,
      height: 56,
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    thumbnailActive: {
      borderColor: colors.primary.main,
    },
    thumbnailImage: {
      width: '100%',
      height: '100%',
    },
  });

export default createStyles;
