import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Theme } from '@src/constants/Theme';

interface WaypointActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
}

export const WaypointActionButtons: React.FC<WaypointActionButtonsProps> = ({
  onCancel,
  onSave,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.footer}>
      <Button
        mode="outlined"
        onPress={onCancel}
        style={styles.cancelButton}
        labelStyle={styles.cancelButtonLabel}
      >
        Annuler
      </Button>
      <Button
        mode="contained"
        onPress={onSave}
        style={styles.saveButton}
        labelStyle={[styles.saveButtonLabel, { color: colors.text.inverse }]}
      >
        Enregistrer
      </Button>
    </View>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  footer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    padding: Theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
  cancelButton: {
    flex: 1,
    borderColor: colors.neutral[300],
  },
  cancelButtonLabel: {
    color: colors.neutral[600],
  },
  saveButton: {
    flex: 2,
    backgroundColor: colors.primary[600],
  },
  saveButtonLabel: {
    fontWeight: '700',
  },
});
