import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useOrangeMoneyFormStyles } from './OrangeMoneyForm.styles';
import { PhoneInputField } from './PhoneInputField';
import { InstructionsSection } from './InstructionsSection';
import { SupportedCountries } from './SupportedCountries';
import type { OrangeMoneyFormProps } from '../../types';

const OrangeMoneyForm: React.FC<OrangeMoneyFormProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  error,
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const styles = useOrangeMoneyFormStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orange Money Payment</Text>

      <PhoneInputField
        phoneNumber={phoneNumber}
        onPhoneNumberChange={onPhoneNumberChange}
        error={error}
        disabled={disabled}
      />

      <InstructionsSection />
      <SupportedCountries />

      {disabled && (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={styles.processingText}>
            Sending payment request to your phone...
          </Text>
        </View>
      )}
    </View>
  );
};

export default OrangeMoneyForm;
