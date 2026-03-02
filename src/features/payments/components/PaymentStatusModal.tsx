import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@src/constants/Colors';
import { Fonts } from '@src/constants/Fonts';
import type { PaymentStatusModalProps, PaymentProvider } from '../types';

const PROVIDER_COLORS: Record<PaymentProvider, string> = {
  ORANGE_MONEY: '#FF6600',
  WAVE: '#1E40AF',
  STRIPE: '#635BFF',
  CARD: '#635BFF',
};

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  visible,
  status,
  title,
  message,
  provider,
  qrCode,
  instructions,
  onRetry,
  onClose,
  onComplete,
}) => {
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
      
      if (status === 'processing') {
        rotation.value = withRepeat(
          withTiming(360, { duration: 1000 }),
          -1,
          false
        );
      }
    } else {
      scale.value = 0.5;
      opacity.value = 0;
      rotation.value = 0;
    }
  }, [visible, status]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return <ProcessingContent provider={provider} qrCode={qrCode} instructions={instructions} spinnerStyle={spinnerStyle} />;
      case 'success':
        return <SuccessContent title={title} message={message} onComplete={onComplete} />;
      case 'error':
        return <ErrorContent title={title} message={message} onRetry={onRetry} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {renderContent()}
        </Animated.View>
      </View>
    </Modal>
  );
};

/**
 * Processing Content
 */
interface ProcessingContentProps {
  provider?: PaymentProvider;
  qrCode?: string;
  instructions?: string[];
  spinnerStyle: any;
}

const ProcessingContent: React.FC<ProcessingContentProps> = ({
  provider,
  qrCode,
  instructions,
  spinnerStyle,
}) => {
  const providerColor = provider ? PROVIDER_COLORS[provider] : COLORS.blue;

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
            <MaterialCommunityIcons
              name="loading"
              size={48}
              color={providerColor}
            />
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
        <MaterialCommunityIcons name="information" size={16} color={COLORS.grey} />
        <Text style={styles.processingNoteText}>
          Do not close this screen until the payment is complete
        </Text>
      </View>
    </View>
  );
};

/**
 * Success Content
 */
interface SuccessContentProps {
  title?: string;
  message?: string;
  onComplete?: () => void;
}

const SuccessContent: React.FC<SuccessContentProps> = ({ title, message, onComplete }) => (
  <View style={styles.content}>
    <View style={styles.successIcon}>
      <MaterialCommunityIcons name="check-circle" size={64} color={COLORS.green} />
    </View>
    
    <Text style={styles.successTitle}>{title || 'Payment Successful!'}</Text>
    <Text style={styles.successMessage}>
      {message || 'Your payment has been processed successfully.'}
    </Text>

    <View style={styles.successDetails}>
      <View style={styles.detailRow}>
        <MaterialCommunityIcons name="receipt" size={20} color={COLORS.grey} />
        <Text style={styles.detailText}>Receipt has been sent to your email</Text>
      </View>
      <View style={styles.detailRow}>
        <MaterialCommunityIcons name="package-variant" size={20} color={COLORS.grey} />
        <Text style={styles.detailText}>Your order will be processed shortly</Text>
      </View>
    </View>

    <TouchableOpacity
      style={styles.completeButton}
      onPress={onComplete}
      activeOpacity={0.8}
    >
      <Text style={styles.completeButtonText}>Continue</Text>
      <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
    </TouchableOpacity>
  </View>
);

/**
 * Error Content
 */
interface ErrorContentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const ErrorContent: React.FC<ErrorContentProps> = ({ title, message, onRetry, onClose }) => (
  <View style={styles.content}>
    <View style={styles.errorIcon}>
      <MaterialCommunityIcons name="close-circle" size={64} color={COLORS.redShade} />
    </View>
    
    <Text style={styles.errorTitle}>{title || 'Payment Failed'}</Text>
    <Text style={styles.errorMessage}>
      {message || 'We couldn\'t process your payment. Please try again.'}
    </Text>

    <View style={styles.errorActions}>
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="refresh" size={20} color={COLORS.blue} />
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        activeOpacity={0.8}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.supportNote}>
      <MaterialCommunityIcons name="headset" size={16} color={COLORS.grey} />
      <Text style={styles.supportText}>
        Need help? Contact our support team
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  spinner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  qrContainer: {
    width: 200,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  scanLine: {
    width: '100%',
    height: 2,
    opacity: 0.8,
  },
  processingTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: COLORS.black,
    marginBottom: 8,
  },
  processingMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    textAlign: 'center',
  },
  instructionsContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 8,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  instructionNumber: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: COLORS.white,
  },
  instructionText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.black,
  },
  processingNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    backgroundColor: COLORS.lightGray + '30',
    borderRadius: 8,
  },
  processingNoteText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.green + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: COLORS.green,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 20,
  },
  successDetails: {
    width: '100%',
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: COLORS.white,
  },
  errorIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.redShade + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: COLORS.redShade,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blue + '10',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 8,
  },
  retryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: COLORS.blue,
  },
  closeButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: COLORS.grey,
  },
  supportNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: COLORS.grey,
  },
});

export default PaymentStatusModal;
