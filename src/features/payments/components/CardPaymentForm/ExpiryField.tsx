import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface ExpiryFieldProps {
  expiryMonth: string;
  expiryYear: string;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  onInputFocus?: () => void;
}

export const ExpiryField: React.FC<ExpiryFieldProps> = ({
  expiryMonth,
  expiryYear,
  onMonthChange,
  onYearChange,
  error,
  disabled,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.text.primary }]}>Expiry Date</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.expiryInput, { color: colors.text.primary }]}
          value={expiryMonth}
          onChangeText={onMonthChange}
          placeholder="MM"
          placeholderTextColor={colors.text.disabled}
          keyboardType="number-pad"
          maxLength={2}
          editable={!disabled}
          onFocus={onInputFocus}
        />
        <Text style={[styles.separator, { color: colors.text.secondary }]}>/</Text>
        <TextInput
          style={[styles.input, styles.expiryInput, { color: colors.text.primary }]}
          value={expiryYear}
          onChangeText={onYearChange}
          placeholder="YY"
          placeholderTextColor={colors.text.disabled}
          keyboardType="number-pad"
          maxLength={2}
          editable={!disabled}
          onFocus={onInputFocus}
        />
      </View>
      {error && <Text style={[styles.errorText, { color: colors.status.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  group: { marginBottom: 16 },
  label: { fontSize: 14, fontFamily: Fonts.medium, marginBottom: 8 },
  row: { flexDirection: 'row' },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  expiryInput: { width: 50, textAlign: 'center' },
  separator: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  errorText: { marginTop: 4, fontSize: 12, fontFamily: Fonts.regular },
});
