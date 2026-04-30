import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useWavePaymentFormStyles } from './useWavePaymentFormStyles';
import { WAVE_PAYMENT_INSTRUCTIONS } from './waveConstants';

interface InstructionItemProps {
  icon: string;
  text: string;
}

const InstructionItem: React.FC<InstructionItemProps> = ({ icon, text }) => {
  const { colors } = useAppTheme();
  const styles = useWavePaymentFormStyles();

  return (
    <View style={styles.instructionItem}>
      <View style={styles.instructionIcon}>
        <MaterialCommunityIcons
          name={icon as any}
          size={16}
          color={colors.primary.main}
        />
      </View>
      <Text style={styles.instructionText}>{text}</Text>
    </View>
  );
};

export const PaymentInstructions: React.FC = () => {
  const { colors } = useAppTheme();
  const styles = useWavePaymentFormStyles();

  return (
    <View style={styles.instructions}>
      <View style={styles.instructionHeader}>
        <MaterialCommunityIcons
          name="information"
          size={18}
          color={colors.primary.main}
        />
        <Text style={styles.instructionTitle}>How to pay with Wave</Text>
      </View>

      {WAVE_PAYMENT_INSTRUCTIONS.map((instruction, index) => (
        <InstructionItem
          key={index}
          icon={instruction.icon}
          text={instruction.text}
        />
      ))}
    </View>
  );
};
