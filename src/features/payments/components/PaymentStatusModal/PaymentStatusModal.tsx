import React, { useEffect } from 'react';
import { View, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { usePaymentStatusModalStyles } from './PaymentStatusModal.styles';
import { ProcessingContent } from './ProcessingContent';
import { SuccessContent } from './SuccessContent';
import { ErrorContent } from './ErrorContent';
import type { PaymentStatusModalProps } from '../../types';

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
  const styles = usePaymentStatusModalStyles();
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);

      if (status === 'processing') {
        rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
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
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {renderContent()}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PaymentStatusModal;
