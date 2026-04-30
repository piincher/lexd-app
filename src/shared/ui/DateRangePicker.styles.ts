import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors.background.card,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
    },
    presetsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 20,
    },
    presetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.background.paper,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    presetButtonActive: {
      backgroundColor: colors.status.info,
      borderColor: colors.status.info,
    },
    presetLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text.secondary,
    },
    presetLabelActive: {
      color: colors.text.inverse,
    },
    customDateContainer: {
      marginBottom: 20,
      padding: 16,
      backgroundColor: colors.background.paper,
      borderRadius: 12,
    },
    customDateTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
    dateField: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: colors.background.card,
      borderRadius: 8,
      marginBottom: 8,
    },
    dateFieldContent: {
      flex: 1,
      marginLeft: 12,
    },
    dateFieldLabel: {
      fontSize: 11,
      color: colors.text.secondary,
    },
    dateFieldValue: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      marginTop: 2,
    },
    summaryContainer: {
      alignItems: 'center',
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginBottom: 16,
    },
    summaryLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    summaryValue: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      borderColor: colors.border,
    },
    confirmButton: {
      flex: 1,
    },
  });
