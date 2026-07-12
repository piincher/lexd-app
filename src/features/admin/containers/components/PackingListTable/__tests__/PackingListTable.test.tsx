import React from 'react';
import * as ReactNative from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import type { PackingListGoods } from '@src/shared/types/packingListGoods';
import { PackingListTable } from '../index';

jest.mock('@src/shared/lib', () => ({
  normalizePhotos: (item: PackingListGoods) => item.photos ?? [],
}));

const goods: PackingListGoods = {
  _id: 'goods-1',
  goodsId: 'CLX-1001',
  warehouseLocation: 'A-12',
  actualCBM: 1.25,
  weight: 80,
  quantity: 3,
  photos: [],
  description: 'Trois cartons de pièces automobiles',
  expressTrackingNumber: 'EXP-9090',
  status: 'ASSIGNED_TO_CONTAINER',
};

describe('PackingListTable responsive rendering', () => {
  afterEach(() => {
    ReactNative.Dimensions.set({
      window: { width: 390, height: 844, scale: 1, fontScale: 1 },
      screen: { width: 390, height: 844, scale: 1, fontScale: 1 },
    });
  });
  it('renders an expandable package card on compact screens', () => {
    ReactNative.Dimensions.set({
      window: { width: 390, height: 844, scale: 1, fontScale: 1 },
      screen: { width: 390, height: 844, scale: 1, fontScale: 1 },
    });

    const screen = render(<PackingListTable goods={[goods]} startIndex={7} />);
    const card = screen.getByRole('button', { name: /Colis CLX-1001/ });

    expect(screen.getByText('7')).toBeTruthy();
    expect(screen.getByText('1.25')).toBeTruthy();
    expect(screen.getByText('80 kg')).toBeTruthy();
    expect(screen.getByLabelText(/Trier par CBM/)).toBeTruthy();
    expect(screen.queryByText('EXP-9090')).toBeNull();
    expect(card.props.accessibilityState).toEqual({ expanded: false });

    fireEvent.press(card);

    expect(screen.getByText('EXP-9090')).toBeTruthy();
    expect(screen.getByText('A-12')).toBeTruthy();
    expect(screen.getByText('ASSIGNED TO CONTAINER')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Colis CLX-1001/ }).props.accessibilityState)
      .toEqual({ expanded: true });
  });

  it('warns when operational measurements are missing', () => {
    ReactNative.Dimensions.set({
      window: { width: 390, height: 844, scale: 1, fontScale: 1 },
      screen: { width: 390, height: 844, scale: 1, fontScale: 1 },
    });
    const incomplete = { ...goods, _id: 'goods-2', goodsId: 'CLX-1002', actualCBM: 0, weight: 0 };
    const screen = render(<PackingListTable goods={[incomplete]} />);

    expect(screen.getAllByText('Manquant')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /CBM manquant, poids manquant/ })).toBeTruthy();
  });

  it('keeps the dense sortable table for wide screens', () => {
    ReactNative.Dimensions.set({
      window: { width: 1024, height: 768, scale: 1, fontScale: 1 },
      screen: { width: 1024, height: 768, scale: 1, fontScale: 1 },
    });

    const screen = render(<PackingListTable goods={[goods]} showPhotos />);

    expect(screen.getByText('N°')).toBeTruthy();
    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Photo')).toBeTruthy();
    expect(screen.getByText('Poids')).toBeTruthy();
    expect(screen.getByText('Qté')).toBeTruthy();
    expect(screen.getByText('CLX-1001')).toBeTruthy();
    expect(screen.queryByRole('button', { name: /Colis CLX-1001/ })).toBeNull();
  });
});
