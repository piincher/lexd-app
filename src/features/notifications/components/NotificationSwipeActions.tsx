import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ThemeContextType } from '@src/providers/ThemeProvider';
import type { NotificationItemStyles } from './NotificationItem.styles';

interface NotificationSwipeActionsProps {
  side: 'left' | 'right';
  isRead: boolean;
  styles: Pick<NotificationItemStyles, 'swipeAction' | 'leftAction' | 'rightAction' | 'swipeActionText'>;
  colors: ThemeContextType['colors'];
}

export const NotificationSwipeActions: React.FC<NotificationSwipeActionsProps> = ({
  side,
  isRead,
  styles,
  colors,
}) => {
  if (side === 'left' && isRead) return null;

  const isLeft = side === 'left';
  const icon = isLeft ? 'check-circle' : 'delete';
  const label = isLeft ? 'Lu' : 'Suppr.';

  return (
    <View style={[styles.swipeAction, isLeft ? styles.leftAction : styles.rightAction]}>
      <MaterialCommunityIcons name={icon} size={28} color={colors.text.inverse} />
      <Text style={styles.swipeActionText}>{label}</Text>
    </View>
  );
};
