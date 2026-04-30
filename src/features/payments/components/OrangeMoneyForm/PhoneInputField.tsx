import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useOrangeMoneyFormStyles } from './OrangeMoneyForm.styles';

interface PhoneInputFieldProps {
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  error?: string;
  disabled?: boolean;
}

const isValidPhone = (phone: string): boolean => {
  const orangeMoneyRegex = /^0[5-9]\d{8}$/;
  return orangeMoneyRegex.test(phone);
};

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  error,
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrangeMoneyFormStyles();
  const [isFocused, setIsFocused] = useState(false);

  const handlePhoneChange = (text: string) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.startsWith('223') && cleaned.length > 8) {
      cleaned = cleaned.substring(3);
    }
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
      cleaned = '0' + cleaned;
    }
    cleaned = cleaned.substring(0, 10);
    onPhoneNumberChange(cleaned);
  };

  const validationError = phoneNumber && !isValidPhone(phoneNumber)
    ? 'Please enter a valid Orange Money number (07XXXXXXXX)'
    : null;

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Orange Money Number</Text>

      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        (error || validationError) && styles.inputWrapperError,
        disabled && styles.inputWrapperDisabled,
      ]}>
        <View style={styles.countryCode}>
          <Text style={styles.countryCodeText}>+223</Text>
        </View>

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="07XXXXXXXX"
          placeholderTextColor={colors.text.disabled}
          keyboardType="phone-pad"
          maxLength={10}
          editable={!disabled}
          autoFocus
        />

        {phoneNumber.length === 10 && isValidPhone(phoneNumber) && (
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color={colors.status.success}
            style={styles.validIcon}
          />
        )}
      </View>

      {(error || validationError) && (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={16} color={colors.status.error} />
          <Text style={styles.errorText}>{error || validationError}</Text>
        </View>
      )}

      <Text style={styles.helperText}>
        Enter the Orange Money number you want to pay from
      </Text>
    </View>
  );
};
