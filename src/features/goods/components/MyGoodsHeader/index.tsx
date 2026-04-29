// Goods Feature - MyGoodsHeader Component
// Header for MyGoodsScreen with title and QR scan action

import React from 'react';
import { Appbar } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';

interface MyGoodsHeaderProps {
  onScanPress: () => void;
}

export const MyGoodsHeader: React.FC<MyGoodsHeaderProps> = ({ onScanPress }) => (
  <Appbar.Header>
    <Appbar.Content title="Mes Marchandises" titleStyle={{ fontFamily: Fonts.bold }} />
    <Appbar.Action icon="qrcode-scan" onPress={onScanPress} />
  </Appbar.Header>
);
