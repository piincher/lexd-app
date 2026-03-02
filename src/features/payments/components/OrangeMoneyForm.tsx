import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import type { OrangeMoneyFormProps } from '../types';

const OrangeMoneyForm: React.FC<OrangeMoneyFormProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  countryCode = 'ML',
  error,
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

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
            placeholderTextColor={COLORS.lightGray}
            keyboardType="phone-pad"
            maxLength={10}
            editable={!disabled}
            autoFocus
          />
          
          {phoneNumber.length === 10 && isValidPhone(phoneNumber) && (
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color={COLORS.green}
              style={styles.validIcon}
            />
          )}
        </View>
        
        {(error || validationError) && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={16}
              color={COLORS.redShade}
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
          color={COLORS.blue}
        />
        <Text style={styles.instructionsTitle}>How to Pay</Text>
        <MaterialCommunityIcons
          name={showInstructions ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.grey}
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
              color={COLORS.green}
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
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={styles.processingText}>
            Sending payment request to your phone...
          </Text>
        </View>
      )}
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: COLORS.black,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.black,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    overflow: 'hidden',
  },
  inputWrapperFocused: {
    borderColor: COLORS.blue,
  },
  inputWrapperError: {
    borderColor: COLORS.redShade,
  },
  inputWrapperDisabled: {
    backgroundColor: COLORS.lightGray + '50',
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.lightGray + '30',
    borderRightWidth: 1,
    borderRightColor: COLORS.lightGray,
  },
  countryCodeText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.black,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: COLORS.black,
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
    color: COLORS.redShade,
  },
  helperText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: showInstructions => showInstructions ? 0 : 16,
  },
  instructionsTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: COLORS.black,
  },
  instructionsContent: {
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: COLORS.white,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.black,
    lineHeight: 20,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green + '10',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  noteText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.green,
  },
  supportedContainer: {
    marginTop: 8,
  },
  supportedTitle: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
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
    backgroundColor: COLORS.lightGray + '30',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countryTagCode: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: COLORS.blue,
    marginRight: 4,
  },
  countryTagName: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
  processingContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: COLORS.blue + '08',
    borderRadius: 12,
    marginTop: 16,
  },
  processingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.blue,
    textAlign: 'center',
  },
});

export default OrangeMoneyForm;
