import { useEffect, useRef, useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import type { InAppNotification } from '../types';

export interface UseToastAnimationParams {
  visible: boolean;
  notification: InAppNotification | null;
  onDismiss: () => void;
  onPress: (notification: InAppNotification) => void;
  autoDismissDelay?: number;
}

export const useToastAnimation = ({
  visible,
  notification,
  onDismiss,
  onPress,
  autoDismissDelay = 5000,
}: UseToastAnimationParams) => {
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    translateY.value = withSpring(-200, { damping: 15 }, () => {
      runOnJS(onDismiss)();
    });
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.9, { duration: 200 });
  }, [onDismiss, opacity, scale, translateY]);

  const handlePress = useCallback(() => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    handleDismiss();
    if (notification) onPress(notification);
  }, [handleDismiss, notification, onPress]);

  useEffect(() => {
    if (visible && notification) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15 });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      dismissTimerRef.current = setTimeout(() => {
        handleDismiss();
      }, autoDismissDelay);
    } else {
      handleDismiss();
    }
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [visible, notification, autoDismissDelay, handleDismiss, opacity, scale, translateY]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
        opacity.value = interpolate(
          Math.abs(event.translationY),
          [0, 100],
          [1, 0],
          Extrapolate.CLAMP
        );
      }
    })
    .onEnd((event) => {
      if (event.translationY < -50 || event.velocityY < -500) {
        translateY.value = withSpring(-200, {}, () => {
          runOnJS(onDismiss)();
        });
        opacity.value = withTiming(0, { duration: 200 });
      } else {
        translateY.value = withSpring(0, { damping: 15 });
        opacity.value = withTiming(1, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, handleDismiss, handlePress, panGesture };
};
