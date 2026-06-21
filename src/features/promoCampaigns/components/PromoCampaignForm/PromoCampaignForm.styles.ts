import { StyleSheet } from 'react-native';
import { lightTheme } from '@src/constants/Theme';

type Colors = typeof lightTheme.colors;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 6,
      marginTop: 12,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text.primary,
      backgroundColor: colors.background.card,
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    flex: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginTop: 24,
      marginBottom: 8,
    },
    slideCard: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    removeText: {
      color: colors.status.error,
      fontSize: 14,
      marginTop: 8,
    },
    addButton: {
      borderWidth: 1,
      borderColor: colors.primary.main,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 24,
    },
    addButtonText: {
      color: colors.primary.main,
      fontWeight: '600',
      fontSize: 15,
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 12,
    },
    thumbnail: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    pickImageButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderStyle: 'dashed',
      borderRadius: 8,
      paddingVertical: 32,
      alignItems: 'center',
      marginBottom: 12,
      backgroundColor: colors.background.paper,
    },
    pickImageText: {
      color: colors.primary.main,
      fontWeight: '600',
      fontSize: 15,
    },
    changeImageButton: {
      marginTop: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.primary.main,
    },
    changeImageText: {
      color: colors.text.inverse,
      fontWeight: '600',
      fontSize: 14,
    },
    bottomSpacer: {
      height: 40,
    },
  });
