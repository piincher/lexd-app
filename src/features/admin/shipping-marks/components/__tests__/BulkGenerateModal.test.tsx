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
        mode="missing"
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
        mode="missing"
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

  it('warns before overwriting existing marks in regenerate mode', () => {
    const onGenerate = jest.fn();
    const screen = render(
      <BulkGenerateModal
        visible
        mode="regenerate"
        count={40}
        onClose={jest.fn()}
        onGenerate={onGenerate}
        isGenerating={false}
      />,
    );

    expect(screen.getByText('Régénérer les marques')).toBeTruthy();
    expect(screen.getByText(
      'Régénérer 40 marques avec le nouveau design ? Les marques existantes seront écrasées et remplacées. Cette action est irréversible et se poursuit en arrière-plan.',
    )).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Régénérer'));
    expect(onGenerate).toHaveBeenCalledTimes(1);
  });
});
