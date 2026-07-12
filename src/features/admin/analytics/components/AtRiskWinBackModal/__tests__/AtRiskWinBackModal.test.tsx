import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { AtRiskWinBackModal } from '../index';

jest.mock('@src/providers/ThemeProvider', () => {
  const { lightTheme } = jest.requireActual('@src/constants/Theme');
  return { useAppTheme: () => ({ colors: lightTheme.colors, isDark: false }) };
});

jest.mock('@expo/vector-icons', () => ({ MaterialCommunityIcons: 'MaterialCommunityIcons' }));

const customer = {
  userId: 'user-1',
  firstName: 'Awa',
  lastName: 'Diallo',
  daysInactive: 95,
  totalShipments: 2,
  totalCBM: 1.4,
  lastShipmentAt: '2026-03-01T00:00:00.000Z',
  lastRoute: 'Dakar',
  neverShipped: false,
};

describe('AtRiskWinBackModal', () => {
  it('sends the backend-supported no-shipment trigger', () => {
    const onTrigger = jest.fn().mockResolvedValue(undefined);
    const screen = render(
      <AtRiskWinBackModal
        visible
        customer={customer}
        onClose={jest.fn()}
        onTrigger={onTrigger}
        isPending={false}
      />,
    );

    fireEvent.press(screen.getByText('Programmer la relance'));
    expect(onTrigger).toHaveBeenCalledWith('user-1', 'NO_SHIPMENT_30D');
  });
});
