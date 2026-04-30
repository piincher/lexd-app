import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useOrangeMoneyFormStyles } from './OrangeMoneyForm.styles';

const STEPS = [
  'Enter your Orange Money phone number above',
  "Tap 'Continue' to initiate the payment",
  'You will receive a USSD prompt on your phone',
  'Enter your Orange Money PIN (****) to confirm',
  'Wait for the confirmation message',
];

export const InstructionsSection: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useOrangeMoneyFormStyles();
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <TouchableOpacity
        style={styles.instructionsHeader}
        onPress={() => setShowInstructions(!showInstructions)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="information" size={20} color={colors.primary.main} />
        <Text style={styles.instructionsTitle}>How to Pay</Text>
        <MaterialCommunityIcons
          name={showInstructions ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text.secondary}
        />
      </TouchableOpacity>

      {showInstructions && (
        <View style={styles.instructionsContent}>
          {STEPS.map((text, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{text}</Text>
            </View>
          ))}

          <View style={styles.noteContainer}>
            <MaterialCommunityIcons name="shield-check" size={16} color={colors.status.success} />
            <Text style={styles.noteText}>
              Your payment is secure and encrypted. We never store your PIN.
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
