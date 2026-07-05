import React from 'react';
import { render } from '@testing-library/react-native';
import { DeleteContainerDialog } from '../DeleteContainerDialog';

jest.mock('@src/providers/ThemeProvider', () => {
  const { lightTheme } = jest.requireActual('@src/constants/Theme');
  return {
    useAppTheme: () => ({
      colors: lightTheme.colors,
      isDark: false,
    }),
  };
});

jest.mock('react-native-paper', () => {
  const React = jest.requireActual('react');
  const { Pressable, Text, View } = jest.requireActual('react-native');

  function Dialog({ children, visible }: { children: React.ReactNode; visible: boolean }) {
    return visible ? <View>{children}</View> : null;
  }
  function DialogIcon({ icon }: { icon: string }) {
    return <Text>{icon}</Text>;
  }
  function DialogTitle({ children }: { children: React.ReactNode }) {
    return <Text>{children}</Text>;
  }
  function DialogContent({ children }: { children: React.ReactNode }) {
    return <View>{children}</View>;
  }
  function DialogActions({ children }: { children: React.ReactNode }) {
    return <View>{children}</View>;
  }

  Dialog.Icon = DialogIcon;
  Dialog.Title = DialogTitle;
  Dialog.Content = DialogContent;
  Dialog.Actions = DialogActions;

  return {
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Dialog,
    Button: ({
      children,
      disabled,
      onPress,
    }: {
      children: React.ReactNode;
      disabled?: boolean;
      onPress: () => void;
    }) => (
      <Pressable disabled={disabled} onPress={onPress}>
        <Text>{children}</Text>
      </Pressable>
    ),
    MD3LightTheme: {
      colors: {
        primary: '#6200ee',
        primaryContainer: '#6200ee',
        secondary: '#03dac6',
        surface: '#ffffff',
        background: '#f6f6f6',
        error: '#b00020',
        onPrimary: '#ffffff',
        onSurface: '#000000',
        onBackground: '#000000',
        outline: '#e0e0e0',
        backdrop: 'rgba(0, 0, 0, 0.5)',
      },
    },
    MD3DarkTheme: {
      colors: {
        primary: '#bb86fc',
        primaryContainer: '#bb86fc',
        secondary: '#03dac6',
        surface: '#121212',
        background: '#121212',
        error: '#cf6679',
        onPrimary: '#000000',
        onSurface: '#ffffff',
        onBackground: '#ffffff',
        outline: '#424242',
        backdrop: 'rgba(0, 0, 0, 0.5)',
      },
    },
  };
});

describe('DeleteContainerDialog', () => {
  it('warns that assigned goods return to unassigned warehouse stock', () => {
    const { getByText } = render(
      <DeleteContainerDialog
        visible
        onDismiss={jest.fn()}
        onConfirm={jest.fn()}
        hasGoods
        isDeleting={false}
      />
    );

    expect(
      getByText(/marchandises assignées seront renvoyées aux non assignées/i)
    ).toBeTruthy();
  });
});
