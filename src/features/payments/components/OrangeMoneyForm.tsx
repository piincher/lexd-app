import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { OrangeMoneyFormProps } from '../types';

const OrangeMoneyForm: React.FC<OrangeMoneyFormProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  countryCode = 'ML',
  error,
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
        },
        title: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 20,
        },
        inputContainer: {
          marginBottom: 20,
        },
        label: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
          marginBottom: 8,
        },
        inputWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.background.default,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.neutral[200],
          overflow: 'hidden',
        },
        inputWrapperFocused: {
          borderColor: colors.primary.main,
        },
        inputWrapperError: {
          borderColor: colors.status.error,
        },
        inputWrapperDisabled: {
          backgroundColor: colors.neutral[200] + '50',
        },
        countryCode: {
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: colors.neutral[200] + '30',
          borderRightWidth: 1,
          borderRightColor: colors.neutral[200],
        },
        countryCodeText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        input: {
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 18,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        validIcon: {
          marginRight: 12,
        },
        errorContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
        },
        errorText: {
          marginLeft: 6,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.error,
        },
        helperText: {
          marginTop: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        instructionsHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          marginBottom: 0,
        },
        instructionsTitle: {
          flex: 1,
          marginLeft: 8,
          fontSize: 16,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        instructionsContent: {
          backgroundColor: colors.background.default,
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        },
        stepContainer: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 12,
        },
        stepNumber: {
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.primary.main,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        },
        stepNumberText: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        stepText: {
          flex: 1,
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.primary,
          lineHeight: 20,
        },
        noteContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.status.success + '10',
          borderRadius: 8,
          padding: 12,
          marginTop: 8,
        },
        noteText: {
          flex: 1,
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.success,
        },
        supportedContainer: {
          marginTop: 8,
        },
        supportedTitle: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
          marginBottom: 12,
        },
        countryTags: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        countryTag: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 6,
        },
        countryTagCode: {
          fontSize: 12,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
          marginRight: 4,
        },
        countryTagName: {
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        processingContainer: {
          alignItems: 'center',
          padding: 24,
          backgroundColor: colors.primary.main + '08',
          borderRadius: 12,
          marginTop: 16,
        },
        processingText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.primary.main,
          textAlign: 'center',
        },
      }),
    [colors]
  );

  // Format phone number as user types
  const handlePhoneChange = (text: string) => {
    // Remove non-numeric characters
    let cleaned = text.replace(/\D/g, '');
    
    // Remove country code if user types it
    if (cleaned.startsWith('223') && cleaned.length > 8) {
      cleaned = cleaned.substring(3);
    }
    
    // Ensure starts with 0
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
      cleaned = '0' + cleaned;
    }
    
    // Limit to 10 digits
    cleaned = cleaned.substring(0, 10);
    
    onPhoneNumberChange(cleaned);
  };

  // Validate phone number format
  const isValidPhone = (phone: string): boolean => {
    // Orange Money format: 07, 08, or 09 followed by 8 digits
    const orangeMoneyRegex = /^0[5-9]\d{8}$/;
    return orangeMoneyRegex.test(phone);
  };

  const displayPhone = phoneNumber;
  const validationError = phoneNumber && !isValidPhone(phoneNumber)
    ? 'Please enter a valid Orange Money number (07XXXXXXXX)'
    : null;

  /**
   * Instruction Step Component
   */
  interface InstructionStepProps {
    number: number;
    text: string;
  }

  const InstructionStep: React.FC<InstructionStepProps> = ({ number, text }) => (
    <View style={styles.stepContainer}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );

  /**
   * Country Tag Component
   */
  interface CountryTagProps {
    code: string;
    name: string;
  }

  const CountryTag: React.FC<CountryTagProps> = ({ code, name }) => (
    <View style={styles.countryTag}>
      <Text style={styles.countryTagCode}>{code}</Text>
      <Text style={styles.countryTagName}>{name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orange Money Payment</Text>
      
      {/* Phone Number Input */}
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
            value={displayPhone}
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
            <MaterialCommunityIcons
              name="alert-circle"
              size={16}
              color={colors.status.error}
            />
            <Text style={styles.errorText}>
              {error || validationError}
            </Text>
          </View>
        )}
        
        <Text style={styles.helperText}>
          Enter the Orange Money number you want to pay from
        </Text>
      </View>

      {/* Instructions Accordion */}
      <TouchableOpacity
        style={styles.instructionsHeader}
        onPress={() => setShowInstructions(!showInstructions)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name="information"
          size={20}
          color={colors.primary.main}
        />
        <Text style={styles.instructionsTitle}>How to Pay</Text>
        <MaterialCommunityIcons
          name={showInstructions ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text.secondary}
        />
      </TouchableOpacity>

      {showInstructions && (
        <View style={styles.instructionsContent}>
          <InstructionStep
            number={1}
            text="Enter your Orange Money phone number above"
          />
          <InstructionStep
            number={2}
            text="Tap 'Continue' to initiate the payment"
          />
          <InstructionStep
            number={3}
            text="You will receive a USSD prompt on your phone"
          />
          <InstructionStep
            number={4}
            text="Enter your Orange Money PIN (****) to confirm"
          />
          <InstructionStep
            number={5}
            text="Wait for the confirmation message"
          />
          
          <View style={styles.noteContainer}>
            <MaterialCommunityIcons
              name="shield-check"
              size={16}
              color={colors.status.success}
            />
            <Text style={styles.noteText}>
              Your payment is secure and encrypted. We never store your PIN.
            </Text>
          </View>
        </View>
      )}

      {/* Supported Countries */}
      <View style={styles.supportedContainer}>
        <Text style={styles.supportedTitle}>Supported Countries</Text>
        <View style={styles.countryTags}>
          <CountryTag code="ML" name="Mali" />
          <CountryTag code="SN" name="Senegal" />
          <CountryTag code="CI" name="Ivory Coast" />
        </View>
      </View>

      {/* Processing Indicator */}
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
