/**
 * PhoneInput Component
 * Phone input with country selector
 */

import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CountryCode } from '../types';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  selectedCountry: CountryCode;
  onSelectCountry: () => void;
  error?: string;
  showCountryPicker: boolean;
  onClear: () => void;
  onSubmit?: () => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value, onChangeText, selectedCountry, onSelectCountry, error,
  showCountryPicker, onClear, onSubmit,
}) => {
  const { colors, isDark } = useAppTheme();
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#F9FAFB';
  const inputBorderColor = error ? '#EF4444' : isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB';

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Pressable onPress={onSelectCountry} style={[styles.countryBtn, { backgroundColor: inputBg, borderColor: inputBorderColor }]}>
          <Text style={styles.flag}>{selectedCountry.flag}</Text>
          <Text style={[styles.code, { color: colors.text.primary }]}>+{selectedCountry.code}</Text>
          <MaterialCommunityIcons name={showCountryPicker ? 'chevron-up' : 'chevron-down'} size={16} color={colors.text.secondary} />
        </Pressable>
        <View style={[styles.inputWrap, { backgroundColor: inputBg, borderColor: inputBorderColor }]}>
          <TextInput
            style={[styles.input, { color: colors.text.primary }]}
            placeholder={selectedCountry.placeholder} placeholderTextColor={colors.text.disabled}
            value={value} onChangeText={(t) => onChangeText(t.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad" maxLength={selectedCountry.inputMaxLength || selectedCountry.maxLength} returnKeyType="done" onSubmitEditing={onSubmit}
          />
          {value.length > 0 && (
            <Pressable onPress={onClear} hitSlop={8}>
              <MaterialCommunityIcons name="close-circle" size={18} color={colors.text.disabled} />
            </Pressable>
          )}
        </View>
      </View>
      {error && (
        <View style={styles.errorRow}>
          <MaterialCommunityIcons name="alert-circle-outline" size={14} color="#EF4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  inputRow: { flexDirection: 'row', gap: 10 },
  countryBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: 52, borderRadius: 14, borderWidth: 1.5, minWidth: 100 },
  flag: { fontSize: 20 },
  code: { fontSize: 15, fontFamily: Fonts.bold },
  inputWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', height: 52, borderRadius: 14, borderWidth: 1.5, paddingHorizontal: 14 },
  input: { flex: 1, fontSize: 18, fontFamily: Fonts.bold, letterSpacing: 2, paddingVertical: 0 },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  errorText: { fontSize: 12, fontFamily: Fonts.medium, color: '#EF4444' },
});

export default PhoneInput;
