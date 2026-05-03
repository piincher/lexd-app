import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { WaypointStatus } from '../../../types/waypoints';

interface DelayNotesInputProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  selectedStatus: WaypointStatus;
  isLoading?: boolean;
  onFocus?: () => void;
}

export const DelayNotesInput: React.FC<DelayNotesInputProps> = ({
  notes,
  onNotesChange,
  selectedStatus,
  isLoading = false,
  onFocus,
}) => {
  const notesRequired = selectedStatus === 'DELAYED' || selectedStatus === 'CANCELLED';
  const hasError = notesRequired && notes.trim().length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {notesRequired ? 'Notes (obligatoire)' : 'Notes (optionnel)'}
      </Text>
      <TextInput
        style={[styles.input, hasError && styles.inputError]}
        value={notes}
        onChangeText={onNotesChange}
        placeholder="Ajouter des notes sur ce changement de statut..."
        placeholderTextColor={Theme.neutral[400]}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        editable={!isLoading}
        onFocus={onFocus}
        accessibilityLabel="Notes sur le changement de statut"
        accessibilityHint={notesRequired ? 'Les notes sont requises pour ce statut' : undefined}
      />
      {hasError && (
        <Text style={styles.errorText}>Les notes sont requises pour ce statut</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  input: {
    backgroundColor: Theme.neutral[50],
    borderWidth: 1,
    borderColor: Theme.neutral[200],
    borderRadius: Theme.radius.lg,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    fontSize: 15,
    color: Theme.neutral[800],
    minHeight: 100,
    paddingTop: Theme.spacing.md,
  },
  inputError: {
    borderColor: Theme.status.error,
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: 12,
    color: Theme.status.error,
    marginTop: Theme.spacing.xs,
  },
});
