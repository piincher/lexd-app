import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: colors.background.card,
    },
    cardContent: {
      padding: 16,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 16,
      color: colors.text.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    photosContainer: {
      gap: 12,
      paddingBottom: 16,
    },
    photoWrapper: {
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    photo: {
      width: 160,
      height: 120,
      borderRadius: 12,
    },
    removeButton: {
      position: 'absolute',
      top: 6,
      right: 6,
      margin: 0,
    },
    uploadContainer: {
      alignItems: 'center',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    button: {
      flex: 1,
      marginHorizontal: 8,
      borderColor: colors.status.success,
      borderRadius: 8,
      borderWidth: 1.5,
    },
    buttonContent: {
      paddingVertical: 8,
    },
    hintText: {
      fontSize: 12,
      color: colors.text.disabled,
      marginTop: 12,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });
