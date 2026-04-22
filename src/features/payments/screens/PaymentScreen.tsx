import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import { NotificationBell } from '@src/features/notifications';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import OrangeMoneyForm from '../components/OrangeMoneyForm';
import WavePaymentForm from '../components/WavePaymentForm';
import CardPaymentForm from '../components/CardPaymentForm';
import PaymentStatusModal from '../components/PaymentStatusModal';
import { usePaymentFlow, useBalanceDue } from '../hooks/usePayments';
import type { PaymentProvider, CardDetails } from '../types';
import * as Haptics from 'expo-haptics';

interface PaymentScreenParams {
  amount?: number;
  goodsIds?: string[];
  description?: string;
  returnScreen?: string;
}

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as PaymentScreenParams;
  const { colors } = useAppTheme();
  
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background.default,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        backButton: {
          padding: 8,
        },
        headerTitle: {
          fontSize: 18,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        placeholder: {
          width: 40,
        },
        content: {
          flex: 1,
        },
        footer: {
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        totalContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        },
        totalLabel: {
          fontSize: 14,
          fontFamily: Fonts.regular,
          color: colors.text.secondary,
        },
        totalAmount: {
          fontSize: 20,
          fontFamily: Fonts.bold,
          color: colors.text.primary,
        },
        payButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary.main,
          borderRadius: 12,
          paddingVertical: 16,
          gap: 8,
        },
        payButtonDisabled: {
          backgroundColor: colors.neutral[200],
        },
        payButtonText: {
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: colors.text.inverse,
        },
      }),
    [colors]
  );
  
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardValid, setCardValid] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusModalConfig, setStatusModalConfig] = useState({
    status: 'processing' as 'processing' | 'success' | 'error',
    title: '',
    message: '',
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const paymentFlow = usePaymentFlow();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const { data: balanceData } = useBalanceDue();

  const amount = params?.amount || balanceData?.totalDue || 0;
  const goodsIds = params?.goodsIds || [];

  // Handle provider selection
  const handleProviderSelect = (provider: PaymentProvider) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedProvider(provider);
    setPhoneNumber('');
    setCardValid(false);
  };

  // Handle card change
  const handleCardChange = (card: CardDetails, isValid: boolean) => {
    setCardDetails(card);
    setCardValid(isValid);
  };

  // Get payment details based on provider
  const getPaymentDetails = () => {
    switch (selectedProvider) {
      case 'ORANGE_MONEY':
        return { phoneNumber };
      case 'WAVE':
        return { phoneNumber };
      case 'STRIPE':
      case 'CARD':
        return { cardDetails };
      default:
        return {};
    }
  };

  // Validate current step
  const isStepValid = () => {
    if (!selectedProvider) return false;
    
    switch (selectedProvider) {
      case 'ORANGE_MONEY':
        return phoneNumber.length === 10 && phoneNumber.startsWith('0');
      case 'WAVE':
        return true; // Phone optional for Wave
      case 'STRIPE':
      case 'CARD':
        return cardValid;
      default:
        return false;
    }
  };

  // Handle payment submission
  const handlePay = async () => {
    if (!selectedProvider || !isStepValid()) return;

    setShowStatusModal(true);
    setStatusModalConfig({
      status: 'processing',
      title: 'Processing',
      message: 'Please complete the payment on your device',
    });

    try {
      const result = await paymentFlow.initializePayment({
        provider: selectedProvider,
        amount,
        goodsIds: goodsIds.length > 0 ? goodsIds : undefined,
        phoneNumber: phoneNumber || undefined,
        description: params?.description,
        metadata: getPaymentDetails(),
      });

      // For mobile money, show processing modal
      if (selectedProvider === 'ORANGE_MONEY' || selectedProvider === 'WAVE') {
        // Start polling
        startPolling(result.providerTransactionId);
      } else {
        // For cards, the flow is different (3D Secure, etc.)
        handleCardPayment(result);
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setStatusModalConfig({
        status: 'error',
        title: 'Payment Failed',
        message: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  // Start polling for status
  const startPolling = async (transactionId: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const checkStatus = async () => {
      attempts++;
      
      try {
        const result = await paymentFlow.verifyPayment({
          provider: selectedProvider!,
          transactionId,
        });

        if (result.status === 'COMPLETED') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setStatusModalConfig({
            status: 'success',
            title: 'Payment Successful!',
            message: 'Your payment has been processed successfully.',
          });
          return;
        } else if (result.status === 'FAILED') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setStatusModalConfig({
            status: 'error',
            title: 'Payment Failed',
            message: result.message || 'The payment could not be completed.',
          });
          return;
        }

        if (attempts < maxAttempts) {
          timeoutRef.current = setTimeout(checkStatus, 2000);
        } else {
          setStatusModalConfig({
            status: 'error',
            title: 'Payment Timeout',
            message: 'The payment confirmation timed out. Please check your payment status later.',
          });
        }
      } catch (error) {
        if (attempts < maxAttempts) {
          timeoutRef.current = setTimeout(checkStatus, 2000);
        }
      }
    };

    checkStatus();
  };

  // Handle card payment flow
  const handleCardPayment = (result: any) => {
    // Card payment uses clientSecret for Stripe.js
    // This would integrate with Stripe's SDK
    // For now, we simulate success
    timeoutRef.current = setTimeout(() => {
      setStatusModalConfig({
        status: 'success',
        title: 'Payment Successful!',
        message: 'Your card payment has been processed.',
      });
    }, 2000);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowStatusModal(false);
    if (statusModalConfig.status === 'success') {
      navigation.goBack();
    }
  };

  // Handle modal retry
  const handleModalRetry = () => {
    setShowStatusModal(false);
    handlePay();
  };

  // Handle back button
  const handleBack = () => {
    if (selectedProvider) {
      setSelectedProvider(null);
    } else {
      navigation.goBack();
    }
  };

  // Render payment form based on provider
  const renderPaymentForm = () => {
    switch (selectedProvider) {
      case 'ORANGE_MONEY':
        return (
          <OrangeMoneyForm
            phoneNumber={phoneNumber}
            onPhoneNumberChange={setPhoneNumber}
            disabled={paymentFlow.isInitializing}
          />
        );
      case 'WAVE':
        return (
          <WavePaymentForm
            phoneNumber={phoneNumber}
            onPhoneNumberChange={setPhoneNumber}
            disabled={paymentFlow.isInitializing}
          />
        );
      case 'STRIPE':
      case 'CARD':
        return (
          <CardPaymentForm
            onCardChange={handleCardChange}
            disabled={paymentFlow.isInitializing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectedProvider ? 'Payment Details' : 'Select Payment Method'}
        </Text>
        <NotificationBell
          onPress={() => navigation.navigate('Notifications' as never)}
          size={24}
          color={colors.text.primary}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedProvider ? (
          <PaymentMethodSelector
            selectedMethod={selectedProvider}
            onSelect={handleProviderSelect}
            amount={amount}
            showFees={true}
          />
        ) : (
          <>
            {renderPaymentForm()}
            
            {/* Pay Button */}
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>
                  {(amount / 100).toLocaleString()} FCFA
                </Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.payButton,
                  !isStepValid() && styles.payButtonDisabled,
                ]}
                onPress={handlePay}
                disabled={!isStepValid() || paymentFlow.isInitializing}
                activeOpacity={0.8}
              >
                <Text style={styles.payButtonText}>
                  {paymentFlow.isInitializing ? 'Processing...' : 'Pay Now'}
                </Text>
                {!paymentFlow.isInitializing && (
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color={colors.text.inverse}
                  />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Status Modal */}
      <PaymentStatusModal
        visible={showStatusModal}
        status={statusModalConfig.status}
        title={statusModalConfig.title}
        message={statusModalConfig.message}
        provider={selectedProvider}
        onClose={handleModalClose}
        onRetry={handleModalRetry}
        onComplete={handleModalClose}
      />
    </SafeAreaView>
  );
};

export default PaymentScreen;
