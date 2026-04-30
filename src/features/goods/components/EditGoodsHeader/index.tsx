import React from 'react';
import { Appbar } from 'react-native-paper';
import { NotificationBell } from '@src/shared/ui/NotificationBell';

interface EditGoodsHeaderProps {
  title: string;
  onBack: () => void;
  onNotification: () => void;
  color?: string;
}

export const EditGoodsHeader: React.FC<EditGoodsHeaderProps> = ({
  title,
  onBack,
  onNotification,
  color,
}) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={onBack} />
    <Appbar.Content title={title} />
    <NotificationBell onPress={onNotification} size={24} color={color} />
  </Appbar.Header>
);
