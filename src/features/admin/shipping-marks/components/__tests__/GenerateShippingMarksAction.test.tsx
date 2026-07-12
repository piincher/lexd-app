import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { GenerateShippingMarksAction } from '../GenerateShippingMarksAction';

jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));

const baseProps = {
  count: 264,
  selectedCount: 0,
  filtered: false,
  loading: false,
  disabled: false,
  onPress: jest.fn(),
};

describe('GenerateShippingMarksAction', () => {
  beforeEach(() => jest.clearAllMocks());

  it.each([
    {
      selectedCount: 0,
      filtered: false,
      expected: 'Générer toutes les marques (264)',
    },
    {
      selectedCount: 0,
      filtered: true,
      expected: 'Générer les résultats (264)',
    },
    {
      selectedCount: 3,
      filtered: true,
      expected: 'Générer la sélection (3)',
    },
  ])('describes the intended generation scope', ({ selectedCount, filtered, expected }) => {
    const screen = render(
      <GenerateShippingMarksAction
        {...baseProps}
        selectedCount={selectedCount}
        filtered={filtered}
      />,
    );

    expect(screen.getByText(expected)).toBeTruthy();
    expect(screen.getByLabelText(expected)).toBeTruthy();
    expect(screen.getByText('Crée uniquement les marques manquantes')).toBeTruthy();
  });

  it('prevents generation while disabled', () => {
    const onPress = jest.fn();
    const screen = render(
      <GenerateShippingMarksAction {...baseProps} disabled onPress={onPress} />,
    );
    const action = screen.getByRole('button');

    expect(action.props.accessibilityState).toEqual({ disabled: true, busy: false });
    fireEvent.press(action);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('reports background progress and remains unavailable while generating', () => {
    const onPress = jest.fn();
    const screen = render(
      <GenerateShippingMarksAction
        {...baseProps}
        loading
        onPress={onPress}
        job={{
          id: 'job-1',
          status: 'RUNNING',
          total: 5,
          generated: 2,
          failed: 1,
          force: false,
        }}
      />,
    );
    const action = screen.getByRole('button');

    expect(screen.getByText('3/5 traitées en arrière-plan')).toBeTruthy();
    expect(action.props.accessibilityState).toEqual({ disabled: true, busy: true });
    fireEvent.press(action);
    expect(onPress).not.toHaveBeenCalled();
  });
});
