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
