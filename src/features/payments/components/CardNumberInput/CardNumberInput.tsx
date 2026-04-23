import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { formatCardNumber, detectCardType } from '../../utils/PaymentValidation';

interface CardNumberInputProps {
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

const CARD_ICONS: Record<string, string> = {
  visa: 'card',
  mastercard: 'card',
  amex: 'card',
  discover: 'card',
};

export const CardNumberInput: React.FC<CardNumberInputProps> = ({
  value,
  onChangeText,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const cardType = detectCardType(value);

  const handleChange = (text: string) => {
    const formatted = formatCardNumber(text);
    onChangeText(formatted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Numéro de carte</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        error && styles.error,
      ]}>
        <Ionicons
          name={cardType ? (CARD_ICONS[cardType] as any) : 'card-outline'}
          size={20}
          color={Theme.neutral[500]}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange}
          placeholder="1234 5678 9012 3456"
          keyboardType="number-pad"
          maxLength={19}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {cardType && (
          <View style={styles.cardTypeBadge}>
            <Text style={styles.cardTypeText}>{cardType.toUpperCase()}</Text>
          </View>
        )}
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
  cardTypeBadge: {
    backgroundColor: Theme.colors.primary.light + '30',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: 4,
  },
  cardTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Theme.colors.primary.main,
  },
  errorText: {
    fontSize: 12,
    color: Theme.colors.error.main,
    marginTop: Theme.spacing.xs,
  },
});
