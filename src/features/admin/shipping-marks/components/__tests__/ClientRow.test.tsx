import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ClientRow } from '../ClientRow';

jest.mock('@src/providers/ThemeProvider', () => {
  const { lightTheme } = jest.requireActual('@src/constants/Theme');
  return { useAppTheme: () => ({ colors: lightTheme.colors, isDark: false }) };
});

jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('expo-image', () => ({ Image: 'Image' }));

const client = {
  _id: 'user-1',
  firstName: 'Awa',
  lastName: 'Diallo',
  phoneNumber: '+22370000000',
  clientId: 'CLX-1001',
  shippingMarkImageUrl: 'https://example.test/mark.png',
  isActive: true,
};

const handlers = {
  onToggle: jest.fn(),
  onPreview: jest.fn(),
  onDownload: jest.fn(),
  onSend: jest.fn(),
  onRegenerate: jest.fn(),
};

describe('ClientRow', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders a readable ready mark card and exposes every action', () => {
    const screen = render(
      <ClientRow
        client={client}
        selected={false}
        {...handlers}
        isRegenerating={false}
        isSending={false}
      />,
    );

    expect(screen.getByText('Awa Diallo')).toBeTruthy();
    expect(screen.getByText('CLX-1001')).toBeTruthy();
    expect(screen.getByText('Prête')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Sélectionner Awa Diallo'));
    fireEvent.press(screen.getByLabelText('Aperçu'));
    fireEvent.press(screen.getByLabelText('Partager'));
    fireEvent.press(screen.getByLabelText('WhatsApp'));
    fireEvent.press(screen.getByLabelText('Régénérer la marque de Awa Diallo'));

    expect(handlers.onToggle).toHaveBeenCalledWith('user-1');
    expect(handlers.onPreview).toHaveBeenCalledWith(client);
    expect(handlers.onDownload).toHaveBeenCalledWith(client);
    expect(handlers.onSend).toHaveBeenCalledWith(client);
    expect(handlers.onRegenerate).toHaveBeenCalledWith('user-1');
  });

  it('replaces unavailable actions with one clear generation action', () => {
    const missingClient = { ...client, shippingMarkImageUrl: undefined };
    const screen = render(
      <ClientRow
        client={missingClient}
        selected
        {...handlers}
        isRegenerating={false}
        isSending={false}
      />,
    );

    expect(screen.getByText('À générer')).toBeTruthy();
    expect(screen.queryByLabelText('WhatsApp')).toBeNull();
    fireEvent.press(screen.getByLabelText('Générer la marque de Awa Diallo'));
    expect(handlers.onRegenerate).toHaveBeenCalledWith('user-1');
  });
});
