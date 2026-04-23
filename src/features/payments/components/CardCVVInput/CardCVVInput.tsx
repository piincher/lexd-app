import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';

interface CardCVVInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

export const CardCVVInput: React.FC<CardCVVInputProps> = ({
  value,
  onChangeText,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showCVV, setShowCVV] = useState(false);

  const handleChange = (text: string) => {
    const clean = text.replace(/\D/g, '').slice(0, 4);
    onChangeText(clean);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CVV</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.error,
      ]}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={Theme.neutral[500]}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder="123"
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry={!showCVV}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={() => setShowCVV(!showCVV)}>
          <Ionicons
            name={showCVV ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={Theme.neutral[500]}
          />
        </TouchableOpacity>
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
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.neutral[300],
    borderRadius: 8,
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.colors.background.card,
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
    color: Theme.neutral[900],
  },
  errorText: {
    fontSize: 12,
    color: Theme.colors.error.main,
    marginTop: Theme.spacing.xs,
  },
});
