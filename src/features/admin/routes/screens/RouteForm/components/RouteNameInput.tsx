import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Theme } from '@src/constants/Theme';

interface RouteNameInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

export const RouteNameInput: React.FC<RouteNameInputProps> = ({
  value,
  onChangeText,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        Nom de la route <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        placeholder="Ex: Route Chine-Mali Maritime"
        style={styles.input}
        error={!!error}
        outlineColor={Theme.neutral[200]}
        activeOutlineColor={Theme.primary[500]}
        left={<TextInput.Icon icon="map-marker" />}
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
    backgroundColor: Theme.neutral.white,
  },
});
