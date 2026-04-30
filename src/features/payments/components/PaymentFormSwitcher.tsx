import React from 'react';
import OrangeMoneyForm from './OrangeMoneyForm';
import WavePaymentForm from './WavePaymentForm';
import CardPaymentForm from './CardPaymentForm/index';
import type { PaymentProvider, CardDetails } from '../types';

interface PaymentFormSwitcherProps {
  selectedProvider: PaymentProvider | null;
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  onCardChange: (card: CardDetails, isValid: boolean) => void;
  disabled?: boolean;
}

export const PaymentFormSwitcher: React.FC<PaymentFormSwitcherProps> = ({
  selectedProvider,
  phoneNumber,
  onPhoneNumberChange,
  onCardChange,
  disabled,
}) => {
  switch (selectedProvider) {
    case 'ORANGE_MONEY':
      return (
        <OrangeMoneyForm
          phoneNumber={phoneNumber}
          onPhoneNumberChange={onPhoneNumberChange}
          disabled={disabled}
        />
      );
    case 'WAVE':
      return (
        <WavePaymentForm
          phoneNumber={phoneNumber}
          onPhoneNumberChange={onPhoneNumberChange}
          disabled={disabled}
        />
      );
    case 'STRIPE':
    case 'CARD':
      return <CardPaymentForm onCardChange={onCardChange} disabled={disabled} />;
    default:
      return null;
  }
};
