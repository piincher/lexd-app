import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface CardNumberInputFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  onInputFocus?: () => void;
}

export const CardNumberInputField: React.FC<CardNumberInputFieldProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  disabled,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.text.primary }]}>Card Number</Text>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.background.default, borderColor: colors.neutral[200] },
          error && touched && { borderColor: colors.status.error },
        ]}
      >
        <MaterialCommunityIcons name="credit-card" size={20} color={colors.text.secondary} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor={colors.text.disabled}
          keyboardType="number-pad"
          maxLength={19}
          editable={!disabled}
          onFocus={onInputFocus}
        />
        {value.length > 0 && !error && (
          <MaterialCommunityIcons name="check-circle" size={20} color={colors.status.success} />
        )}
      </View>
      {error && touched && (
        <Text style={[styles.errorText, { color: colors.status.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
});
