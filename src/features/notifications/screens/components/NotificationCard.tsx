/**
 * NotificationCard
 * SRP: Single notification card with swipe actions
 * Premium design with category-colored accent, read/unread states
 */

import React from 'react';
import { Dimensions } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutLeft, Layout } from 'react-native-reanimated';

import type { InAppNotification } from '../../types';
import {
  NotificationCardLeftActions,
  NotificationCardRightActions,
} from '../../components/NotificationCardActions';
import { NotificationCardContent } from '../../components/NotificationCardContent';

const { width } = Dimensions.get('window');

interface NotificationCardProps {
  notification: InAppNotification;
  index: number;
  onPress: (notification: InAppNotification) => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  index,
  onPress,
  onMarkAsRead,
  onDelete,
}) => {
  const isUnread = !notification.isRead;

  const handleSwipeOpen = (direction: 'left' | 'right') => {
    if (direction === 'left' && isUnread) onMarkAsRead(notification._id);
    if (direction === 'right') onDelete(notification._id);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index * 40, 200)).springify().damping(18)}
      exiting={FadeOutLeft.duration(200)}
      layout={Layout.springify()}
    >
      <Swipeable
        renderLeftActions={() => <NotificationCardLeftActions isUnread={isUnread} />}
        renderRightActions={NotificationCardRightActions}
        onSwipeableOpen={handleSwipeOpen}
        leftThreshold={width * 0.2}
        rightThreshold={width * 0.2}
        friction={2}
        overshootLeft={false}
        overshootRight={false}
      >
        <NotificationCardContent
          notification={notification}
          onPress={onPress}
        />
      </Swipeable>
    </Animated.View>
  );
};
