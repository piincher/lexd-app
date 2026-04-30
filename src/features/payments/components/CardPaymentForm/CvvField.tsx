import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';

interface CvvFieldProps {
  cvv: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  cardBrand: string;
  showCvv: boolean;
  onToggleShowCvv: () => void;
}

export const CvvField: React.FC<CvvFieldProps> = ({
  cvv,
  onChangeText,
  onBlur,
  error,
  touched,
  disabled,
  cardBrand,
  showCvv,
  onToggleShowCvv,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.text.primary }]}>CVV</Text>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.background.default, borderColor: colors.neutral[200] },
          error && touched && { borderColor: colors.status.error },
        ]}
      >
        <TextInput
          style={[styles.input, styles.cvvInput, { color: colors.text.primary }]}
          value={cvv}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={cardBrand === 'amex' ? '1234' : '123'}
          placeholderTextColor={colors.text.disabled}
          keyboardType="number-pad"
          maxLength={cardBrand === 'amex' ? 4 : 3}
          secureTextEntry={!showCvv}
          editable={!disabled}
        />
        <TouchableOpacity onPress={onToggleShowCvv}>
          <MaterialCommunityIcons
            name={showCvv ? 'eye-off' : 'eye'}
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
      {error && touched && (
        <Text style={[styles.errorText, { color: colors.status.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  group: { marginBottom: 16 },
  label: { fontSize: 14, fontFamily: Fonts.medium, marginBottom: 8 },
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
  cvvInput: { textAlign: 'center' },
  errorText: { marginTop: 4, fontSize: 12, fontFamily: Fonts.regular },
});
