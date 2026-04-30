import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { usePaymentStatusModalStyles } from './PaymentStatusModal.styles';

interface ErrorContentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export const ErrorContent: React.FC<ErrorContentProps> = ({ title, message, onRetry, onClose }) => {
  const { colors } = useAppTheme();
  const styles = usePaymentStatusModalStyles();

  return (
    <View style={styles.content}>
      <View style={styles.errorIcon}>
        <MaterialCommunityIcons name="close-circle" size={64} color={colors.status.error} />
      </View>

      <Text style={styles.errorTitle}>{title || 'Payment Failed'}</Text>
      <Text style={styles.errorMessage}>
        {message || "We couldn't process your payment. Please try again."}
      </Text>

      <View style={styles.errorActions}>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
            <MaterialCommunityIcons name="refresh" size={20} color={colors.primary.main} />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.supportNote}>
        <MaterialCommunityIcons name="headset" size={16} color={colors.text.secondary} />
        <Text style={styles.supportText}>Need help? Contact our support team</Text>
      </View>
    </View>
  );
};
