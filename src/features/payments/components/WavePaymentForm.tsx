import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { WavePaymentFormProps } from '../types';

const WavePaymentForm: React.FC<WavePaymentFormProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  qrCode,
  deepLink,
  onOpenWaveApp,
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const [showQrCode, setShowQrCode] = useState(true);
  const [imageError, setImageError] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          padding: 16,
        },
        title: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 20,
        },
        qrSection: {
          backgroundColor: colors.background.default,
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        },
        qrToggle: {
          flexDirection: 'row',
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 12,
          padding: 4,
          marginBottom: 16,
        },
        toggleButton: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          borderRadius: 8,
          gap: 6,
        },
        toggleButtonActive: {
          backgroundColor: colors.primary.main,
        },
        toggleText: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        toggleTextActive: {
          color: colors.text.inverse,
        },
        qrContainer: {
          alignItems: 'center',
        },
        qrImage: {
          width: 220,
          height: 220,
          borderRadius: 12,
          backgroundColor: colors.background.default,
        },
        qrPlaceholder: {
          width: 220,
          height: 220,
          borderRadius: 12,
          backgroundColor: colors.neutral[200] + '30',
          justifyContent: 'center',
          alignItems: 'center',
        },
        qrPlaceholderText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        qrInstructions: {
          marginTop: 16,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
          textAlign: 'center',
        },
        appLinkContainer: {
          alignItems: 'center',
          paddingVertical: 20,
        },
        waveIconContainer: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.primary.main + '10',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16,
        },
        appLinkTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 8,
        },
        appLinkDescription: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          textAlign: 'center',
          marginBottom: 20,
          paddingHorizontal: 20,
        },
        openAppButton: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.primary.main,
          borderRadius: 12,
          paddingVertical: 14,
          paddingHorizontal: 24,
          gap: 8,
        },
        openAppButtonDisabled: {
          opacity: 0.6,
        },
        openAppButtonText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
        divider: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 24,
        },
        dividerLine: {
          flex: 1,
          height: 1,
          backgroundColor: colors.neutral[200],
        },
        dividerText: {
          marginHorizontal: 12,
          fontSize: 12,
          fontFamily: Fonts.medium,
          color: colors.text.secondary,
        },
        manualEntry: {
          backgroundColor: colors.background.default,
          borderRadius: 16,
          padding: 16,
        },
        manualEntryTitle: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
          marginBottom: 4,
        },
        manualEntryDescription: {
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          marginBottom: 12,
        },
        phoneInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        countryCodeBadge: {
          backgroundColor: colors.primary.main + '10',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 14,
          marginRight: 8,
        },
        countryCodeText: {
          fontSize: 14,
          fontFamily: Fonts.bold,
          color: colors.primary.main,
        },
        phoneButton: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.neutral[200] + '30',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 14,
        },
        phoneButtonDisabled: {
          opacity: 0.6,
        },
        phoneButtonText: {
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.text.primary,
        },
        instructions: {
          marginTop: 24,
        },
        instructionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        },
        instructionTitle: {
          marginLeft: 8,
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        instructionItem: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 10,
        },
        instructionIcon: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: colors.primary.main + '10',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        },
        instructionText: {
          flex: 1,
          fontSize: 13,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
          lineHeight: 18,
        },
        securityNote: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.status.success + '08',
          borderRadius: 12,
          padding: 12,
          marginTop: 20,
        },
        securityText: {
          flex: 1,
          marginLeft: 8,
          fontSize: 12,
          fontFamily: Fonts.regular,
          color: colors.status.success,
        },
        processingOverlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.9)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        processingText: {
          marginTop: 12,
          fontSize: 14,
          fontFamily: Fonts.medium,
          color: colors.primary.main,
        },
      }),
    [colors]
  );

  // Handle opening Wave app
  const handleOpenWaveApp = async () => {
    if (onOpenWaveApp) {
      onOpenWaveApp();
      return;
    }

    if (deepLink) {
      try {
        const supported = await Linking.canOpenURL(deepLink);
        if (supported) {
          await Linking.openURL(deepLink);
        } else {
          // Fallback to app store
          const storeUrl = 'https://play.google.com/store/apps/details?id=com.wave.wallet';
          await Linking.openURL(storeUrl);
        }
      } catch (error) {
        console.error('Failed to open Wave app:', error);
      }
    }
  };

  /**
   * Instruction Item Component
   */
  interface InstructionItemProps {
    icon: string;
    text: string;
  }

  const InstructionItem: React.FC<InstructionItemProps> = ({ icon, text }) => (
    <View style={styles.instructionItem}>
      <View style={styles.instructionIcon}>
        <MaterialCommunityIcons name={icon as any} size={16} color={colors.primary.main} />
      </View>
      <Text style={styles.instructionText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wave Payment</Text>
      
      {/* QR Code Section */}
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

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Manual Entry Option */}
      <View style={styles.manualEntry}>
        <Text style={styles.manualEntryTitle}>
          Pay to Phone Number
        </Text>
        
        <Text style={styles.manualEntryDescription}>
          Enter your Wave-registered phone number below
        </Text>

        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeBadge}>
            <Text style={styles.countryCodeText}>+223</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.phoneButton, disabled && styles.phoneButtonDisabled]}
            onPress={() => {/* Open phone input modal */}}
            disabled={disabled}
          >
            <Text style={styles.phoneButtonText}>
              {phoneNumber || 'Enter phone number'}
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <View style={styles.instructionHeader}>
          <MaterialCommunityIcons
            name="information"
            size={18}
            color={colors.primary.main}
          />
          <Text style={styles.instructionTitle}>How to pay with Wave</Text>
        </View>
        
        <InstructionItem
          icon="qrcode-scan"
          text="Scan the QR code above with your Wave app, OR tap 'Open Wave App'"
        />
        <InstructionItem
          icon="check-circle"
          text="Confirm the payment amount in your Wave app"
          />
        <InstructionItem
          icon="lock"
          text="Enter your Wave PIN to authorize the payment"
        />
        <InstructionItem
          icon="checkbox-marked-circle"
          text="Wait for the confirmation screen"
        />
      </View>

      {/* Security Note */}
      <View style={styles.securityNote}>
        <MaterialCommunityIcons
          name="shield-check"
          size={16}
          color={colors.status.success}
        />
        <Text style={styles.securityText}>
          Your payment is protected by Wave's security. We never store your PIN.
        </Text>
      </View>

      {/* Processing State */}
      {disabled && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={styles.processingText}>
            Waiting for payment confirmation...
          </Text>
        </View>
      )}
    </View>
  );
};

export default WavePaymentForm;
