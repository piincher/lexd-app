import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ClientsList } from '../ClientsList';

jest.mock('@shopify/flash-list', () => ({
  FlashList: ({ ListEmptyComponent }: { ListEmptyComponent?: React.ReactNode }) => (
    ListEmptyComponent ?? null
  ),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
}));
jest.mock('expo-image', () => ({ Image: 'Image' }));
jest.mock('@src/shared/lib/haptics', () => ({ hapticLight: jest.fn() }));

const renderList = (overrides: Partial<React.ComponentProps<typeof ClientsList>> = {}) => {
  const props: React.ComponentProps<typeof ClientsList> = {
    clients: [],
    header: null,
    selected: new Set<string>(),
    allCurrentPageSelected: false,
    onToggle: jest.fn(),
    onToggleAll: jest.fn(),
    onPreview: jest.fn(),
    onShareSupplier: jest.fn(),
    onSend: jest.fn(),
    onRegenerate: jest.fn(),
    sendingClientIds: [],
    isFetching: false,
    isError: false,
    onRefresh: jest.fn(),
    page: 1,
    pages: 1,
    hasPrev: false,
    hasNext: false,
    onPageChange: jest.fn(),
    ...overrides,
  };

  return { props, screen: render(<ClientsList {...props} />) };
};

describe('ClientsList empty states', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the request error and lets the admin retry', () => {
    const onRefresh = jest.fn();
    const { screen } = renderList({
      isError: true,
      errorMessage: 'Le serveur des marques ne répond pas.',
      onRefresh,
    });

    expect(screen.getByText('Chargement impossible')).toBeTruthy();
    expect(screen.getByText('Le serveur des marques ne répond pas.')).toBeTruthy();
    expect(screen.queryByText('Aucun client trouvé')).toBeNull();

    fireEvent.press(screen.getByTestId('empty-state-action'));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('distinguishes a successful empty search from a loading failure', () => {
    const { screen } = renderList({ isError: false });

    expect(screen.getByText('Aucun client trouvé')).toBeTruthy();
    expect(screen.getByText('Modifiez la recherche pour afficher des clients.')).toBeTruthy();
    expect(screen.queryByText('Chargement impossible')).toBeNull();
    expect(screen.queryByText('Réessayer')).toBeNull();
  });
});
