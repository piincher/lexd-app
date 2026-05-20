import React, { useMemo } from 'react';
import { Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './RewardSettingsField.styles';

interface RewardSettingsFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  helpText?: string;
  error?: string | null;
  keyboardType?: 'decimal-pad' | 'number-pad';
  suffix?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  onInputFocus?: () => void;
}

export const RewardSettingsField: React.FC<RewardSettingsFieldProps> = ({
  label,
  value,
  onChangeText,
  icon,
  helpText,
  error,
  keyboardType = 'decimal-pad',
  suffix,
  disabled = false,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const hasError = !!error;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <MaterialCommunityIcons name={icon} size={16} color={colors.primary.main} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={[styles.inputRow, hasError && styles.inputRowError, disabled && styles.inputRowDisabled]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          editable={!disabled}
          placeholderTextColor={colors.text.disabled}
          selectTextOnFocus
          onFocus={onInputFocus}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
      {hasError ? (
        <View style={styles.errorRow}>
          <MaterialCommunityIcons name="alert-circle" size={12} color={colors.status.error} />
          <Text style={[styles.errorText, { color: colors.status.error }]}>{error}</Text>
        </View>
      ) : helpText ? (
        <Text style={styles.helpText}>{helpText}</Text>
      ) : null}
    </View>
  );
};
