/**
 * FormInput - Reusable form input component
 * Presentational component with consistent styling
 * Improved with better padding, borders, and placeholder styling
 */

import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'decimal-pad' | 'number-pad' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  suffix?: string;
  disabled?: boolean;
  onInputFocus?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  autoCapitalize = 'none',
  suffix,
  disabled = false,
  onInputFocus,
}) => {
  const { colors, isDark } = useAppTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginBottom: 4,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      marginBottom: 6,
      color: colors.text.secondary,
    },
    input: {
      backgroundColor: colors.background.card,
      fontSize: 15,
    },
    inputContent: {
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    inputWithSuffix: {
      paddingRight: 8,
    },
    multilineInput: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    inputDisabled: {
      backgroundColor: colors.background.paper,
    },
    outline: {
      borderRadius: 8,
      borderWidth: 1,
    },
    suffixText: {
      color: colors.text.secondary,
      fontSize: 13,
      fontWeight: '500',
    },
    errorText: {
      fontSize: 12,
      marginTop: 2,
    },
  }), [colors, isDark]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        error={!!error}
        style={[
          styles.input,
          multiline && styles.multilineInput,
          disabled && styles.inputDisabled,
        ]}
        contentStyle={[
          styles.inputContent,
          suffix && styles.inputWithSuffix,
        ]}
        right={suffix ? <TextInput.Affix text={` ${suffix}`} textStyle={styles.suffixText} /> : undefined}
        mode="outlined"
        outlineColor={colors.border}
        activeOutlineColor={colors.status.success}
        outlineStyle={styles.outline}
        placeholderTextColor={colors.text.disabled}
        onFocus={onInputFocus}
        dense
      />
      {error && (
        <HelperText type="error" visible={!!error} style={styles.errorText}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default FormInput;
