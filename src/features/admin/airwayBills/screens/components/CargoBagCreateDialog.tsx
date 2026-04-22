/**
 * CargoBagCreateDialog - Dialog to create a new cargo bag
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button, TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface CargoBagCreateDialogProps {
  visible: boolean;
  awbId: string;
  onSubmit: (awbId: string, notes: string) => void;
  onDismiss: () => void;
  loading?: boolean;
}

export const CargoBagCreateDialog: React.FC<CargoBagCreateDialogProps> = ({
  visible,
  awbId,
  onSubmit,
  onDismiss,
  loading = false,
}) => {
  const { colors } = useAppTheme();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (visible) {
      setNotes('');
    }
  }, [visible]);

  const handleSubmit = () => {
    onSubmit(awbId, notes.trim());
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ backgroundColor: colors.background.card }}>
        <Dialog.Title style={{ color: colors.text.primary }}>Nouveau sac de cargo</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Notes (optionnel)"
            value={notes}
            onChangeText={setNotes}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={[styles.input, { backgroundColor: colors.background.paper }]}
            textColor={colors.text.primary}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary.main}
            placeholderTextColor={colors.text.disabled}
            disabled={loading}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} disabled={loading} textColor={colors.text.secondary}>
            Annuler
          </Button>
          <Button onPress={handleSubmit} loading={loading} disabled={loading} textColor={colors.primary.main}>
            Créer
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
  },
});

export default CargoBagCreateDialog;
