import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { RegistrationSuccessCard } from '../index';

jest.mock('@src/providers/ThemeProvider', () => {
  const { lightTheme } = jest.requireActual('@src/constants/Theme');
  return { useAppTheme: () => ({ colors: lightTheme.colors }) };
});
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('../../../hooks/useClipboard', () => ({ useClipboard: () => ({ copy: jest.fn() }) }));

describe('RegistrationSuccessCard', () => {
  it('shows the registered identity and starts supplier sharing directly', () => {
    const onShareWithSupplier = jest.fn();
    const screen = render(
      <RegistrationSuccessCard
        client={{
          _id: 'user-1',
          firstName: 'Awa',
          lastName: 'Diallo',
          phoneNumber: '+22370000000',
          shippingClientId: 'CLX-ML-00190',
          role: 'user',
        }}
        onShareWithSupplier={onShareWithSupplier}
        onViewDetails={jest.fn()}
        onCreateAnother={jest.fn()}
      />,
    );

    expect(screen.getByText('Awa Diallo')).toBeTruthy();
    expect(screen.getByText('+22370000000')).toBeTruthy();
    expect(screen.getByText('CLX-ML-00190')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Partager la marque avec le fournisseur'));
    expect(onShareWithSupplier).toHaveBeenCalledTimes(1);
  });
});
