import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface CardHolderInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

export const CardHolderInput: React.FC<CardHolderInputProps> = ({
  value,
  onChangeText,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom du titulaire</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.error,
      ]}>
        <Ionicons
          name="person-outline"
          size={20}
          color={Theme.neutral.grey500}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="JEAN DUPONT"
          autoCapitalize="characters"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    color: Theme.neutral.grey700,
    marginBottom: Theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.neutral.grey300,
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.neutral.white,
  },
  focused: {
    borderColor: Theme.colors.primary.main,
  },
  error: {
    borderColor: Theme.colors.error.main,
  },
  icon: {
    marginRight: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Theme.neutral.grey900,
  },
  errorText: {
    fontSize: 12,
    color: Theme.colors.error.main,
    marginTop: Theme.spacing.xs,
  },
});
