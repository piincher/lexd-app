import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import { formatExpiry } from '../../utils/PaymentValidation';

interface CardExpiryInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  onInputFocus?: () => void;
}

export const CardExpiryInput: React.FC<CardExpiryInputProps> = ({
  value,
  onChangeText,
  error,
  onInputFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (text: string) => {
    const formatted = formatExpiry(text);
    onChangeText(formatted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date d'expiration</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.error,
      ]}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={Theme.neutral[500]}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder="MM/AA"
          keyboardType="number-pad"
          maxLength={5}
          onFocus={() => { setIsFocused(true); onInputFocus?.(); }}
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
    color: Theme.neutral[700],
    marginBottom: Theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: HAIRLINE,
    borderColor: Theme.neutral[300],
    borderRadius: RADIUS.control,
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
