import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface CardHolderFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

export const CardHolderField: React.FC<CardHolderFieldProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  disabled,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.text.primary }]}>Card Holder Name</Text>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.background.default, borderColor: colors.neutral[200] },
          error && touched && { borderColor: colors.status.error },
        ]}
      >
        <MaterialCommunityIcons name="account" size={20} color={colors.text.secondary} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder="JOHN DOE"
          placeholderTextColor={colors.text.disabled}
          autoCapitalize="characters"
          editable={!disabled}
        />
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
