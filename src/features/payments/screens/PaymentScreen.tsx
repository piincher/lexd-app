import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import PaymentStatusModal from '../components/PaymentStatusModal';
import { PaymentScreenHeader } from '../components/PaymentScreenHeader';
import { PaymentFormSwitcher } from '../components/PaymentFormSwitcher';
import { PaymentScreenFooter } from '../components/PaymentScreenFooter';
import { usePaymentScreenUI } from './hooks/usePaymentScreenUI';
import { usePaymentScreenStyles } from './PaymentScreen.styles';

const PaymentScreen: React.FC = () => {
  const {
    selectedProvider,
    amount,
    phoneNumber,
    setPhoneNumber,
    handleProviderSelect,
    handleCardChange,
    isStepValid,
    handlePay,
    showStatusModal,
    statusModalConfig,
    isInitializing,
    handleModalClose,
    handleModalRetry,
    colors,
    handlers,
  } = usePaymentScreenUI();

  const styles = usePaymentScreenStyles();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <PaymentScreenHeader
          title={selectedProvider ? 'Payment Details' : 'Select Payment Method'}
          onBack={handlers.handleBack}
          rightElement={
            <NotificationBell
              onPress={handlers.handleNotificationPress}
              size={24}
              color={colors.text.primary}
            />
          }
        />

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        {!selectedProvider ? (
          <PaymentMethodSelector
            selectedMethod={selectedProvider}
            onSelect={handleProviderSelect}
            amount={amount}
            showFees={true}
          />
        ) : (
          <>
            <PaymentFormSwitcher
              selectedProvider={selectedProvider}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
              onCardChange={handleCardChange}
              disabled={isInitializing}
            />
            <PaymentScreenFooter
              amount={amount}
              isValid={isStepValid()}
              isProcessing={isInitializing}
              onPay={handlePay}
            />
          </>
        )}
        </ScrollView>
      </KeyboardAvoidingView>

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
