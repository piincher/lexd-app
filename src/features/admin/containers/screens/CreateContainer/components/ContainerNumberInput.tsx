import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface ContainerNumberInputProps {
  value: string;
  error?: string;
  onChangeText: (text: string) => void;
  onInputFocus?: () => void;
}

export const ContainerNumberInput: React.FC<ContainerNumberInputProps> = ({
  value,
  error,
  onChangeText,
  onInputFocus,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Container Number</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter container number"
        mode="outlined"
        style={styles.input}
        error={!!error}
        autoCapitalize="characters"
        onFocus={onInputFocus}
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.neutral[800],
    marginBottom: Theme.spacing.xs,
  },
  input: {
    backgroundColor: Theme.colors.background.card,
  },
});
