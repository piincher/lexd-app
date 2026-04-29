import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/features/notifications';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import PaymentStatusModal from '../components/PaymentStatusModal';
import { PaymentScreenHeader } from '../components/PaymentScreenHeader';
import { PaymentFormSwitcher } from '../components/PaymentFormSwitcher';
import { PaymentScreenFooter } from '../components/PaymentScreenFooter';
import { usePaymentScreen } from '../hooks/usePaymentScreen';

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
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
    handleBack,
  } = usePaymentScreen();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
      <PaymentScreenHeader
        title={selectedProvider ? 'Payment Details' : 'Select Payment Method'}
        onBack={handleBack}
        rightElement={
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={24}
            color={colors.text.primary}
          />
        }
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default PaymentScreen;
