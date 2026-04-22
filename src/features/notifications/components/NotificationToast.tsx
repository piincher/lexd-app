/**
 * NotificationToast Component
 * In-app toast notification that slides in from top
 */

import React, { useEffect, useRef, useMemo } from 'react';
import { 
  View, 
  StyleSheet, 
  Pressable, 
  Dimensions,
  StatusBar,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

import { useAppTheme } from '@src/providers/ThemeProvider';
import { Fonts } from '@src/constants/Fonts';
import type { InAppNotification } from '../types';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../types';

const { width } = Dimensions.get('window');

interface NotificationToastProps {
  notification: InAppNotification | null;
  visible: boolean;
  onDismiss: () => void;
  onPress: (notification: InAppNotification) => void;
  autoDismissDelay?: number;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  visible,
  onDismiss,
  onPress,
  autoDismissDelay = 5000,
}) => {
  const { colors } = useAppTheme();
  const translateY = useSharedValue(-200);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      paddingTop: (StatusBar.currentHeight || 0) + 8,
      paddingHorizontal: 16,
    },
    toastContainer: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    surface: {
      borderRadius: 16,
      overflow: 'hidden',
      borderLeftWidth: 4,
      backgroundColor: 'rgba(30, 30, 30, 0.95)',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      paddingRight: 8,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      marginLeft: 12,
      marginRight: 8,
    },
    title: {
      fontFamily: Fonts.bold,
      fontSize: 15,
      color: colors.text.inverse,
    },
    message: {
      fontFamily: Fonts.regular,
      fontSize: 13,
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: 2,
      lineHeight: 18,
    },
    closeButton: {
      padding: 4,
    },
    progressContainer: {
      height: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    progressBar: {
      height: '100%',
      width: '100%',
    },
  }), [colors]);

  // Reset and start timer when notification changes
  useEffect(() => {
    if (visible && notification) {
      // Animate in
      translateY.value = withSpring(0, { damping: 15, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 15 });

      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Auto dismiss timer
      dismissTimerRef.current = setTimeout(() => {
        handleDismiss();
      }, autoDismissDelay);
    } else {
      // Animate out
      handleDismiss();
    }

    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [visible, notification]);

  const handleDismiss = () => {
    translateY.value = withSpring(-200, { damping: 15 }, () => {
      runOnJS(onDismiss)();
    });
    opacity.value = withTiming(0, { duration: 200 });
    scale.value = withTiming(0.9, { duration: 200 });
  };

  const handlePress = () => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
    handleDismiss();
    if (notification) {
      onPress(notification);
    }
  };

  // Pan gesture for swipe to dismiss
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
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  if (!notification) return null;

  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <StatusBar barStyle="light-content" />
      
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.toastContainer, animatedStyle]}>
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          
          <Surface style={[styles.surface, { borderLeftColor: categoryConfig.color }]}>
            <Pressable 
              onPress={handlePress}
              style={styles.content}
              android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
            >
              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: categoryConfig.color }]}>
                <MaterialCommunityIcons 
                  name={typeConfig.icon as any} 
                  size={24} 
                  color={colors.text.inverse} 
                />
              </View>

              {/* Text Content */}
              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {notification.title}
                </Text>
                <Text style={styles.message} numberOfLines={2}>
                  {notification.message}
                </Text>
              </View>

              {/* Close Button */}
              <Pressable 
                onPress={handleDismiss}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons 
                  name="close" 
                  size={18} 
                  color={colors.text.inverse} 
                />
              </Pressable>
            </Pressable>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Animated.View 
                style={[
                  styles.progressBar, 
                  { backgroundColor: categoryConfig.color }
                ]} 
              />
            </View>
          </Surface>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default NotificationToast;
