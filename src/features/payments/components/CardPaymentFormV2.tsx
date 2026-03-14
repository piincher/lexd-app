/**
 * Card Payment Form V2
 * Decomposed version under 150 lines
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '@src/constants/Theme';
import { Button } from '@src/shared/ui/Button';
import { Card } from '@src/shared/ui/Card';
import { useCardPayment } from '../hooks/useCardPayment';
import { CardNumberInput } from './CardNumberInput';
import { CardExpiryInput } from './CardExpiryInput';
import { CardCVVInput } from './CardCVVInput';
import { CardHolderInput } from './CardHolderInput';
import { CardPaymentFormData } from '../hooks/useCardPayment';

interface CardPaymentFormV2Props {
  amount: number;
  currency: string;
  onSubmit: (data: CardPaymentFormData) => Promise<void>;
  onCancel: () => void;
}

export const CardPaymentFormV2: React.FC<CardPaymentFormV2Props> = ({
  amount,
  currency,
  onSubmit,
  onCancel,
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    isValid,
    updateField,
    submit,
  } = useCardPayment(onSubmit);

  return (
    <Card style={styles.container}>
      <View style={styles.amountContainer}>
        <View style={styles.amountRow}>
          <View>
            <CardNumberInput
              value={formData.cardNumber}
              onChangeText={(v) => updateField('cardNumber', v)}
              error={errors.cardNumber}
            />
            <View style={styles.row}>
              <View style={styles.half}>
                <CardExpiryInput
                  value={formData.expiry}
                  onChangeText={(v) => updateField('expiry', v)}
                  error={errors.expiry}
                />
              </View>
              <View style={styles.half}>
                <CardCVVInput
                  value={formData.cvv}
                  onChangeText={(v) => updateField('cvv', v)}
                  error={errors.cvv}
                />
              </View>
            </View>
            <CardHolderInput
              value={formData.cardHolder}
              onChangeText={(v) => updateField('cardHolder', v)}
              error={errors.cardHolder}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          variant="primary"
          onPress={submit}
          loading={isSubmitting}
          disabled={!isValid}
          style={styles.payButton}
        >
          Payer {amount.toLocaleString('fr-FR')} {currency}
        </Button>
        <Button variant="ghost" onPress={onCancel} style={styles.cancelButton}>
          Annuler
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.lg,
  },
  amountContainer: {
    marginBottom: Theme.spacing.lg,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  half: {
    flex: 1,
  },
  footer: {
    gap: Theme.spacing.md,
  },
  payButton: {
    width: '100%',
  },
  cancelButton: {
    width: '100%',
  },
});
