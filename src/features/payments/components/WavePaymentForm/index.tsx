import React from 'react';
import { View, Text } from 'react-native';
import type { WavePaymentFormProps } from '../../types';
import { useWavePaymentForm } from './useWavePaymentForm';
import { useWavePaymentFormStyles } from './useWavePaymentFormStyles';
import { PaymentMethodSection } from './PaymentMethodSection';
import { ManualEntrySection } from './ManualEntrySection';
import { PaymentInstructions } from './PaymentInstructions';
import { SecurityNote } from './SecurityNote';
import { ProcessingOverlay } from './ProcessingOverlay';

export const WavePaymentForm: React.FC<WavePaymentFormProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  qrCode,
  deepLink,
  onOpenWaveApp,
  disabled = false,
}) => {
  const styles = useWavePaymentFormStyles();
  const {
    showQrCode,
    setShowQrCode,
    imageError,
    setImageError,
    handleOpenWaveApp,
  } = useWavePaymentForm({ deepLink, onOpenWaveApp });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wave Payment</Text>

      <PaymentMethodSection
        showQrCode={showQrCode}
        setShowQrCode={setShowQrCode}
        qrCode={qrCode}
        imageError={imageError}
        setImageError={setImageError}
        disabled={disabled}
        handleOpenWaveApp={handleOpenWaveApp}
      />

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <ManualEntrySection phoneNumber={phoneNumber} disabled={disabled} />

      <PaymentInstructions />

      <SecurityNote />

      {disabled && <ProcessingOverlay />}
    </View>
  );
};

export default WavePaymentForm;
