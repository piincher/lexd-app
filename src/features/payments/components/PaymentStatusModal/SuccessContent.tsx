import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePaymentStatusModalStyles } from './PaymentStatusModal.styles';

interface SuccessContentProps {
  title?: string;
  message?: string;
  onComplete?: () => void;
}

export const SuccessContent: React.FC<SuccessContentProps> = ({ title, message, onComplete }) => {
  const { colors } = useAppTheme();
  const styles = usePaymentStatusModalStyles();

  return (
    <View style={styles.content}>
      <View style={styles.successIcon}>
        <MaterialCommunityIcons name="check-circle" size={64} color={colors.status.success} />
      </View>

      <Text style={styles.successTitle}>{title || 'Payment Successful!'}</Text>
      <Text style={styles.successMessage}>
        {message || 'Your payment has been processed successfully.'}
      </Text>

      <View style={styles.successDetails}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="receipt" size={20} color={colors.text.secondary} />
          <Text style={styles.detailText}>Receipt has been sent to your email</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="package-variant" size={20} color={colors.text.secondary} />
          <Text style={styles.detailText}>Your order will be processed shortly</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.completeButton} onPress={onComplete} activeOpacity={0.8}>
        <Text style={styles.completeButtonText}>Continue</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color={colors.text.inverse} />
      </TouchableOpacity>
    </View>
  );
};
