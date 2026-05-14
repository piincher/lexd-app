import React from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePaymentStatusModalStyles } from './PaymentStatusModal.styles';
import type { PaymentProvider } from '../../types';

interface ProcessingContentProps {
  provider?: PaymentProvider;
  qrCode?: string;
  instructions?: string[];
  spinnerStyle: any;
}

const getProviderColor = (provider: PaymentProvider, colors: any) => {
  switch (provider) {
    case 'ORANGE_MONEY': return colors.status.warning;
    case 'WAVE': return colors.status.info;
    case 'STRIPE': return colors.primary.main;
    case 'CARD': return colors.primary.main;
    default: return colors.primary.main;
  }
};

export const ProcessingContent: React.FC<ProcessingContentProps> = ({
  provider,
  qrCode,
  instructions,
  spinnerStyle,
}) => {
  const { colors } = useAppTheme();
  const styles = usePaymentStatusModalStyles();
  const providerColor = provider ? getProviderColor(provider, colors) : colors.primary.main;

  return (
    <View style={styles.content}>
      {qrCode ? (
        <View style={styles.qrContainer}>
          <Image source={{ uri: qrCode }} style={styles.qrImage} />
          <View style={styles.scanOverlay}>
            <Animated.View style={[styles.scanLine, { backgroundColor: providerColor }]} />
          </View>
        </View>
      ) : (
        <Animated.View style={spinnerStyle}>
          <View style={[styles.spinner, { borderColor: providerColor }]}>
            <MaterialCommunityIcons name="loading" size={48} color={providerColor} />
          </View>
        </Animated.View>
      )}

      <Text style={styles.processingTitle}>Processing Payment</Text>
      <Text style={styles.processingMessage}>
        Please complete the payment on your device...
      </Text>

      {instructions && instructions.length > 0 && (
        <View style={styles.instructionsContainer}>
          {instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionRow}>
              <View style={[styles.instructionDot, { backgroundColor: providerColor }]}>
                <Text style={styles.instructionNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.processingNote}>
        <MaterialCommunityIcons name="information" size={16} color={colors.text.secondary} />
        <Text style={styles.processingNoteText}>
          Do not close this screen until the payment is complete
        </Text>
      </View>
    </View>
  );
};
