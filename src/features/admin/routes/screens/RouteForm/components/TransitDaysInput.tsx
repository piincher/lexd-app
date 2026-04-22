import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface TransitDaysInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

export const TransitDaysInput: React.FC<TransitDaysInputProps> = ({
  value,
  onChangeText,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        Délai de transit estimé (jours) <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder="Ex: 45"
        style={styles.input}
        error={!!error}
        outlineColor={Theme.neutral[200]}
        activeOutlineColor={Theme.primary[500]}
        left={<TextInput.Icon icon="clock-outline" />}
        keyboardType="numeric"
        maxLength={3}
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Theme.spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.sm,
  },
  required: {
    color: Theme.status.error,
  },
  input: {
    backgroundColor: Theme.colors.background.card,
  },
});
