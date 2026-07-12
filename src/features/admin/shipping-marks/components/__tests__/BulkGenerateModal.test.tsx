import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { BulkGenerateModal } from '../BulkGenerateModal';

jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('@src/shared/lib/haptics', () => ({ hapticLight: jest.fn() }));

describe('BulkGenerateModal', () => {
  beforeEach(() => jest.clearAllMocks());

  it('confirms a safe background generation for the selected scope', () => {
    const onClose = jest.fn();
    const onGenerate = jest.fn();
    const screen = render(
      <BulkGenerateModal
        visible
        count={12}
        onClose={onClose}
        onGenerate={onGenerate}
        isGenerating={false}
      />,
    );

    expect(screen.getByText('Générer les marques manquantes')).toBeTruthy();
    expect(screen.getByText(
      'Préparer les marques pour 12 clients ? Les marques existantes seront conservées et la génération continuera en arrière-plan.',
    )).toBeTruthy();

    fireEvent.press(screen.getByTestId('confirm-dialog-confirm'));
    expect(onGenerate).toHaveBeenCalledTimes(1);

    fireEvent.press(screen.getByTestId('confirm-dialog-cancel'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('uses singular copy and disables confirmation while scheduling', () => {
    const onGenerate = jest.fn();
    const screen = render(
      <BulkGenerateModal
        visible
        count={1}
        onClose={jest.fn()}
        onGenerate={onGenerate}
        isGenerating
      />,
    );

    expect(screen.getByText(
      'Préparer les marques pour 1 client ? Les marques existantes seront conservées et la génération continuera en arrière-plan.',
    )).toBeTruthy();
    const confirm = screen.getByLabelText('Programmation…');
    expect(confirm.props.accessibilityState).toEqual({ disabled: true });
    fireEvent.press(confirm);
    expect(onGenerate).not.toHaveBeenCalled();
  });
});
