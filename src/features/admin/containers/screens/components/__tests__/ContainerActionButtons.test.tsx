import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ContainerActionButtons } from '../ContainerActionButtons';

jest.mock('@src/providers/ThemeProvider', () => {
  const { lightTheme } = jest.requireActual('@src/constants/Theme');
  return {
    useAppTheme: () => ({
      colors: lightTheme.colors,
      isDark: false,
    }),
  };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../GradientActionButton', () => {
  const React = jest.requireActual('react');
  const { Text } = jest.requireActual('react-native');

  return {
    GradientActionButton: ({ label, onPress }: { label: string; onPress: () => void }) => (
      <Text onPress={onPress}>{label}</Text>
    ),
  };
});

jest.mock('../ListActionButton', () => {
  const React = jest.requireActual('react');
  const { Text } = jest.requireActual('react-native');

  return {
    ListActionButton: ({ title, onPress }: { title: string; onPress: () => void }) => (
      <Text onPress={onPress}>{title}</Text>
    ),
  };
});

const baseProps = {
  onAssignGoods: jest.fn(),
  onGeneratePackingList: jest.fn(),
  onGoToLoadingList: jest.fn(),
  onMarkReadyForPickup: jest.fn(),
  onMarkDelivered: jest.fn(),
  onDeleteContainer: jest.fn(),
  hasGoods: false,
  canMarkReadyForPickup: false,
  canMarkDelivered: false,
  isDeletingContainer: false,
};

describe('ContainerActionButtons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the destructive delete container action on the detail actions', () => {
    const { getByText } = render(<ContainerActionButtons {...baseProps} />);

    fireEvent.press(getByText('Supprimer le container'));

    expect(getByText('Supprimer le container')).toBeTruthy();
    expect(baseProps.onDeleteContainer).toHaveBeenCalledTimes(1);
  });

  it('shows a deleting state while the container delete mutation is pending', () => {
    const { getByText } = render(
      <ContainerActionButtons {...baseProps} isDeletingContainer />
    );

    expect(getByText('Suppression...')).toBeTruthy();
  });
});
