import React from 'react';
import { View, Pressable, StatusBar, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useAppTheme } from '@src/providers/ThemeProvider';
import type { InAppNotification } from '../types';
import { NOTIFICATION_TYPE_CONFIG, NOTIFICATION_CATEGORY_CONFIG } from '../types';
import { useToastAnimation } from '../hooks/useToastAnimation';
import { styles } from './NotificationToast.styles';

export interface NotificationToastProps {
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
  const { animatedStyle, handleDismiss, handlePress, panGesture } = useToastAnimation({
    visible,
    notification,
    onDismiss,
    onPress,
    autoDismissDelay,
  });

  if (!notification) return null;

  const typeConfig = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.GENERAL;
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category] || NOTIFICATION_CATEGORY_CONFIG.INFO;
  const iconName = typeConfig.icon as React.ComponentProps<typeof MaterialCommunityIcons>['name'];

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
              <View style={[styles.iconContainer, { backgroundColor: categoryConfig.color }]}>
                <MaterialCommunityIcons name={iconName} size={24} color={colors.text.inverse} />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: colors.text.inverse }]} numberOfLines={1}>
                  {notification.title}
                </Text>
                <Text style={styles.message} numberOfLines={2}>
                  {notification.message}
                </Text>
              </View>

              <Pressable
                onPress={handleDismiss}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialCommunityIcons name="close" size={18} color={colors.text.inverse} />
              </Pressable>
            </Pressable>

            <View style={styles.progressContainer}>
              <Animated.View style={[styles.progressBar, { backgroundColor: categoryConfig.color }]} />
            </View>
          </Surface>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default NotificationToast;
