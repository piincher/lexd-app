import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useWavePaymentFormStyles } from './useWavePaymentFormStyles';

interface PaymentMethodSectionProps {
  showQrCode: boolean;
  setShowQrCode: (value: boolean) => void;
  qrCode?: string;
  imageError: boolean;
  setImageError: (value: boolean) => void;
  disabled?: boolean;
  handleOpenWaveApp: () => Promise<void>;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({
  showQrCode,
  setShowQrCode,
  qrCode,
  imageError,
  setImageError,
  disabled,
  handleOpenWaveApp,
}) => {
  const { colors } = useAppTheme();
  const styles = useWavePaymentFormStyles();

  return (
    <View style={styles.qrSection}>
      <View style={styles.qrToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, showQrCode && styles.toggleButtonActive]}
          onPress={() => setShowQrCode(true)}
        >
          <MaterialCommunityIcons
            name="qrcode"
            size={18}
            color={showQrCode ? colors.text.inverse : colors.text.secondary}
          />
          <Text style={[styles.toggleText, showQrCode && styles.toggleTextActive]}>
            Scan QR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, !showQrCode && styles.toggleButtonActive]}
          onPress={() => setShowQrCode(false)}
        >
          <MaterialCommunityIcons
            name="cellphone"
            size={18}
            color={!showQrCode ? colors.text.inverse : colors.text.secondary}
          />
          <Text style={[styles.toggleText, !showQrCode && styles.toggleTextActive]}>
            Wave App
          </Text>
        </TouchableOpacity>
      </View>

      {showQrCode ? (
        <View style={styles.qrContainer}>
          {qrCode && !imageError ? (
            <Image
              source={{ uri: qrCode }}
              style={styles.qrImage}
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <View style={styles.qrPlaceholder}>
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={64}
                color={colors.neutral[200]}
              />
              <Text style={styles.qrPlaceholderText}>
                QR code will appear here
              </Text>
            </View>
          )}

          <Text style={styles.qrInstructions}>
            Open your Wave app and scan this QR code to pay
          </Text>
        </View>
      ) : (
        <View style={styles.appLinkContainer}>
          <View style={styles.waveIconContainer}>
            <MaterialCommunityIcons
              name="wave"
              size={48}
              color={colors.primary.main}
            />
          </View>

          <Text style={styles.appLinkTitle}>
            Pay directly from the Wave app
          </Text>

          <Text style={styles.appLinkDescription}>
            Tap the button below to open the Wave app and complete your payment
          </Text>

          <TouchableOpacity
            style={[styles.openAppButton, disabled && styles.openAppButtonDisabled]}
            onPress={handleOpenWaveApp}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="open-in-app"
              size={20}
              color={colors.text.inverse}
            />
            <Text style={styles.openAppButtonText}>
              Open Wave App
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
