/**
 * RecordPaymentScreen - Admin screen to record manual payments with optional photo proof
 * For cash, bank transfer, or mobile money payments made by clients
 */

import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { PaymentRecordSummary } from '../components/PaymentRecordSummary';
import { PaymentForm } from '../components/PaymentForm';
import { PaymentProofImages } from '../components/PaymentProofImages';
import { PaymentPreviewCard } from '../components/PaymentPreviewCard';
import { PaymentErrorCard } from '../components/PaymentErrorCard';
import { useRecordPaymentScreenUI } from './hooks/useRecordPaymentScreenUI';
import { createRecordPaymentScreenStyles } from './RecordPaymentScreen.styles';

const RecordPaymentScreen: React.FC = () => {
  const {
    amount, setAmount, paymentMethod, setPaymentMethod,
    referenceNumber, setReferenceNumber, notes, setNotes,
    proofImages, errors, showImageModal, setShowImageModal,
    isSubmitting, isPending, isError, error,
    handleSubmit, pickImage, removeImage,
    newBalance, paymentStatus,
    orderCode, clientName, totalAmount, currentBalance,
  } = useRecordPaymentScreenUI();

  const { colors } = useAppTheme();
  const styles = createRecordPaymentScreenStyles(colors);

  return (
    <Screen header={{ title: 'Record Payment', showNotificationBell: true }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
        <PaymentRecordSummary
          orderCode={orderCode}
          clientName={clientName}
          totalAmount={totalAmount}
          currentBalance={currentBalance}
        />
        <PaymentForm
          amount={amount}
          onAmountChange={setAmount}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          referenceNumber={referenceNumber}
          onReferenceNumberChange={setReferenceNumber}
          notes={notes}
          onNotesChange={setNotes}
          errors={errors}
        />
        <PaymentProofImages
          proofImages={proofImages}
          onPickImage={pickImage}
          onRemoveImage={removeImage}
          showImageModal={showImageModal}
          onShowImageModal={() => setShowImageModal(true)}
          onHideImageModal={() => setShowImageModal(false)}
        />
        {amount && parseFloat(amount) > 0 && (
          <PaymentPreviewCard
            amount={parseFloat(amount)}
            currentBalance={currentBalance}
            newBalance={newBalance}
            paymentStatus={paymentStatus}
          />
        )}
        {isError && error && (
          <PaymentErrorCard message={error.message || 'Failed to record payment'} />
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isPending}
          disabled={isPending || isSubmitting || !amount}
          style={styles.submitButton}
          buttonColor={colors.primary.main}
          icon="check"
          labelStyle={styles.submitLabel}
        >
          {isPending ? 'Recording Payment...' : 'Record Payment'}
        </Button>
        <View style={{ height: 280 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default RecordPaymentScreen;
